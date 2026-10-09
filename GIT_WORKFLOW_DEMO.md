# 🌿 Experiment 1: Git & GitHub Workflow Demonstration

Follow these exact Git steps to demonstrate branches, Pull Requests, deliberate build failure, and rollback via `git revert`.

---

## 1. Local Repository Initialization
```bash
# Initialize git repository
git init
git checkout -b main

# Add all project files
git add .
git commit -m "feat(core): initial CampusFix platform with tests and Docker setup"
```

---

## 2. GitHub Remote Repository Setup
```bash
# Replace with your group repository URL
git remote add origin https://github.com/<your-username>/campusfix.git
git push -u origin main
```

---

## 3. Feature Branch & Pull Request Demo
```bash
# Create and switch to a feature branch
git checkout -b feature/auth-enhancement

# (Make a small comment or enhancement)
# Add and commit on feature branch
git add .
git commit -m "feat(auth): enhance login validation messages"

# Push feature branch
git push origin feature/auth-enhancement

# Option A: Create PR on GitHub UI and Merge with --no-ff
# Option B: Local merge with non-fast-forward merge commit
git checkout main
git merge --no-ff feature/auth-enhancement -m "Merge pull request #1 from feature/auth-enhancement"
git push origin main
```

---

## 4. Rollback / Broken Build Demonstration (Exp 1 + Exp 4/5 integration)
To prove the CI/CD pipeline stops bad code from deploying:

### Step 4.1: Introduce Deliberate Bug & Push
```bash
# Create broken branch
git checkout -b fix/broken-logic

# Introduce an assertion failure or syntax bug in a test
# Commit and push
git commit -am "chore: introduce failing assertion for test demo"
git checkout main
git merge fix/broken-logic
git push origin main
```
* **Jenkins Action:** The Jenkins pipeline runs, detects the failing test in Stage 2, halts the pipeline with **FAILED**, and refuses to deploy to production. Capture a screenshot of the red build in Jenkins!

### Step 4.2: Perform Clean Rollback via `git revert`
```bash
# Revert the faulty commit without rewriting history
git revert HEAD --no-edit

# Push reverted commit
git push origin main
```
* **Jenkins Action:** Jenkins detects the new commit via SCM polling/webhook, all 10 tests pass, and the build goes **GREEN (SUCCESS)**. Capture this screenshot as your rollback proof!

---

## 5. Summary Table for Lab Report

| Build # | Git Commit / Action | Jenkins Status | Outcome / Explanation |
|---|---|---|---|
| **Build 1** | Initial commit (`main`) | ✅ SUCCESS | Full test suite passed; deployed stack to port 5000 |
| **Build 2** | PR Merge `feature/auth-enhancement` | ✅ SUCCESS | Non-fast-forward merge verified and redeployed |
| **Build 3** | Breaking change commit | ❌ FAILED | Unit test failure caught by CI; deployment aborted |
| **Build 4** | `git revert HEAD` | ✅ SUCCESS | Clean rollback restored production stability |
