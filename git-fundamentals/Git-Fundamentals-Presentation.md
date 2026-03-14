# Git Fundamentals – Workshop Presentation
## Slide-by-Slide Content Guide

---

## SLIDE 1: Title Slide

**Title:** Git Fundamentals
**Subtitle:** Version Control Made Simple
**Footer:** Developer Workshop Series

---

## SLIDE 2: Agenda

**Title:** What We'll Cover Today

1. 🤔  What is Git & Why Do We Need It?
2. ⚙️   Git Installation & Setup
3. 🧱  Core Concepts – Repos, Commits, Branches
4. 🔄  The Git Workflow
5. 🌿  Branching & Merging
6. 🌐  Working with Remote Repositories (GitHub)
7. 🔀  Pull Requests & Collaboration
8. 🎓  Hands-On Demo
9. 🚀  Best Practices

⏱ 45 minutes

---

## SLIDE 3: The Problem – No Version Control 😫

**Title:** The Problem – Without Version Control

WITHOUT Git:
- final.docx
- final_v2.docx
- final_FINAL.docx
- final_FINAL_v2.docx
- final_FINAL_use_this_one.docx
- final_FINAL_use_this_one_FIXED.docx

**Everyone has experienced this!**

Problems:
- ❌ Which version is the latest?
- ❌ What changed between versions?
- ❌ Who made that change?
- ❌ How do we go back to a working version?
- ❌ Two people editing the same file = chaos!

---

## SLIDE 4: What is Git?

**Title:** What is Git? 🐙

> Git is a **distributed version control system** that tracks changes in files over time, letting you recall specific versions later and collaborate with others.

Key facts:
- 📅  Created by **Linus Torvalds** in 2005 (same person who made Linux)
- 🌍  Used by **96%** of professional developers
- 🆓  Free and open-source
- ⚡  Works offline – your full history is local
- 🔒  Nothing is ever truly deleted (history is preserved)

**Analogy:** Git is like a **time machine + save points** for your code.

---

## SLIDE 5: Git vs GitHub – They Are Different!

**Title:** Git vs GitHub – Not the Same Thing!

| | Git | GitHub |
|---|---|---|
| **What** | Version control tool | Website / cloud service |
| **Where** | Your computer | Internet (cloud) |
| **Made by** | Linus Torvalds | Microsoft |
| **Cost** | Free | Free (+ paid plans) |
| **Purpose** | Track changes locally | Share & collaborate online |

**Analogy:**
- 🐙 **Git** = the engine in your car
- 🌐 **GitHub** = the motorway (road network)

Other alternatives to GitHub: **GitLab**, **Bitbucket**, **Azure DevOps**

---

## SLIDE 6: Core Concept #1 – Repository

**Title:** Core Concept #1 – Repository (Repo) 📁

**What is a Repository?**
- A folder that Git is tracking
- Contains all your project files
- Contains the **entire history** of every change ever made
- Can be **local** (on your machine) or **remote** (on GitHub)

```bash
# Create a new repository
git init my-project

# OR clone an existing one from GitHub
git clone https://github.com/user/repo.git
```

**Analogy:** A repository is like a **Google Drive folder**, but it remembers every change ever made to every file.

---

## SLIDE 7: Core Concept #2 – Commit

**Title:** Core Concept #2 – Commit 💾

**What is a Commit?**
- A **snapshot** of your files at a point in time
- Has a unique ID (hash), author, date, and message
- Commits are **permanent** – you can always go back

```bash
# Stage files (prepare for commit)
git add app.py

# Commit with a message
git commit -m "Add user login feature"

# View commit history
git log --oneline
```

**Analogy:** A commit is like a **Save Point in a video game** – you can always return to it.

```
abc1234  Add user login feature
def5678  Fix homepage styling
ghi9012  Initial project setup
```

---

## SLIDE 8: Core Concept #3 – Branch

**Title:** Core Concept #3 – Branch 🌿

**What is a Branch?**
- An **independent line of development**
- Default branch is called `main` (or `master`)
- Create branches to work on features without affecting `main`
- Branches are **cheap and fast** to create in Git

```
main   ──●──●──●──────────────●──→
              \              /
feature        ●──●──●──●──●
```

```bash
# Create and switch to new branch
git checkout -b feature/login

# List all branches
git branch

# Switch branch
git checkout main
```

**Analogy:** Branches are like **parallel universes** – you can work on a feature without affecting the main codebase.

---

## SLIDE 9: The 3 Areas of Git

**Title:** The 3 Areas of Git – Working, Staging, Repository

