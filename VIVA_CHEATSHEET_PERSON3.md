# 🎙️ Person 3: Viva & Presentation Cheatsheet

> **Instructions for Person 3:** Memorize or keep this sheet open during the project evaluation/viva. Speak with confidence. You cover the project architecture, Agile lifecycle, and how all 7 experiments tie together.

---

## 🎯 2-Minute Speaking Script (Practice this!)

> "Good morning / afternoon Ma'am.
> 
> Our project is **CampusFix**—a digital grievance management and facility tracking platform built for college campuses. It replaces traditional manual complaints with a transparent, automated lifecycle where students submit issues and administrators resolve them.
> 
> What makes this project unique is that we unified all **7 curriculum experiments into an automated, end-to-end DevOps pipeline**:
> 
> 1. In **Experiment 1 (Git & GitHub)**: We maintained branch policies, pull requests, and automated rollback demonstrations using `git revert`.
> 2. In **Experiment 2 (Docker)**: We containerized our Flask backend using a **multi-stage Dockerfile** with non-root security and built-in health checks.
> 3. In **Experiment 3 (Docker Compose)**: We orchestrated a multi-container stack combining our Flask web app and a PostgreSQL database with persistent volumes.
> 4. In **Experiment 4 & 5 (Jenkins CI/CD & Automated Deployment)**: We authored a Declarative Jenkinsfile. When code is pushed, Jenkins automatically runs 10 unit tests, packages production images, deploys the stack via Compose, and verifies health via automated smoke testing.
> 5. In **Experiment 6 (Jira)**: We tracked development across 2 Sprints, managing user stories, dependencies, and burndown velocity.
> 6. In **Experiment 7 (Prometheus & Grafana)**: We instrumented our application to export real-time metrics, scraping HTTP request latencies and grievance counts into interactive Grafana dashboards.
> 
> Through this project, we experienced how modern software goes seamlessly from code to automated testing, containerized deployment, and live production observability."

---

## 💡 Top 5 Safe Viva Questions & Bulletproof Answers

### Q1: What is CampusFix and what problem does it solve?
* **Answer:** *"CampusFix is a centralized college grievance tracking system. In colleges, issues like broken lab computers, hostel water supply, or projector failures are often reported verbally or lost in emails. CampusFix gives students an authenticated portal to submit issues and allows department admins to track them through Open, In Progress, and Resolved stages with full audit visibility."*

### Q2: What is CI/CD, and how did you implement it in Jenkins?
* **Answer:** *"CI stands for Continuous Integration (automatically building and testing code on every commit) and CD stands for Continuous Deployment (automatically rolling out verified code to production). We wrote a Declarative `Jenkinsfile` with 5 automated stages: Checkout $\rightarrow$ Test Container Build $\rightarrow$ 10 Pytest executions with JUnit report generation $\rightarrow$ Production Docker image build $\rightarrow$ Docker Compose deployment and `/health` smoke testing."*

### Q3: What is the difference between Docker and Docker Compose?
* **Answer:** *"Docker is a containerization engine used to package a single application and its dependencies into an isolated container. Docker Compose is an orchestration tool used to define and run multi-container Docker applications using a single YAML file (`docker-compose.yml`). In our project, Compose coordinates our Flask application, PostgreSQL database, Prometheus, and Grafana on an isolated bridge network."*

### Q4: Why did we use Jira (Exp 6) in this DevOps lifecycle?
* **Answer:** *"Jira provides Agile project management. Before writing code, we defined Epics and User Stories with explicit acceptance criteria. We planned work across two Sprints, established dependency links (e.g., CI/CD was blocked until unit tests were completed), and tracked sprint progress using Scrum boards and burndown charts."*

### Q5: What is the difference between Prometheus and Grafana?
* **Answer:** *"Prometheus is a time-series metrics collection and alerting database that actively scrapes numeric metrics from target endpoints (like our `/metrics` route via pull mechanism). Grafana is a data visualization and analytics dashboard that queries Prometheus and displays those metrics as real-time graphs, gauges, and health indicators."*
