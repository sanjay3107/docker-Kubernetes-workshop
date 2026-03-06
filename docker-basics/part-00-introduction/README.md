# Part 0: Introduction to Docker - The Absolute Basics 🐳

> **Start Here!** This is your first step into the world of Docker. No prior knowledge needed!

---

## 🎯 What You'll Learn

- What Docker is and why it exists
- The problem Docker solves
- Docker vs Virtual Machines
- Core concepts: Images and Containers
- How to pull your first image from Docker Hub
- How to run your first container
- Basic Docker commands

**Time:** 30 minutes

---

## 🤔 What is Docker?

### Simple Definition
**Docker is a platform that lets you package your application with everything it needs to run, then run it anywhere.**

### Real-World Analogy: Shipping Containers 📦

Imagine you're shipping products around the world:

**Before shipping containers (1950s):**
- Every ship was different
- Loading/unloading took weeks
- Items got damaged
- Chaos at every port

**After shipping containers:**
- Standardized boxes (20ft, 40ft)
- Any container fits on any ship
- Load/unload in hours
- Items protected inside

**Docker does the same for software!**

**Before Docker:**
```
Developer: "It works on my laptop!" ✅
Teammate: "Doesn't work on mine..." ❌
Server: "Missing dependencies..." ❌
```

**With Docker:**
```
Developer: "It works in this container!" ✅
Teammate: "Same container works here!" ✅
Server: "Same container works here!" ✅
```

---

## 🔥 The Problem Docker Solves

### Scenario 1: "It Works on My Machine" 😫

**Without Docker:**
```
Your laptop:
├── Python 3.9
├── Node.js 18
├── PostgreSQL 14
└── Your app ✅ WORKS!

Your teammate's laptop:
├── Python 3.7 (different version!)
├── Node.js 16 (different version!)
├── No PostgreSQL installed
└── Your app ❌ BROKEN!
```

**With Docker:**
```
Your laptop:
└── Docker container
    ├── Python 3.9
    ├── Node.js 18
    ├── PostgreSQL 14
    └── Your app ✅ WORKS!

Your teammate's laptop:
└── Same Docker container
    ├── Python 3.9
    ├── Node.js 18
    ├── PostgreSQL 14
    └── Your app ✅ WORKS!
```

### Scenario 2: Setting Up New Developers

**Without Docker:**
```
Day 1: Install Python
Day 2: Install Node.js
Day 3: Install PostgreSQL
Day 4: Install Redis
Day 5: Fix version conflicts
Day 6: Still debugging setup...
```

**With Docker:**
```
Day 1: docker compose up
       ✅ Everything running!
       Start coding immediately!
```

### Scenario 3: Deploying to Production

**Without Docker:**
```
Development → Staging → Production
Each environment is different
Different OS versions
Different installed packages
Bugs appear only in production 😱
```

**With Docker:**
```
Development → Staging → Production
Same container everywhere
Identical environment
What works in dev works in prod ✅
```

---

## 🆚 Docker vs Virtual Machines

### Virtual Machine Architecture

```
┌─────────────────────────────────────────┐
│         Your Computer (Host)            │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │      Hypervisor (VMware/VBox)     │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌─────────────┐    ┌─────────────┐   │
│  │   VM 1      │    │   VM 2      │   │
│  │ ┌─────────┐ │    │ ┌─────────┐ │   │
│  │ │ Full OS │ │    │ │ Full OS │ │   │ ← Each VM has complete OS!
│  │ │ (2-4 GB)│ │    │ │ (2-4 GB)│ │   │
│  │ └─────────┘ │    │ └─────────┘ │   │
│  │   App 1     │    │   App 2     │   │
│  └─────────────┘    └─────────────┘   │
└─────────────────────────────────────────┘

Size: GBs per VM
Boot: Minutes
Resource: Heavy (RAM, CPU)
```

### Docker Container Architecture

