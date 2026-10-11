# 🧪 User Acceptance Testing (UAT) & Verification Matrix
**QA Coordinator & Scrum Lead:** Kripa Masand (`@kripa-30`)  
**Project:** CampusFix  
**Status:** All Acceptance Criteria Verified & Passed

---

## 📋 UAT Test Execution Matrix

| Test ID | Persona | Action / Scenario | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UAT-01** | Student | Register with unique username & password | Account created, redirected to login with success alert | **PASS** |
| **UAT-02** | Student | Submit complaint (Hostel / WiFi breakdown) | Ticket logged in DB, instant counter increments | **PASS** |
| **UAT-03** | Student | View filed complaints table | Ticket appears with status badge (`Open`) and timestamp | **PASS** |
| **UAT-04** | Admin | Sign in via Admin credentials (`admin` / `admin123`) | Directed to `/admin` privileged console | **PASS** |
| **UAT-05** | Admin | Update status of ticket from `Open` to `Resolved` | Status changes, flash banner confirms update | **PASS** |
| **UAT-06** | Student | Attempt privilege escalation to admin via registration | Server overrides role to `student` unconditionally | **PASS** |
| **UAT-07** | DevOps | Query `/health` endpoint | HTTP 200 with JSON `{"status": "healthy"}` | **PASS** |
| **UAT-08** | DevOps | Scrape `/metrics` endpoint via Prometheus | Prometheus targets report state `UP` | **PASS** |

---

## 🎖️ Final Quality Sign-Off
All 8 user acceptance criteria have been verified across automated test suites and live UI workflows.
* **Signed off by:** Kripa Masand (QA Lead & Scrum Master)
