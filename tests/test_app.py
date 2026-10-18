import json

def test_home_page(client):
    """Test 1: Index page renders properly with 200 OK."""
    response = client.get("/")
    assert response.status_code == 200
    assert b"CampusFix" in response.data

def test_health_check(client):
    """Test 2: Health check endpoint returns 200 and healthy status (DevOps/Docker check)."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"

def test_metrics_endpoint(client):
    """Test 3: Prometheus metrics endpoint exposes metrics format (DevOps/Prometheus check)."""
    response = client.get("/metrics")
    assert response.status_code == 200
    assert b"flask_http_request_duration_seconds" in response.data or b"campusfix_app_info" in response.data

def test_api_stats(client):
    """Test 4: Stats API endpoint returns complaint numbers in JSON format."""
    response = client.get("/api/stats")
    assert response.status_code == 200
    data = response.get_json()
    assert "total_complaints" in data
    assert data["total_complaints"] >= 1
    assert data["open"] >= 1

def test_user_registration(client):
    """Test 5: User can register a new account successfully."""
    response = client.post("/register", data={
        "username": "newstudent",
        "password": "mypassword123",
        "role": "student"
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b"Registration successful" in response.data

def test_duplicate_registration_fails(client):
    """Test 6: Registering with an existing username triggers a validation message."""
    response = client.post("/register", data={
        "username": "student_test",
        "password": "anypassword",
        "role": "student"
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b"Username already exists" in response.data

def test_login_success(client):
    """Test 7: Valid user credentials allow successful login."""
    response = client.post("/login", data={
        "username": "student_test",
        "password": "studentpassword"
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b"Welcome back, student_test" in response.data

def test_login_invalid_credentials(client):
    """Test 8: Invalid user credentials reject login attempt."""
    response = client.post("/login", data={
        "username": "student_test",
        "password": "wrongpassword"
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b"Invalid credentials" in response.data

def test_complaint_submission(client):
    """Test 9: Authenticated user can submit a complaint."""
    # First login as student
    client.post("/login", data={
        "username": "student_test",
        "password": "studentpassword"
    })
    # Submit complaint
    response = client.post("/complaints", data={
        "title": "Broken projector in Hall 101",
        "category": "Classroom",
        "description": "HDMI port damaged, cannot display slides."
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b"Complaint submitted successfully" in response.data
    assert b"Broken projector in Hall 101" in response.data

def test_admin_access_control_and_status_update(client):
    """Test 10: Admin can log in and update a complaint's resolution status."""
    # Login as admin
    client.post("/login", data={
        "username": "admin_test",
        "password": "adminpassword"
    })
    # Access admin dashboard
    admin_page = client.get("/admin")
    assert admin_page.status_code == 200
    assert b"Administrator Dashboard" in admin_page.data

    from app import app, Complaint
    with app.app_context():
        target_complaint = Complaint.query.first()
        cid = target_complaint.id

    # Update complaint status from Open to Resolved
    update_response = client.post("/admin", data={
        "complaint_id": str(cid),
        "status": "Resolved"
    }, follow_redirects=True)
    assert update_response.status_code == 200
    assert b"status updated to Resolved" in update_response.data

def test_register_role_escalation_prevented(client):
    """Test 11: POST /register with role=admin must create a student, not an admin."""
    from app import app, User
    response = client.post("/register", data={
        "username": "sneaky_user",
        "password": "secretpassword123",
        "role": "admin"
    }, follow_redirects=True)
    assert response.status_code == 200

    with app.app_context():
        user = User.query.filter_by(username="sneaky_user").first()
        assert user is not None
        assert user.role == "student"