```
┌─────────────────┐    git add    ┌───────────────┐   git commit  ┌──────────────┐
│  Working        │  ──────────→  │  Staging Area │  ──────────→  │  Repository  │
│  Directory      │               │  (Index)      │               │  (History)   │
│                 │               │               │               │              │
│  Your files     │               │  Files ready  │               │  Committed   │
│  (edited)       │               │  to commit    │               │  snapshots   │
└─────────────────┘               └───────────────┘               └──────────────┘
         ↑                                                                 │
         └─────────────────────── git checkout ──────────────────────────┘
```

- **Working Directory** – where you edit files
- **Staging Area** – where you prepare your next commit
- **Repository** – permanent history of all commits

---

## SLIDE 10: The Daily Git Workflow

**Title:** The Daily Git Workflow 🔄

```bash
# 1. Start your day – get latest changes
git pull origin main

# 2. Create a feature branch
git checkout -b feature/new-button

# 3. Make your changes in the editor...

# 4. See what changed
git status
git diff

# 5. Stage your changes
git add .

# 6. Commit your changes
git commit -m "Add blue submit button to checkout page"

# 7. Push to GitHub
git push origin feature/new-button

# 8. Create a Pull Request on GitHub
```

---

## SLIDE 11: git status & git diff

**Title:** Know What's Changed – status & diff

```bash
# See overall status
git status
```
```
On branch feature/login
Changes not staged for commit:
  modified:   app.py
  modified:   templates/login.html

Untracked files:
  new-feature.py
```

```bash
# See exact line-by-line changes
git diff
```
```diff
- old line that was removed
+ new line that was added
```

```bash
# See what's staged (ready to commit)
git diff --staged
```

**Tip:** Run `git status` frequently – it tells you exactly what to do next!

---

## SLIDE 12: Writing Good Commit Messages

**Title:** Writing Good Commit Messages ✍️

**Bad commit messages ❌**
```
git commit -m "fix"
git commit -m "stuff"
git commit -m "asdfgh"
git commit -m "WIP"
git commit -m "changes"
```

**Good commit messages ✅**
```
git commit -m "Fix login redirect after password reset"
git commit -m "Add search functionality to product page"
git commit -m "Update Python version from 3.8 to 3.9"
git commit -m "Remove deprecated payment gateway code"
```

**Format:** `<type>: <what changed>`
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `refactor:` code restructure
- `test:` adding tests

---

## SLIDE 13: Branching Strategy

**Title:** Branching Strategy – How Teams Work

```
main        ──●──────────────────────────●──→  (production)
              │                          │
develop     ──●──●──●──●──●──●──●──●──●──→  (integration)
                  │           │
feature/login ──●──●──●──●──┘
                              │
feature/cart  ──────────●──●──●──●──┘
```

**Common branch naming:**
```bash
feature/user-authentication
feature/shopping-cart
bugfix/login-redirect-error
hotfix/payment-crash
release/v2.0
```

**Rule of thumb:**
- ✅  `main` is always deployable
- ✅  Never commit directly to `main`
- ✅  Use branches for every feature or fix

---

## SLIDE 14: Merging Branches

**Title:** Merging Branches 🔀

```bash
# Switch to main
git checkout main

# Merge the feature branch
git merge feature/login

# Delete the branch (cleanup)
git branch -d feature/login
```

**Fast-forward merge** (no conflicts):
```
main    ──●──●
              \
feature        ●──●──●
                       ↓ merge
main    ──●──●──●──●──●
```

**Merge conflict** – when same line edited in both branches:
```
<<<<<<< HEAD (main)
button color: blue;
=======
button color: red;
>>>>>>> feature/login
```
→ Edit the file manually, pick the correct version, then `git add` and `git commit`

---

## SLIDE 15: Working with GitHub – Remote Repos

**Title:** Working with GitHub 🌐

```bash
# Link your local repo to GitHub
git remote add origin https://github.com/username/repo.git

# First push (sets upstream)
git push -u origin main

# Push subsequent changes
git push

# Pull latest changes from GitHub
git pull

# Fetch without merging (safe)
git fetch origin
```

**Key remote commands:**
| Command | What it does |
|---|---|
| `git remote -v` | Show connected remotes |
| `git push` | Upload commits to GitHub |
| `git pull` | Download + merge from GitHub |
| `git fetch` | Download without merging |
| `git clone` | Copy a repo from GitHub |

---

## SLIDE 16: Pull Requests (PRs)

**Title:** Pull Requests – Team Collaboration 🤝

**What is a Pull Request?**
- A request to merge your branch into `main`
- Triggers **code review** by teammates
- Shows exactly what changed
- Can have comments, discussions, approvals
- Industry standard for team collaboration

