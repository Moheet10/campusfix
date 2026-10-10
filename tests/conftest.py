import pytest
from werkzeug.security import generate_password_hash
from app import app, db, User, Complaint

@pytest.fixture(autouse=True)
def clean_db():
    """Ensure database is clean before and after each test."""
    with app.app_context():
        db.create_all()
        # Clean any existing rows
        Complaint.query.delete()
        User.query.delete()
        db.session.commit()

        # Seed test admin & student
        admin = User(username="admin_test", password=generate_password_hash("adminpassword"), role="admin")
        student = User(username="student_test", password=generate_password_hash("studentpassword"), role="student")
        db.session.add(admin)
        db.session.add(student)
        db.session.commit()

        # Seed initial test complaint
        sample = Complaint(
            title="Leaking tap in Block B",
            category="Hostel",
            description="Tap water leaking continuously on 2nd floor bathroom.",
            status="Open",
            user_id=student.id
        )
        db.session.add(sample)
        db.session.commit()

    yield

    with app.app_context():
        db.session.rollback()
        Complaint.query.delete()
        User.query.delete()
        db.session.commit()

@pytest.fixture
def client():
    app.config["TESTING"] = True
    app.config["WTF_CSRF_ENABLED"] = False
    with app.test_client() as client:
        yield client
