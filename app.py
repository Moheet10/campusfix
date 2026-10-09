import os
from datetime import datetime, timezone
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from flask_sqlalchemy import SQLAlchemy
from prometheus_flask_exporter import PrometheusMetrics
from prometheus_client import Counter

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "campusfix-super-secret-key-2026")

# Database Configuration
db_url = os.environ.get("DATABASE_URL", "sqlite:///campusfix.db")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Prometheus Metrics Exporter (Exposes /metrics endpoint)
metrics = PrometheusMetrics(app)
metrics.info("campusfix_app_info", "CampusFix Application Info", version="1.0.0")

complaints_counter = Counter(
    "campusfix_complaints_total",
    "Total number of submitted complaints"
)

# ----------------- Database Models -----------------

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), default="student")  # 'student' or 'admin'
    complaints = db.relationship("Complaint", backref="author", lazy=True)

class Complaint(db.Model):
    __tablename__ = "complaints"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # 'Hostel', 'Classroom', 'Lab', 'Mess', 'General'
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default="Open")    # 'Open', 'In Progress', 'Resolved'
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

# Auto-seed database tables & default accounts
def init_db():
    with app.app_context():
        db.create_all()
        # Seed default admin if not exists
        if not User.query.filter_by(username="admin").first():
            admin_user = User(username="admin", password="admin123", role="admin")
            db.session.add(admin_user)
        # Seed default student if not exists
        if not User.query.filter_by(username="student1").first():
            student = User(username="student1", password="password123", role="student")
            db.session.add(student)
            db.session.commit()
            
            # Seed a sample complaint
            sample_complaint = Complaint(
                title="WiFi not working in Lab 3",
                category="Lab",
                description="Internet disconnection frequently happening during practical lab hours.",
                status="Open",
                user_id=student.id
            )
            db.session.add(sample_complaint)
        db.session.commit()

# ----------------- Application Routes -----------------

@app.route("/")
def index():
    if "user_id" in session:
        return redirect(url_for("complaints"))
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
        role = request.form.get("role", "student")

        if not username or not password:
            flash("Username and password are required.", "danger")
            return redirect(url_for("register"))

        if User.query.filter_by(username=username).first():
            flash("Username already exists. Please pick another.", "warning")
            return redirect(url_for("register"))

        new_user = User(username=username, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful! You can now log in.", "success")
        return redirect(url_for("login"))

    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        user = User.query.filter_by(username=username, password=password).first()
        if user:
            session["user_id"] = user.id
            session["username"] = user.username
            session["role"] = user.role
            flash(f"Welcome back, {user.username}!", "success")
            if user.role == "admin":
                return redirect(url_for("admin_dashboard"))
            return redirect(url_for("complaints"))
        else:
            flash("Invalid credentials. Try again.", "danger")
            return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    flash("You have logged out.", "info")
    return redirect(url_for("login"))

@app.route("/complaints", methods=["GET", "POST"])
def complaints():
    if "user_id" not in session:
        return redirect(url_for("login"))

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        category = request.form.get("category", "General")
        description = request.form.get("description", "").strip()

        if not title or not description:
            flash("Title and description cannot be empty.", "danger")
            return redirect(url_for("complaints"))

        new_complaint = Complaint(
            title=title,
            category=category,
            description=description,
            user_id=session["user_id"]
        )
        db.session.add(new_complaint)
        db.session.commit()
        complaints_counter.inc()
        flash("Complaint submitted successfully!", "success")
        return redirect(url_for("complaints"))

    user_complaints = Complaint.query.filter_by(user_id=session["user_id"]).order_by(Complaint.created_at.desc()).all()
    return render_template("complaints.html", complaints=user_complaints)

@app.route("/admin", methods=["GET", "POST"])
def admin_dashboard():
    if "user_id" not in session or session.get("role") != "admin":
        flash("Admin access restricted.", "danger")
        return redirect(url_for("login"))

    if request.method == "POST":
        complaint_id = request.form.get("complaint_id")
        new_status = request.form.get("status")
        complaint = db.session.get(Complaint, int(complaint_id)) if complaint_id else None
        if complaint and new_status in ["Open", "In Progress", "Resolved"]:
            complaint.status = new_status
            db.session.commit()
            flash(f"Complaint #{complaint.id} status updated to {new_status}.", "success")
        return redirect(url_for("admin_dashboard"))

    all_complaints = Complaint.query.order_by(Complaint.created_at.desc()).all()
    return render_template("admin.html", complaints=all_complaints)

# ----------------- DevOps & Monitoring Endpoints -----------------

@app.route("/health")
def health():
    """Health check endpoint for Docker HEALTHCHECK and Jenkins smoke tests."""
    try:
        # Verify database connection
        db.session.execute(db.text("SELECT 1"))
        return jsonify({
            "status": "healthy",
            "service": "CampusFix",
            "database": "connected",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e)
        }), 500

@app.route("/api/stats")
def api_stats():
    """Statistical summary endpoint for dashboards."""
    total = Complaint.query.count()
    open_count = Complaint.query.filter_by(status="Open").count()
    in_progress = Complaint.query.filter_by(status="In Progress").count()
    resolved = Complaint.query.filter_by(status="Resolved").count()
    return jsonify({
        "total_complaints": total,
        "open": open_count,
        "in_progress": in_progress,
        "resolved": resolved
    }), 200

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
