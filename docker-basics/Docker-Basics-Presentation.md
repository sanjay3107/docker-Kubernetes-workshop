# Docker Basics - Complete Presentation
## For Converting to PowerPoint

> **Instructions:** Copy each slide section into PowerPoint slides. Use images/diagrams where indicated.

---

## SLIDE 1: Title Slide

**Title:** Introduction to Docker
**Subtitle:** Containerization Made Simple
**Footer:** Docker & Kubernetes Workshop

**Visual:** Docker logo (whale)

---

## SLIDE 2: Agenda

**What We'll Cover Today:**

1. What is Docker?
2. The Problem Docker Solves
3. Docker vs Virtual Machines
4. Core Concepts: Images & Containers
5. Docker Hub
6. Hands-On Demo
7. Next Steps

**Time:** 30 minutes

---

## SLIDE 3: What is Docker?

**Definition:**
Docker is a platform that packages applications with everything they need to run, then runs them anywhere.

**Key Points:**
- 🐳 Open-source containerization platform
- 📦 Package app + dependencies together
- 🚀 Run consistently across environments
- ⚡ Lightweight and fast

**Tagline:** "Build once, run anywhere"

---

## SLIDE 4: The Shipping Container Analogy

**Before Containers (1950s):**
- Every ship was different
- Loading took weeks
- Items got damaged
- Chaos at ports

**After Containers:**
- Standardized boxes
- Load/unload in hours
- Items protected
- Works on any ship

**Docker does the same for software!**

**Visual:** Split image - old cargo ship vs modern container ship

---

## SLIDE 5: The "It Works on My Machine" Problem

**Without Docker:**

```
Developer's Laptop ✅
├── Python 3.9
├── Node.js 18
└── App works!

Teammate's Laptop ❌
├── Python 3.7 (wrong version!)
├── Node.js 16 (wrong version!)
└── App broken!

Production Server ❌
├── Different OS
├── Missing libraries
└── App crashes!
```

**Visual:** Three computers with different colored checkmarks/crosses

---

## SLIDE 6: With Docker - Consistency Everywhere

**With Docker:**

```
Developer's Laptop ✅
└── Docker Container
    ├── Python 3.9
    ├── Node.js 18
    └── App works!

Teammate's Laptop ✅
└── Same Container
    └── App works!

Production Server ✅
└── Same Container
    └── App works!
```

**Result:** Same environment = Same behavior

**Visual:** Three computers all with green checkmarks

---

## SLIDE 7: Real-World Benefits

**For Developers:**
- ✅ Consistent development environment
- ✅ Easy onboarding (minutes vs days)
- ✅ No "works on my machine" issues

**For Operations:**
- ✅ Predictable deployments
- ✅ Easy scaling
- ✅ Efficient resource usage

**For Business:**
- ✅ Faster time to market
- ✅ Lower infrastructure costs
- ✅ Improved reliability

---

## SLIDE 8: Docker vs Virtual Machines - Architecture

**Virtual Machine:**
```
┌─────────────────────────┐
│    Your Computer        │
├─────────────────────────┤
│    Hypervisor           │
├─────────────────────────┤
│ ┌─────┐    ┌─────┐     │
│ │ VM1 │    │ VM2 │     │
│ │ OS  │    │ OS  │     │ ← Full OS each!
│ │ App │    │ App │     │
│ └─────┘    └─────┘     │
└─────────────────────────┘
```

**Docker:**
```
┌─────────────────────────┐
│    Your Computer (OS)   │
├─────────────────────────┤
│    Docker Engine        │
├─────────────────────────┤
│ ┌────┐ ┌────┐ ┌────┐   │
│ │App1│ │App2│ │App3│   │ ← Shares OS!
│ └────┘ └────┘ └────┘   │
└─────────────────────────┘
```

**Visual:** Side-by-side diagrams

---

## SLIDE 9: Docker vs VMs - Comparison

| Feature | Virtual Machine | Docker Container |
|---------|----------------|------------------|
| **Size** | 2-20 GB | 10-500 MB |
| **Boot Time** | 1-2 minutes | 1-2 seconds |
| **Performance** | Slower | Near-native |
| **Resource Usage** | Heavy | Lightweight |
| **Isolation** | Complete | Process-level |
| **Portability** | Medium | High |

**Key Takeaway:** Containers are much lighter and faster!

---

## SLIDE 10: When to Use What?

**Use Virtual Machines:**
- ✅ Different operating systems (Windows on Mac)
- ✅ Complete isolation needed
- ✅ Legacy applications