**PR Workflow:**
```
1. Push your feature branch to GitHub
         ↓
2. Open a Pull Request on GitHub
         ↓
3. Teammates review the code
         ↓
4. Make requested changes & push again
         ↓
5. Get approval ✅
         ↓
6. Merge into main
         ↓
7. Delete feature branch (cleanup)
```

---

## SLIDE 17: Undoing Things

**Title:** Undoing Things – Git's Safety Net 🛡️

```bash
# Undo changes to a file (not yet staged)
git checkout -- app.py

# Unstage a file (keep changes)
git reset HEAD app.py

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset --mixed HEAD~1

# Create a new commit that reverses a previous one (safe!)
git revert abc1234

# View history and go back to any point
git log --oneline
git checkout abc1234   # detached HEAD – explore old version
```

⚠️ **Never use `git reset --hard` on shared branches** – it rewrites history!

---

## SLIDE 18: Essential Git Commands – Cheat Sheet

**Title:** Essential Git Commands – Save This! 💾

```bash
# ── Setup ────────────────────────────────────────────
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# ── Start ────────────────────────────────────────────
git init                    # new local repo
git clone <url>             # copy from GitHub

# ── Daily ────────────────────────────────────────────
git status                  # what changed?
git add .                   # stage all changes
git add <file>              # stage one file
git commit -m "message"     # save snapshot
git push                    # upload to GitHub
git pull                    # download from GitHub

# ── Branches ─────────────────────────────────────────
git branch                  # list branches
git checkout -b feature/x   # create + switch
git checkout main           # switch to main
git merge feature/x         # merge branch
git branch -d feature/x     # delete branch

# ── History ──────────────────────────────────────────
git log --oneline           # compact history
git diff                    # see changes
```

---

## SLIDE 19: .gitignore – What NOT to Track

**Title:** .gitignore – Exclude Files from Git

**Never commit these:**
```gitignore
# Dependencies
node_modules/
__pycache__/
*.pyc
venv/

# Environment & Secrets
.env
.env.local
*.pem
*.key

# Build outputs
dist/
build/
*.log

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db
```

```bash
# Check if a file is ignored
git check-ignore -v filename

# See all ignored files
git status --ignored
```

**Rule:** If it's auto-generated or contains secrets → add to `.gitignore`

---

## SLIDE 20: DEMO – Hands-On Git

**Title:** DEMO – Your First Git Repository 🎉

```bash
# 1. Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "you@email.com"

# 2. Create a project
mkdir my-git-demo && cd my-git-demo
git init

# 3. Create a file
echo "# My Project" > README.md

# 4. Stage and commit
git add README.md
git commit -m "Initial commit"

# 5. Create a branch and make changes
git checkout -b feature/about
echo "Made by: Your Name" >> README.md
git add .
git commit -m "Add author to README"

# 6. Merge back to main
git checkout main
git merge feature/about

# 7. View the history
git log --oneline
```

---

## SLIDE 21: Best Practices

**Title:** Git Best Practices 🏆

✅ **DO:**
- Commit small, focused changes
- Write descriptive commit messages
- Pull before you push
- Use branches for every feature
- Review code before merging
- Keep `main` always deployable
- Use `.gitignore` from the start

❌ **DON'T:**
- Commit secrets, passwords or API keys
- Commit directly to `main`
- Use vague messages like "fix" or "WIP"
- Force push to shared branches (`git push --force`)
- Commit huge binary files or build artifacts
- Let branches live too long without merging

---

## SLIDE 22: Key Takeaways

**Title:** Key Takeaways

- 🐙  **Git** tracks every change to your code with full history
- 💾  **Commits** are save points – always write clear messages
- 🌿  **Branches** let you work in isolation without breaking `main`
- 🌐  **GitHub** is where you share and collaborate on code
- 🔀  **Pull Requests** are how teams review and merge code safely
- 🛡️   **Nothing is lost** – Git can always undo and restore

> Git is the single most important tool in a developer's toolkit.

---

## SLIDE 23: What's Next?

**Title:** What's Next? 🚀

- ✅  Git Fundamentals (Done!)
- 📝  Advanced Git – rebase, cherry-pick, stash
- 📝  GitHub Actions – CI/CD automation
- 📝  Git Workflows – Gitflow, trunk-based development
- 📝  Code Review best practices
- 📝  Connecting Git with Docker & Kubernetes

---

## SLIDE 24: Thank You

**Title:** Thank You! 🙏

📁  Workshop material & exercises in every folder
💬  Ask questions anytime
🎯  Practice makes perfect – commit every day!

**Start today:**
```bash
git init
git add .
git commit -m "My first commit!"
```
