# Git Fundamentals 🐙

> **Goal:** Learn Git version control from scratch – the most essential developer skill!

---

## 📁 What's in This Folder?

```
git-fundamentals/
├── README.md                        ← You are here! (Hands-on guide)
├── Git-Fundamentals-Presentation.md ← Slide content
└── exercises/
    ├── 01-first-repo.md             ← Exercise 1: Your first repo
    ├── 02-branching.md              ← Exercise 2: Branches & merging
    └── 03-collaboration.md          ← Exercise 3: GitHub workflow
```

---

## 🎯 What You'll Learn

- What Git is and why every developer needs it
- Core concepts: repos, commits, branches, merges
- The daily Git workflow
- Working with GitHub (remote repos)
- Branching, merging and Pull Requests
- How to undo mistakes safely
- Best practices used in real teams

---

## ⚙️ Prerequisites

### Install Git
```bash
# Check if Git is installed
git --version

# Windows: Download from https://git-scm.com/download/win
# Mac:
brew install git
# Ubuntu/Debian:
sudo apt install git
```

### First-Time Setup (do this once)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.editor "code --wait"   # use VS Code as editor

# Verify your settings
git config --list
```

---

## 🧱 Core Concepts – Quick Reference

### Repository (Repo)
A folder Git is tracking – contains all files + full history.
```bash
git init                        # create new local repo
git clone <url>                 # copy from GitHub
```

### Commit
A snapshot of your files at a point in time.
```bash
git add .                       # stage all changes
git commit -m "Your message"    # save snapshot
git log --oneline               # view history
```

### Branch
An independent line of development.
```bash
git checkout -b feature/login   # create + switch to branch
git branch                      # list branches
git checkout main               # switch back to main
git merge feature/login         # merge branch into current
git branch -d feature/login     # delete branch (after merge)
```

---

## 🔄 The Daily Workflow

```bash
# Morning – get latest changes
git pull origin main

# Create a branch for your work
git checkout -b feature/my-feature

# ... make your changes in the editor ...

# Check what changed
git status
git diff

# Stage your changes
git add .                        # all files
git add app.py                   # specific file

# Commit
git commit -m "Add my feature"

# Push to GitHub
git push origin feature/my-feature

# → Then open a Pull Request on GitHub
```

---

## 🌿 Branching & Merging

### Create & Work on a Branch
```bash
git checkout -b feature/user-login
# make changes...
git add .
git commit -m "Add login form"
git push origin feature/user-login
```

### Merge Back to Main
```bash
git checkout main
git pull                        # get latest main first
git merge feature/user-login
git push
git branch -d feature/user-login
```

### Handle a Merge Conflict
When Git can't auto-merge:
```bash
git merge feature/login
# CONFLICT in app.py

# Open app.py and look for:
# <<<<<<< HEAD
# your version
# =======
# their version
# >>>>>>> feature/login

# Edit to keep the correct version, then:
git add app.py
git commit -m "Resolve merge conflict in app.py"
```

---

## 🌐 Working with GitHub

### Connect Local Repo to GitHub
```bash
# Add remote
git remote add origin https://github.com/username/repo.git

# First push
git push -u origin main

# All future pushes
git push
```

### Common Remote Commands
```bash
git remote -v                   # show connected remotes
git push                        # upload commits
git pull                        # download + merge
git fetch origin                # download without merging
git clone <url>                 # copy entire repo
```

---

## ↩️ Undoing Things

```bash
# Undo changes to a file (not staged yet)
git restore app.py

# Unstage a file (keep changes)
git restore --staged app.py

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what a commit changed
git show abc1234

# Create a reverting commit (safe for shared branches)
git revert abc1234

# Stash changes temporarily
git stash
git stash pop                   # bring them back
```

---

## 📋 .gitignore – What to Exclude

Create a `.gitignore` file in your repo root:
```gitignore
# Python
__pycache__/
*.pyc
venv/
.env