```
┌─────────────────────────────────────────┐
│         Your Computer (Host OS)         │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │        Docker Engine              │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │Container │  │Container │  │Cont. │ │
│  │  App 1   │  │  App 2   │  │App 3 │ │ ← Shares host OS!
│  │ (50 MB)  │  │ (30 MB)  │  │(20MB)│ │
│  └──────────┘  └──────────┘  └──────┘ │
└─────────────────────────────────────────┘

Size: MBs per container
Boot: Seconds
Resource: Light (minimal overhead)
```

### Comparison Table

| Feature | Virtual Machine | Docker Container |
|---------|----------------|------------------|
| **Size** | 2-20 GB | 10-500 MB |
| **Boot Time** | 1-2 minutes | 1-2 seconds |
| **Performance** | Slower (overhead) | Near-native speed |
| **Isolation** | Complete (separate OS) | Process-level |
| **Resource Usage** | Heavy | Lightweight |
| **Portability** | Medium | High |
| **Use Case** | Run different OS | Run applications |

### When to Use What?

**Use Virtual Machines when:**
- ✅ You need to run a different operating system (Windows on Mac)
- ✅ You need complete isolation for security
- ✅ You're running legacy applications

**Use Docker when:**
- ✅ You want to package applications
- ✅ You need fast startup times
- ✅ You want to save resources
- ✅ You're doing microservices
- ✅ You want consistent environments

**Can you use both?** Yes! You can run Docker inside a VM.

---

## 🧱 Core Concepts

### 1. Image 🖼️

**What is it?**
- A template/blueprint for creating containers
- Contains your app + all dependencies
- Read-only (cannot be changed)
- Stored on your computer or Docker Hub

**Analogy:** Like a **recipe** or **class** in programming

**Example:**
```
python:3.9 image contains:
├── Linux OS (minimal)
├── Python 3.9 installed
└── pip package manager
```

### 2. Container 📦

**What is it?**
- A running instance of an image
- Isolated environment for your app
- Can read/write data while running
- Temporary (deleted when stopped, unless you save data)

**Analogy:** Like a **dish made from recipe** or **object/instance** in programming

**Example:**
```
From python:3.9 image, you can create:
├── Container 1 (running your web app)
├── Container 2 (running your API)
└── Container 3 (running tests)
```

### Relationship: Image → Container

```
┌─────────────────┐
│  Docker Image   │  ← Blueprint (stored)
│   "python:3.9"  │
└────────┬────────┘
         │
         ├──→ Container 1 (running)
         ├──→ Container 2 (running)
         └──→ Container 3 (stopped)
```

**Key Point:** 
- One image → Many containers
- Like one cookie cutter → Many cookies

---

## 🎓 Hands-On: Your First Docker Experience!

### Step 1: Verify Docker is Installed

```bash
docker --version
```

**Expected output:**
```
Docker version 24.0.x, build xxxxx
```

**If you see an error:**
- Make sure Docker Desktop is running
- Restart Docker Desktop
- Restart your terminal

---

### Step 2: Run Your First Container! 🎉

Let's run the official "Hello World" container:

```bash
docker run hello-world
```

**What happens:**

```
1. Docker looks for "hello-world" image locally
   → Not found!

2. Docker pulls it from Docker Hub
   → Downloading...

3. Docker creates a container from the image
   → Creating...

4. Docker runs the container
   → "Hello from Docker!"

5. Container exits (it's done)
   → Stopped
```

**You should see:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from Docker Hub.
 3. The Docker daemon created a new container from that image.
 4. The Docker daemon streamed that output to the Docker client.