**Use Docker Containers:**
- ✅ Modern applications
- ✅ Microservices
- ✅ Fast deployment
- ✅ Resource efficiency
- ✅ Development environments

**Can use both together!** Docker can run inside VMs.

---

## SLIDE 11: Core Concept #1 - Docker Image

**What is an Image?**
- 📋 Blueprint/template for containers
- 📦 Contains app + all dependencies
- 🔒 Read-only (immutable)
- 💾 Stored locally or on Docker Hub

**Analogy:**
- Like a **recipe** (cooking)
- Like a **class** (programming)
- Like a **cookie cutter** (baking)

**Example:** `python:3.9` image contains Linux + Python 3.9 + pip

**Visual:** Blueprint icon or recipe card

---

## SLIDE 12: Core Concept #2 - Docker Container

**What is a Container?**
- ▶️ Running instance of an image
- 🏃 Isolated environment
- ✍️ Can read/write while running
- ⏱️ Temporary (unless data saved)

**Analogy:**
- Like a **dish from recipe** (cooking)
- Like an **object/instance** (programming)
- Like a **cookie from cutter** (baking)

**Example:** From one `python:3.9` image, run many containers

**Visual:** Running process icon or container box

---

## SLIDE 13: Image → Container Relationship

```
┌─────────────────┐
│  Docker Image   │  ← Blueprint
│   "python:3.9"  │    (stored on disk)
└────────┬────────┘
         │
         ├──→ Container 1 (running web app)
         ├──→ Container 2 (running API)
         ├──→ Container 3 (running tests)
         └──→ Container 4 (stopped)
```

**Key Point:**
- One image → Many containers
- Like one cookie cutter → Many cookies

**Visual:** Flowchart showing one image creating multiple containers

---

## SLIDE 14: Docker Hub - The Image Registry

**What is Docker Hub?**
- 🌐 Public registry for Docker images
- 📚 Like GitHub for Docker images
- 🆓 Free to use
- ✅ Official verified images

**Popular Images:**
- `nginx` - Web server (1B+ downloads)
- `python` - Python runtime (1B+ downloads)
- `node` - Node.js runtime (1B+ downloads)
- `redis` - Database (1B+ downloads)
- `postgres` - Database (500M+ downloads)

**URL:** https://hub.docker.com

**Visual:** Docker Hub logo and screenshot

---

## SLIDE 15: Image Tags - Versions

**Images have tags for different versions:**

```
python:3.9          ← Python 3.9 (full version)
python:3.9-slim     ← Python 3.9 (smaller)
python:3.9-alpine   ← Python 3.9 (smallest)
python:latest       ← Latest version
```

**Best Practice:**
- ✅ Use specific versions in production
- ❌ Avoid `latest` tag (unpredictable)

**Example:**
```bash
docker pull python:3.9-slim
```

---

## SLIDE 16: Docker Architecture

```
┌─────────────────────────────────────┐
│       Your Computer                 │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Docker Desktop (GUI)       │  │
│  └──────────────────────────────┘  │
│              ↕                      │
│  ┌──────────────────────────────┐  │
│  │   Docker CLI (Commands)      │  │
│  │   $ docker run ...           │  │
│  └──────────────────────────────┘  │
│              ↕                      │
│  ┌──────────────────────────────┐  │
│  │   Docker Engine (Daemon)     │  │
│  │   - Manages containers       │  │
│  │   - Manages images           │  │
│  └──────────────────────────────┘  │
│              ↕                      │
│  ┌──────────────────────────────┐  │
│  │   Containers (Running Apps)  │  │
│  │   [App1] [App2] [App3]       │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## SLIDE 17: Docker Workflow

**Typical Development Flow:**

```
1. Pull Image
   docker pull python:3.9
   ↓
2. Run Container
   docker run -it python:3.9
   ↓
3. Develop & Test
   (Make changes)
   ↓
4. Build Custom Image
   docker build -t myapp .
   ↓
5. Push to Registry
   docker push myapp
   ↓
6. Deploy Anywhere
   docker run myapp
```

**Visual:** Circular workflow diagram

---

## SLIDE 18: DEMO - Your First Container

**Live Demo Steps:**

```bash
# 1. Check Docker is installed
docker --version

# 2. Run Hello World
docker run hello-world

# 3. Pull Python image
docker pull python:3.9-slim

# 4. Run interactive Python
docker run -it python:3.9-slim