# Node.js
node_modules/
dist/

# Secrets – NEVER commit these!
*.pem
*.key
.env
.env.local
secrets.json

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

---

## 💾 Essential Commands – Cheat Sheet

```bash
# ── Setup ─────────────────────────────────────────────
git config --global user.name "Name"
git config --global user.email "email"

# ── Start ─────────────────────────────────────────────
git init                        # new repo
git clone <url>                 # clone from GitHub

# ── Daily ─────────────────────────────────────────────
git status                      # what changed?
git add .                       # stage all
git add <file>                  # stage one file
git commit -m "message"         # commit
git push                        # push to GitHub
git pull                        # pull from GitHub

# ── Branches ──────────────────────────────────────────
git branch                      # list
git checkout -b <name>          # create + switch
git checkout <name>             # switch
git merge <branch>              # merge
git branch -d <name>            # delete

# ── Inspect ───────────────────────────────────────────
git log --oneline               # compact history
git log --oneline --graph       # visual branch history
git diff                        # unstaged changes
git diff --staged               # staged changes
git show <hash>                 # show a commit

# ── Undo ──────────────────────────────────────────────
git restore <file>              # discard changes
git reset --soft HEAD~1         # undo last commit
git stash                       # save for later
git stash pop                   # restore stash
```

---

## 🏆 Best Practices

### ✅ DO
- Commit small, focused changes
- Write clear commit messages (`feat: add login button`)
- Pull before you push
- Use a branch for every feature/fix
- Review code via Pull Requests
- Keep `main` always deployable
- Add `.gitignore` from day one

### ❌ DON'T
- Commit secrets or passwords
- Commit directly to `main`
- Use vague messages: "fix", "stuff", "WIP"
- Force push to shared branches
- Commit `node_modules/` or build artifacts
- Let feature branches live for weeks

---

## 🎯 Hands-On Exercises

### Exercise 1 – Your First Repo (5 min)
```bash
# 1. Create a new folder and initialise Git
mkdir git-demo && cd git-demo
git init

# 2. Create a file
echo "# My Git Demo" > README.md

# 3. Stage and commit
git add README.md
git commit -m "Initial commit: add README"

# 4. Make a change
echo "Author: Your Name" >> README.md
git add .
git commit -m "docs: add author to README"

# 5. View the history
git log --oneline
```

### Exercise 2 – Branching (10 min)
```bash
# 1. Create a feature branch
git checkout -b feature/about-page

# 2. Add a new file
echo "# About" > about.md
echo "This is a demo project." >> about.md
git add about.md
git commit -m "feat: add about page"

# 3. Make another commit on this branch
echo "Created during Git workshop." >> about.md
git add .
git commit -m "docs: add workshop note to about page"

# 4. View branch history
git log --oneline --graph --all

# 5. Merge back to main
git checkout main
git merge feature/about-page
git branch -d feature/about-page

# 6. View final history
git log --oneline
```

### Exercise 3 – GitHub (15 min)
```bash
# 1. Create a repo on github.com (click New)

# 2. Connect your local repo
git remote add origin https://github.com/YOUR_USERNAME/git-demo.git
git push -u origin main

# 3. Create a branch and push it
git checkout -b feature/contact-page
echo "# Contact" > contact.md
git add .
git commit -m "feat: add contact page"
git push origin feature/contact-page

# 4. Open a Pull Request on GitHub
# → Go to github.com/YOUR_USERNAME/git-demo
# → Click "Compare & pull request"
# → Add a description and click "Create pull request"
# → Merge it!
```

---

## 📚 Further Learning

| Resource | Link |
|---|---|
| Official Git Docs | https://git-scm.com/doc |
| Pro Git Book (free) | https://git-scm.com/book |
| GitHub Skills | https://skills.github.com |
| Learn Git Branching (visual) | https://learngitbranching.js.org |
| Conventional Commits | https://conventionalcommits.org |