```

**Congratulations! You just ran your first Docker container!** 🎉

---

### Step 3: Understanding What Just Happened

```bash
# List all images on your computer
docker images
```

**Output:**
```
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    9c7a54a9a43c   3 months ago   13.3kB
```

**This shows:**
- **REPOSITORY:** Image name (`hello-world`)
- **TAG:** Version (`latest` = newest)
- **IMAGE ID:** Unique identifier
- **SIZE:** Only 13.3 KB! Tiny!

```bash
# List all containers (including stopped ones)
docker ps -a
```

**Output:**
```
CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                     
abc123def456   hello-world   "/hello"   2 minutes ago   Exited (0) 2 minutes ago
```

**This shows:**
- Container was created
- It ran the `/hello` command
- It exited successfully (status 0 = success)

---

### Step 4: Pull an Image Without Running It

Let's pull a Python image from Docker Hub:

```bash
docker pull python:3.9-slim
```

**What happens:**
```
3.9-slim: Pulling from library/python
38513bd72563: Pull complete    ← Downloading layers
b3ec39b36ae8: Pull complete
fc744308490: Pull complete
ea56f685404a: Pull complete
Digest: sha256:abc123...
Status: Downloaded newer image for python:3.9-slim
```

**Check your images:**
```bash
docker images
```

**Output:**
```
REPOSITORY    TAG        IMAGE ID       SIZE
python        3.9-slim   abc123def456   125MB
hello-world   latest     9c7a54a9a43c   13.3kB
```

**Notice:** Python image is much larger (125 MB) because it includes the Python runtime!

---

### Step 5: Run an Interactive Container

Let's start a Python container and interact with it:

```bash
docker run -it python:3.9-slim
```

**Flags explained:**
- `-i` = Interactive (keep STDIN open)
- `-t` = TTY (allocate a terminal)

**You're now inside the container!** The prompt changes to `>>>` (Python shell)

**Try some Python:**
```python
>>> print("Hello from inside a Docker container!")
Hello from inside a Docker container!

>>> import sys
>>> sys.version
'3.9.x ...'

>>> exit()
```

**You're back on your computer!** The container has stopped.

---

### Step 6: Run a Web Server Container

Let's run an Nginx web server:

```bash
docker run -d -p 8080:80 --name my-nginx nginx:alpine
```

**Flags explained:**
- `-d` = Detached (run in background)
- `-p 8080:80` = Map port 8080 (your computer) to port 80 (container)
- `--name my-nginx` = Give it a friendly name
- `nginx:alpine` = Use the Alpine Linux version (smaller)

**Open your browser:** http://localhost:8080

**You should see:** "Welcome to nginx!" 🎉

**What just happened?**
- Docker pulled the nginx image
- Created a container named "my-nginx"
- Started an Nginx web server inside
- Mapped port 8080 on your computer to port 80 in the container
- You can access it in your browser!

---

### Step 7: Manage Your Containers

```bash
# See running containers
docker ps
```

**Output:**
```
CONTAINER ID   IMAGE          COMMAND                  PORTS
abc123def456   nginx:alpine   "nginx -g 'daemon of…"   0.0.0.0:8080->80/tcp
```

```bash
# See all containers (including stopped)
docker ps -a

# Stop the nginx container
docker stop my-nginx

# Start it again
docker start my-nginx

# View logs
docker logs my-nginx

# Remove the container (must be stopped first)
docker stop my-nginx
docker rm my-nginx
```

---

### Step 8: Clean Up

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything (containers, images, volumes, networks)
docker system prune -a
```

**Warning:** This deletes everything! Only use if you want to start fresh.

---

## 🎓 What You Just Learned

✅ What Docker is and why it exists  
✅ The "It works on my machine" problem  
✅ Docker vs Virtual Machines  
✅ Images vs Containers  
✅ How to pull images from Docker Hub  
✅ How to run containers  
✅ Interactive vs detached mode  
✅ Port mapping  
✅ Basic container management  

---

## 🧪 Practice Exercises

### Exercise 1: Run Ubuntu in a Container

```bash
docker run -it ubuntu:22.04 bash
```

Inside the container:
```bash
ls
pwd
cat /etc/os-release
exit
```

**Question:** What OS is running on your computer? What OS was in the container?

---

### Exercise 2: Run Multiple Nginx Servers

