# 🛠️ CampusFix - Automated DevOps Campus Grievance Platform

![Python](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.x-black?logo=flask)
![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED?logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)
![Jenkins](https://img.shields.io/badge/Jenkins-Declarative%20CI%2FCD-D24939?logo=jenkins)
![Prometheus](https://img.shields.io/badge/Prometheus-Scraping-E6522C?logo=prometheus)
![Grafana](https://img.shields.io/badge/Grafana-Monitoring-F46800?logo=grafana)

---

## 📌 Project Overview
**CampusFix** is a full-stack, DevOps-native campus grievance and issue tracking application. It bridges student complaints (Hostel, Labs, Classrooms, Mess) with administrative resolution workflows while demonstrating an end-to-end DevOps pipeline combining Experiments 1 through 7:

* **Exp 1: Version Control** &bull; Git feature branching, Pull Requests, non-fast-forward merges, and `git revert` rollback demo.
* **Exp 2: Containerization** &bull; Multi-stage Docker packaging (`builder`, `tester`, `runner`), non-root security user, and Docker `HEALTHCHECK`.
* **Exp 3: Container Orchestration** &bull; Docker Compose linking Flask web, PostgreSQL database, persistent volumes, and health-check dependencies.
* **Exp 4 & 5: CI/CD & Automated Deployment** &bull; Declarative Jenkins pipeline running automated unit tests with JUnit reports, building hardened containers, and verifying `/health` smoke tests.
* **Exp 6: Agile Lifecycle** &bull; Jira Software Cloud setup with 5 Epics, 8 User Stories, 2 Sprints, and Burndown metrics.
* **Exp 7: Observability & Monitoring** &bull; `prometheus-flask-exporter` metrics endpoint, Prometheus scraper, and Grafana visualization dashboard.

---

## 🚀 Quick Start Guide

### 1. Local Development (without Docker)
```bash
# 1. Activate python virtual environment
.\.venv\Scripts\Activate.ps1    # On Windows
source .venv/bin/activate       # On Linux/macOS

# 2. Run automated test suite
pytest -v

# 3. Start local application
python app.py
```
Visit: `http://localhost:5000`

### 2. Multi-Container Orchestration (Docker Compose)
```bash
# Build and run the entire stack (Flask + PostgreSQL + Prometheus + Grafana)
docker compose up -d --build

# View container status
docker compose ps

# View application logs
docker compose logs -f web
```

---

## 🌐 Service Endpoints

| Service | Endpoint | Description | Default Credentials |
|---|---|---|---|
| **CampusFix Web App** | `http://localhost:5000` | Main grievance web application | Student: `student1` / `password123`<br>Admin: `admin` / `admin123` |
| **Health Check** | `http://localhost:5000/health` | Container & DB health smoke test | None |
| **Prometheus Metrics** | `http://localhost:5000/metrics` | Raw application metrics endpoint | None |
| **Prometheus UI** | `http://localhost:9090` | Time-series query & target status | None |
| **Grafana Dashboard** | `http://localhost:3000` | Real-time monitoring metrics | `admin` / `admin` |

---

## 🧪 Automated Testing
Run the 10 automated test cases and generate a Jenkins JUnit XML report:
```bash
pytest -v --junitxml=junit-report.xml
```

---

## 📁 Repository Structure
```
├── app.py                      # Core Flask backend with auth, routes & metrics
├── Dockerfile                  # Multi-stage production container definition
├── docker-compose.yml          # Multi-container orchestration (App, DB, Prom, Grafana)
├── Jenkinsfile                 # Declarative CI/CD pipeline definition
├── requirements.txt            # Application dependencies
├── pytest.ini                  # Pytest test discovery configuration
├── templates/                  # Frontend HTML templates (Bootstrap 5)
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── complaints.html
│   └── admin.html
├── static/                     # CSS stylesheets
│   └── style.css
├── tests/                      # Automated test suite (10 unit/integration tests)
│   ├── conftest.py
│   └── test_app.py
├── monitoring/                 # Monitoring configurations
│   ├── prometheus.yml
│   └── grafana-dashboard.json
├── JIRA_SETUP_GUIDE.md         # Experiment 6 Agile story breakdown
├── VIVA_CHEATSHEET_PERSON3.md  # Viva presentation script & Q&A
└── GIT_WORKFLOW_DEMO.md        # Experiment 1 branch & revert demonstration
```
