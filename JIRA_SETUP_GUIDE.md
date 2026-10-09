# 📌 Experiment 6: Jira Project Configuration Guide

Use this guide to set up a free Jira Software Cloud project (Kanban or Scrum) in under 10 minutes.

---

## 1. Project Details
* **Project Name:** CampusFix
* **Project Key:** `CF`
* **Template:** Scrum (or Kanban)
* **Lead:** [Your Name / Person 3]

---

## 2. Epics (Major Project Modules)

| Epic Key | Epic Name | Description |
|---|---|---|
| **CF-EPIC-1** | User Authentication & Access Control | Student registration, session login, admin role enforcement |
| **CF-EPIC-2** | Complaint Management Workflow | Grievance creation, category classification, status transition |
| **CF-EPIC-3** | DevOps Containerization & Orchestration | Multi-stage Docker packaging, Docker Compose database networking |
| **CF-EPIC-4** | Automated CI/CD Pipeline | Jenkinsfile automation, pytest test verification, automated deploy |
| **CF-EPIC-5** | Observability & Health Monitoring | Healthcheck endpoint, Prometheus scraping, Grafana dashboard |

---

## 3. User Stories & Acceptance Criteria

### Sprint 1: Foundation & Application Core
* **CF-1: Student Registration & Login**
  * *Description:* As a student, I want to create an account and log in so that I can submit grievances.
  * *Acceptance Criteria:* Passwords stored, duplicate usernames rejected, session stored on login.
  * *Story Points:* 3
* **CF-2: Grievance Submission Portal**
  * *Description:* As a student, I want to submit a complaint specifying Title, Category, and Description.
  * *Acceptance Criteria:* Complaint saved in database with status `Open`.
  * *Story Points:* 5
* **CF-3: Admin Resolution Workflow**
  * *Description:* As an administrator, I want to view all complaints and update their status (`Open` $\rightarrow$ `In Progress` $\rightarrow$ `Resolved`).
  * *Acceptance Criteria:* Status change updates DB and flashes confirmation.
  * *Story Points:* 5

### Sprint 2: DevOps Pipeline & Observability
* **CF-4: Multi-stage Docker Containerization**
  * *Description:* Package the Flask application using multi-stage Docker build with non-root security.
  * *Acceptance Criteria:* Docker image builds under 300MB, passes security audit.
  * *Story Points:* 5
  * *Dependency:* Blocked by CF-2
* **CF-5: PostgreSQL Orchestration via Docker Compose**
  * *Description:* Configure Docker Compose with persistent database storage and health checks.
  * *Acceptance Criteria:* `docker compose up` brings up DB and Web with zero manual intervention.
  * *Story Points:* 3
* **CF-6: Automated Pytest CI Suite**
  * *Description:* Write 10 unit and integration tests covering routes, auth, and health checks.
  * *Acceptance Criteria:* 10/10 tests pass, exports JUnit XML report for Jenkins.
  * *Story Points:* 3
* **CF-7: Jenkins Pipeline Automation**
  * *Description:* Create Declarative Jenkinsfile that tests, builds, and deploys containers.
  * *Acceptance Criteria:* Pipeline executes 5 stages and stops on test failure.
  * *Story Points:* 8
  * *Dependency:* Blocked by CF-6
* **CF-8: Prometheus & Grafana Monitoring**
  * *Description:* Expose `/metrics` and build real-time monitoring dashboard in Grafana.
  * *Acceptance Criteria:* Prometheus scrapes `/metrics` every 5s; Grafana shows live latency and complaint counters.
  * *Story Points:* 5

---

## 4. Screenshots to Capture for Lab Report:
1. **Backlog View:** Showing all stories categorized under Epics.
2. **Active Sprint Board:** Showing columns (`To Do`, `In Progress`, `Done`).
3. **Burndown Chart:** Showing progress across Sprint 1 and Sprint 2.
4. **Issue Details:** Showing issue linking (`CF-7 is blocked by CF-6`).
