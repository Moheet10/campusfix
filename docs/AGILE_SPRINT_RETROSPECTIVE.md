# 🏃 Agile Scrum Sprint Retrospective & Jira Velocity Report
**Lead Scrum Master & QA Coordinator:** Kripa Masand (`@kripa-30`)  
**Project:** CampusFix (Automated DevOps Campus Grievance Platform)  
**Curriculum Experiment:** Experiment 6 (Agile Lifecycle Management via Jira Cloud)

---

## 📋 1. Executive Summary
Throughout our development lifecycle, the team adhered to Agile Scrum practices across **two 1-week Sprints**:
* **Sprint 1 (Velocity: 21 Story Points):** Core Infrastructure, Database Models, Authentication Security, and Initial Pytest Harness.
* **Sprint 2 (Velocity: 26 Story Points):** CI/CD Pipeline Automation (Jenkins + GitHub Actions), Prometheus Telemetry Scrapers, and Grafana Observability Dashboards.

---

## 🎯 2. Sprint Backlogs & Epic Breakdown

### Epic 1: Identity & Authentication (CF-EPIC-1)
* **CF-101 (5 SP):** Implement PBKDF2/SHA-256 salted password hashing and role-based session tokens. *(Assigned: Moheet)*
* **CF-102 (3 SP):** Prevent privilege escalation attacks during student onboarding. *(Assigned: Moheet)*

### Epic 2: Automated CI/CD & Delivery (CF-EPIC-2)
* **CF-201 (8 SP):** Multi-stage Docker containerization with non-root runtime security. *(Assigned: Moheet & Ronak)*
* **CF-202 (8 SP):** Declarative Jenkinsfile pipeline with automated JUnit telemetry generation. *(Assigned: Ronak)*

### Epic 3: Telemetry & Monitoring (CF-EPIC-3)
* **CF-301 (5 SP):** Instrument Flask microservice with `prometheus-flask-exporter` at `/metrics`. *(Assigned: Moheet & Ronak)*
* **CF-302 (5 SP):** Configure Grafana real-time dashboard for traffic rate, P95 latency, and server health. *(Assigned: Ronak)*

---

## 📊 3. Velocity & Burndown Analysis
* **Sprint 1 Commitment:** 21 Story Points $\rightarrow$ **Completed:** 21 Story Points (100% velocity efficiency).
* **Sprint 2 Commitment:** 26 Story Points $\rightarrow$ **Completed:** 26 Story Points (100% velocity efficiency).
* **Defect Density:** 0 critical production defects post-deployment.
* **Automated Test Coverage:** 11 / 11 automated test cases passing in continuous integration.

---

## 🏁 4. Definition of Done (DoD)
A User Story was marked as **Done** on the Jira Scrum board only when:
1. Feature code was covered by unit tests (passing in Pytest).
2. Code was committed to a dedicated Git feature branch and merged via Pull Request.
3. Multi-stage Docker build succeeded without root privilege warnings.
4. Continuous Integration build passed on GitHub Actions with JUnit artifact archiving.
5. Observability metrics were verified on Prometheus and Grafana.