```bash
docker run -d -p 8081:80 --name nginx1 nginx:alpine
docker run -d -p 8082:80 --name nginx2 nginx:alpine
docker run -d -p 8083:80 --name nginx3 nginx:alpine
```

Open:
- http://localhost:8081
- http://localhost:8082
- http://localhost:8083

**All three work!** Same image, different containers, different ports.

**Cleanup:**
```bash
docker rm -f nginx1 nginx2 nginx3
```

---

### Exercise 3: Explore Docker Hub

1. Go to https://hub.docker.com
2. Search for "redis"
3. Look at the official Redis image
4. Pull and run it:

```bash
docker pull redis:7-alpine
docker run -d --name my-redis redis:7-alpine
docker logs my-redis
docker stop my-redis
docker rm my-redis
```

---

## 📊 Docker Hub - The Image Registry

### What is Docker Hub?

**Docker Hub** is like GitHub, but for Docker images instead of code.

- **Public registry** - Free to use
- **Official images** - Verified by Docker
- **Community images** - Created by users
- **Your images** - You can push your own!

### Popular Official Images

| Image | Downloads | Purpose |
|-------|-----------|---------|
| `nginx` | 1B+ | Web server |
| `python` | 1B+ | Python runtime |
| `node` | 1B+ | Node.js runtime |
| `redis` | 1B+ | In-memory database |
| `postgres` | 500M+ | SQL database |
| `mysql` | 500M+ | SQL database |
| `ubuntu` | 1B+ | Ubuntu OS |

### Image Tags

Images have tags to specify versions:

```bash
python:3.9          # Python 3.9 (full)
python:3.9-slim     # Python 3.9 (smaller)
python:3.9-alpine   # Python 3.9 (smallest)
python:latest       # Latest version (use with caution!)
```

**Best practice:** Always use specific version tags in production!

---

## 🎯 Key Takeaways

### Docker in One Sentence
**Docker packages your app with everything it needs, so it runs the same everywhere.**

### Core Concepts
1. **Image** = Blueprint (recipe, class)
2. **Container** = Running instance (dish, object)
3. **Docker Hub** = Image storage (like GitHub)

### Why Docker?
- ✅ Consistency across environments
- ✅ Fast setup for new developers
- ✅ Lightweight compared to VMs
- ✅ Easy to share and deploy
- ✅ Isolation between applications

### Basic Workflow
```
1. Pull image from Docker Hub
   docker pull python:3.9

2. Run container from image
   docker run -it python:3.9

3. Stop container
   docker stop <container-id>

4. Remove container
   docker rm <container-id>
```

---

## ✅ Checkpoint

Before moving to Part 1, make sure you understand:

- [ ] What Docker is and why we use it
- [ ] Difference between images and containers
- [ ] Docker vs Virtual Machines
- [ ] How to pull images from Docker Hub
- [ ] How to run containers
- [ ] How to stop and remove containers

---

## 🚀 What's Next?

Now that you understand the basics, you're ready to:

**Part 1: Containerize Your First Application**
- Write a Dockerfile
- Build your own image
- Run your own app in a container

```bash
cd ../part-01-containerize
```

---

## 🎯 Quick Reference

```bash
# Check Docker version
docker --version

# Pull an image
docker pull <image-name>

# Run a container
docker run <image-name>
docker run -d <image-name>           # Detached (background)
docker run -it <image-name>          # Interactive
docker run -p 8080:80 <image-name>   # Port mapping

# List images
docker images

# List containers
docker ps              # Running only
docker ps -a           # All containers

# Stop/Start containers
docker stop <container-id>
docker start <container-id>

# Remove containers/images
docker rm <container-id>
docker rmi <image-name>

# View logs
docker logs <container-id>

# Clean up
docker system prune
```

---

**Congratulations!** You now understand Docker fundamentals! 🎉

Ready to build your own containers? Let's go to Part 1! 🚀
