# 🐳 Docker Basics - Complete Learning Tutorial

> **For Students:** Learn Docker from scratch with hands-on examples!

---

## 📚 What You'll Learn

This tutorial teaches Docker step-by-step with **lightweight, practical examples**. Perfect for beginners!

### Learning Path (2-3 hours)

| Part | Topic | Time | What You'll Build |
|------|-------|------|-------------------|
| **Concepts** | Docker fundamentals | 20 min | Understanding only |
| **Part 1** | Containerize an app | 15 min | Simple Python web app in Docker |
| **Part 2** | Update & rebuild | 10 min | Modify and redeploy |
| **Part 3** | Share on Docker Hub | 10 min | Push/pull images |
| **Part 4** | Persist data (Volumes) | 15 min | Save data permanently |
| **Part 5** | Bind mounts | 10 min | Live code editing |
| **Part 6** | Multi-container apps | 20 min | App + Database |
| **Part 7** | Docker Compose | 20 min | Orchestrate multiple containers |
| **Part 8** | Best practices | 15 min | Production-ready images |

---

## 🎯 Prerequisites

- **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop))
- Basic command line knowledge
- A text editor (VS Code recommended)
- **No programming experience required!** We use simple examples.

---

## 📂 Folder Structure

```
docker-basics/
├── README.md                    ← You are here!
├── DOCKER-CONCEPTS.md           ← Core concepts explained
│
├── part-01-containerize/        ← Build your first container
│   ├── app.py
│   ├── Dockerfile
│   └── README.md
│
├── part-02-update/              ← Update and rebuild
│   ├── app.py
│   ├── Dockerfile
│   └── README.md
│
├── part-03-share/               ← Push to Docker Hub
│   └── README.md
│
├── part-04-volumes/             ← Persist data
│   ├── app.py
│   ├── Dockerfile
│   └── README.md
│
├── part-05-bind-mounts/         ← Live code editing
│   ├── app.py
│   ├── Dockerfile
│   └── README.md
│
├── part-06-multi-container/     ← App + Database
│   ├── app.py
│   ├── Dockerfile
│   └── README.md
│
├── part-07-compose/             ← Docker Compose
│   ├── app.py
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
│
└── part-08-best-practices/      ← Production tips
    ├── Dockerfile.bad
    ├── Dockerfile.good
    └── README.md
```

---

## 🚀 Quick Start

### Step 1: Verify Docker is Installed

```bash
docker --version
docker run hello-world
```

If you see "Hello from Docker!", you're ready!

### Step 2: Start Learning

Begin with **DOCKER-CONCEPTS.md** to understand the fundamentals, then work through each part in order.

```bash
cd docker-basics
# Read DOCKER-CONCEPTS.md first
# Then start with part-01-containerize
```

---

## 🎓 Learning Tips

1. **Follow in order** - Each part builds on the previous one
2. **Type commands yourself** - Don't copy-paste, you'll learn better
3. **Experiment** - Try breaking things and fixing them
4. **Use Docker Desktop** - Visual feedback helps understanding
5. **Ask questions** - Docker concepts take time to sink in

---

## 📖 Key Concepts You'll Master

- ✅ What containers are and why they matter
- ✅ Images vs Containers
- ✅ Writing Dockerfiles
- ✅ Building and running containers
- ✅ Port mapping and networking
- ✅ Data persistence (volumes & bind mounts)
- ✅ Multi-container applications
- ✅ Docker Compose
- ✅ Production best practices

---

## 🆘 Common Issues & Solutions

### "Docker daemon not running"
→ Start Docker Desktop application

### "Port already in use"
→ Stop the container using that port: `docker stop <container-name>`

### "Permission denied"
→ On Linux, add your user to docker group: `sudo usermod -aG docker $USER`

### "Cannot connect to Docker daemon"
→ Restart Docker Desktop

---

## 📚 Additional Resources

- [Official Docker Docs](https://docs.docker.com)
- [Docker Hub](https://hub.docker.com) - Find pre-built images
- [Play with Docker](https://labs.play-with-docker.com) - Free online playground
- [Docker Cheatsheet](../cheatsheet.md) - Quick command reference

---

## ✨ What's Next?

After completing this tutorial, you'll be ready for:
- **Kubernetes** (container orchestration at scale)
- **CI/CD pipelines** (automated deployments)
- **Microservices architecture**
- **Cloud deployments** (AWS, Azure, GCP)

---

**Ready to start?** Open `DOCKER-CONCEPTS.md` to learn the fundamentals! 🚀