# 5. Run Nginx web server
docker run -d -p 8080:80 nginx:alpine

# 6. Open browser
http://localhost:8080
```

**Visual:** Terminal screenshots or live demo

---

## SLIDE 19: Essential Docker Commands

**Images:**
```bash
docker pull <image>      # Download image
docker images            # List images
docker rmi <image>       # Remove image
```

**Containers:**
```bash
docker run <image>       # Create & run
docker ps                # List running
docker ps -a             # List all
docker stop <id>         # Stop container
docker rm <id>           # Remove container
```

**Cleanup:**
```bash
docker system prune      # Clean up unused
```

---

## SLIDE 20: Common Docker Flags

**docker run flags:**

```bash
-d              # Detached (background)
-it             # Interactive terminal
-p 8080:80      # Port mapping (host:container)
--name myapp    # Custom name
-v data:/data   # Volume mount
-e KEY=value    # Environment variable
--rm            # Auto-remove when stopped
```

**Example:**
```bash
docker run -d -p 3000:3000 --name webapp myapp
```

---

## SLIDE 21: Port Mapping Explained

**Without Port Mapping:**
```
Your Computer          Container
─────────────          ─────────
                       Port 80 (isolated)
                       ❌ Cannot access
```

**With Port Mapping:**
```
Your Computer          Container
─────────────          ─────────
Port 8080    ←────→   Port 80
✅ Accessible          App runs here
```

**Command:**
```bash
docker run -p 8080:80 nginx
```

**Access:** http://localhost:8080

**Visual:** Diagram showing port mapping

---

## SLIDE 22: Docker Use Cases

**Development:**
- 👥 Consistent team environments
- 🚀 Fast onboarding
- 🧪 Isolated testing

**Production:**
- 📈 Easy scaling
- 🔄 Rolling updates
- 🛡️ Isolation & security

**CI/CD:**
- ⚙️ Automated testing
- 🚢 Continuous deployment
- 🔁 Reproducible builds

---

## SLIDE 23: Real-World Example - Microservices

**Traditional Monolith:**
```
┌─────────────────────────┐
│   One Big Application   │
│  ┌──────────────────┐   │
│  │ Auth + API +     │   │
│  │ Database +       │   │
│  │ Frontend         │   │
│  └──────────────────┘   │
└─────────────────────────┘
```

**Microservices with Docker:**
```
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│ Auth   │  │  API   │  │Database│  │Frontend│
│Container  │Container  │Container  │Container
└────────┘  └────────┘  └────────┘  └────────┘
```

**Benefits:** Independent scaling, deployment, updates

---

## SLIDE 24: Docker Ecosystem

**Core Tools:**
- 🐳 **Docker Engine** - Run containers
- 🖥️ **Docker Desktop** - GUI for Mac/Windows
- 🌐 **Docker Hub** - Image registry
- 🎼 **Docker Compose** - Multi-container apps

**Advanced:**
- ☸️ **Kubernetes** - Container orchestration
- 🐝 **Docker Swarm** - Clustering
- 📊 **Docker Scout** - Security scanning

---

## SLIDE 25: Docker Compose Preview

**Problem:** Running multiple containers manually is tedious

**Solution:** Define everything in `docker-compose.yml`

```yaml
services:
  web:
    image: nginx
    ports:
      - "80:80"
  
  database:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret
```

**Start everything:**
```bash
docker compose up
```

**We'll cover this in Part 7!**

---

## SLIDE 26: Kubernetes Preview

**What is Kubernetes?**
- Container orchestration platform
- Manages hundreds/thousands of containers
- Auto-scaling, self-healing, load balancing

**Docker vs Kubernetes:**
- **Docker:** Runs containers on one machine
- **Kubernetes:** Manages containers across many machines

**Think of it as:**
- Docker = Running one container
- Kubernetes = Managing a fleet of containers

**We'll cover this after Docker basics!**

---

## SLIDE 27: Best Practices

**DO:**
- ✅ Use specific image tags (not `latest`)
- ✅ Keep images small
- ✅ One process per container
- ✅ Use `.dockerignore` file
- ✅ Run as non-root user
- ✅ Scan for vulnerabilities

**DON'T:**
- ❌ Store secrets in images
- ❌ Use `latest` tag in production
- ❌ Run multiple services in one container
- ❌ Ignore security updates

---

## SLIDE 28: Common Pitfalls & Solutions

**Problem:** "Port already in use"
**Solution:** `docker ps` to find container, `docker stop <id>`

**Problem:** "Cannot connect to Docker daemon"
**Solution:** Start Docker Desktop

**Problem:** "Image not found"
**Solution:** Check spelling, pull image first

**Problem:** "Container exits immediately"
**Solution:** Check logs with `docker logs <id>`

---

## SLIDE 29: Learning Path

**Your Journey:**

```
1. ✅ Today: Docker Basics
   ↓
2. Part 1-8: Hands-On Docker
   ↓
3. Docker Compose
   ↓
4. Kubernetes Basics
   ↓
5. Production Deployment
   ↓
6. Advanced Topics
```

**Next Step:** Part 1 - Containerize Your First App

---

## SLIDE 30: Resources

**Official:**
- 📖 Docker Docs: https://docs.docker.com
- 🌐 Docker Hub: https://hub.docker.com
- 🎓 Docker Training: https://docker.com/training

**Practice:**
- 🧪 Play with Docker: https://labs.play-with-docker.com
- 💻 Our Workshop: `/docker-basics/` folder

**Community:**
- 💬 Docker Forums
- 📺 YouTube tutorials
- 📚 Docker books

---

## SLIDE 31: Quick Reference Card

**Essential Commands:**
```bash
# Images
docker pull python:3.9
docker images
docker rmi python:3.9

# Containers
docker run nginx
docker run -d -p 8080:80 nginx
docker ps
docker stop <id>
docker rm <id>

# Cleanup
docker system prune
```

**Save this slide!**

---

## SLIDE 32: Hands-On Exercise

**Try This Now:**

1. Pull the official Ubuntu image
   ```bash
   docker pull ubuntu:22.04
   ```

2. Run it interactively
   ```bash
   docker run -it ubuntu:22.04 bash
   ```

3. Inside container, try:
   ```bash
   ls
   cat /etc/os-release
   exit
   ```

**Time:** 5 minutes

---

## SLIDE 33: Key Takeaways

**Remember:**

1. 🐳 **Docker** packages apps with dependencies
2. 📦 **Containers** are lightweight, isolated environments
3. 🖼️ **Images** are blueprints, **Containers** are instances
4. 🌐 **Docker Hub** stores public images
5. ⚡ **Much faster** than Virtual Machines
6. ✅ **Same environment** everywhere

**One Sentence:** Docker solves "it works on my machine" by packaging everything together.

---

## SLIDE 34: What's Next?

**Today's Workshop:**
- ✅ Part 0: Introduction (Done!)
- 📝 Part 1: Containerize your first app
- 📝 Part 2: Update & rebuild
- 📝 Part 3: Share on Docker Hub
- 📝 Part 4: Volumes (data persistence)
- 📝 Part 5: Bind mounts (live editing)
- 📝 Part 6: Multi-container apps
- 📝 Part 7: Docker Compose
- 📝 Part 8: Best practices

**Let's get hands-on!**

---

## SLIDE 35: Q&A

**Questions?**

**Common Questions:**
- How is Docker different from a VM?
- Can I run Windows containers on Mac?
- Is Docker free?
- How do I deploy to production?
- What about security?

**Let's discuss!**

---

## SLIDE 36: Thank You!

**Contact & Resources:**
- 📁 Workshop materials: `/docker-basics/`
- 📖 Detailed guides in each folder
- 🎯 Hands-on exercises included
- 💬 Ask questions anytime!

**Next:** Open `/docker-basics/part-01-containerize/`

**Let's build something!** 🚀

---

## PRESENTATION NOTES

### Slide Design Tips:
1. Use Docker blue (#2496ED) as primary color
2. Include Docker whale logo on title slides
3. Use monospace font for code blocks
4. Add icons for visual interest
5. Keep text minimal, use diagrams

### Timing Guide:
- Slides 1-7: Introduction (5 min)
- Slides 8-10: Docker vs VMs (5 min)
- Slides 11-17: Core concepts (8 min)
- Slides 18-22: Commands & Demo (8 min)
- Slides 23-29: Use cases & best practices (3 min)
- Slides 30-36: Wrap-up & Q&A (1 min)

### Interactive Elements:
- Live demo at slide 18
- Hands-on exercise at slide 32
- Q&A at slide 35

### Visual Assets Needed:
- Docker logo
- Shipping container images
- Architecture diagrams
- Terminal screenshots
- Before/after comparisons

---

**END OF PRESENTATION**

**Total Slides:** 36
**Estimated Duration:** 30-40 minutes with demos
**Format:** Ready for PowerPoint conversion
