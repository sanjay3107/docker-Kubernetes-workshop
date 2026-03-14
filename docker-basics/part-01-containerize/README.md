# Part 1: Containerize Your First Application 🐳

> **Goal:** Build and run your first Docker container!

---

## 📁 What's in This Folder?

```
part-01-containerize/
├── app.py              ← Simple Python web app
├── requirements.txt    ← Python dependencies
├── Dockerfile          ← Instructions to build the image
└── README.md           ← You are here!
```

---

## 🎯 What You'll Learn

- How to write a Dockerfile
- How to build a Docker image
- How to run a container
- How to access your app in a browser
- How to stop and remove containers

---

## 🧰 Prerequisite: Install Docker Desktop (Windows / Mac)

You need Docker running locally before you can build and run containers.

### Windows (Docker Desktop)

1. Download Docker Desktop:
   - https://www.docker.com/products/docker-desktop/
2. Install it and restart your computer if prompted.
3. Open **Docker Desktop** and wait until it shows **Docker Engine is running**.
4. Verify in a terminal:
   ```bash
   docker --version
   docker info
   ```

### macOS (Docker Desktop)

1. Download Docker Desktop:
   - https://www.docker.com/products/docker-desktop/
2. Install and open **Docker Desktop**.
3. Verify in a terminal:
   ```bash
   docker --version
   docker info
   ```

---

## 👋 Quick Start: Run the Official “Welcome to Docker” / hello-world Image

Before we containerize our own app, let's make sure Docker works end-to-end.

### Step 0.1: Run hello-world (fast verification)

```bash
docker run hello-world
```

You should see a message like “Hello from Docker!” confirming Docker can:
- pull an image from Docker Hub
- create a container
- run it successfully

### Step 0.2: Run the Welcome to Docker demo (optional)

If you want a more visual welcome demo:

```bash
docker run -d -p 8088:80 --name welcome docker/welcome-to-docker
```

Then open:
- http://localhost:8088

### Step 0.3: Verify and clean up

```bash
docker ps
docker logs welcome
docker stop welcome
docker rm welcome
```

---

## 📝 Step-by-Step Instructions

### Step 1: Understand the Application

Open `app.py` - it's a simple Flask web app that:
- Shows a welcome page at `http://localhost:5000`
- Has a health check at `http://localhost:5000/health`
- Displays the container ID (proves it's running in Docker!)

**Try running it WITHOUT Docker first (optional):**
```bash
pip install flask
python app.py
# Open http://localhost:5000
# Press Ctrl+C to stop
```

---

### Step 2: Understand the Dockerfile

Open `Dockerfile` and read each line. Here's what it does:

```dockerfile
FROM python:3.9-slim
# ↑ Start with Python 3.9 already installed
# "slim" = smaller image size

WORKDIR /app
# ↑ Create /app folder and work there
# Like doing: mkdir /app && cd /app

COPY requirements.txt .
# ↑ Copy requirements.txt from your computer to /app in container

RUN pip install --no-cache-dir -r requirements.txt
# ↑ Install Flask inside the container
# Runs DURING build (not when container starts)

COPY app.py .
# ↑ Copy your Python code to /app

EXPOSE 5000
# ↑ Document that app uses port 5000
# (Doesn't actually open the port - just documentation)

CMD ["python", "app.py"]
# ↑ Command to run when container starts
# Like typing: python app.py
```

**Why copy requirements.txt separately?**
- Docker caches each layer
- If only `app.py` changes, Docker reuses the cached `pip install` layer
- Faster rebuilds! 🚀

---

### Step 3: Build the Docker Image

```bash
docker build -t my-first-app .
```

**Let's break this down:**
- `docker build` = Build an image
- `-t my-first-app` = Tag (name) it "my-first-app"
- `.` = Use Dockerfile in current directory

**What happens:**
```
[+] Building 15.2s (10/10) FINISHED
 => [1/5] FROM python:3.9-slim          # Download base image
 => [2/5] WORKDIR /app                  # Create working directory
 => [3/5] COPY requirements.txt .       # Copy requirements
 => [4/5] RUN pip install ...           # Install dependencies
 => [5/5] COPY app.py .                 # Copy code
 => exporting to image                  # Save the image
```

**Verify the image was created:**
```bash
docker images
```

You should see:
```
REPOSITORY      TAG       IMAGE ID       CREATED         SIZE
my-first-app    latest    abc123def456   2 minutes ago   125MB
```

---

### Step 4: Run the Container

```bash
docker run -p 5000:5000 my-first-app
```

**Let's break this down:**
- `docker run` = Start a container
- `-p 5000:5000` = Map port 5000 on your computer to port 5000 in container
  - Format: `-p HOST_PORT:CONTAINER_PORT`
- `my-first-app` = Use this image

**You should see:**
```
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
```

---

### Step 5: Access Your App

Open your browser and go to:
- **http://localhost:5000** - See the welcome page! 🎉
- **http://localhost:5000/health** - See the health check

**Notice:** The page shows a Container ID - that's proof it's running in Docker!

---

### Step 6: View Running Containers

Open a **new terminal** (keep the app running) and type:

```bash
docker ps
```

You'll see:
```
CONTAINER ID   IMAGE          COMMAND           PORTS                    NAMES
abc123def456   my-first-app   "python app.py"   0.0.0.0:5000->5000/tcp   amazing_tesla
```

**What this shows:**
- **CONTAINER ID** - Unique ID (first 12 chars)
- **IMAGE** - Which image it's running from
- **COMMAND** - What command is running
- **PORTS** - Port mapping
- **NAMES** - Random name Docker assigned (you can customize this)

---

### Step 7: Stop the Container

Go back to the terminal where the app is running and press:
```
Ctrl + C
```

**Or** stop it by name/ID:
```bash
docker stop amazing_tesla
# or
docker stop abc123def456
```

---

### Step 8: Run in Detached Mode (Background)

Instead of blocking your terminal, run in background:

```bash
docker run -d -p 5000:5000 --name my-app my-first-app
```

**New flags:**
- `-d` = Detached mode (runs in background)
- `--name my-app` = Give it a custom name

**View logs:**
```bash
docker logs my-app
```

**Follow logs live:**
```bash
docker logs -f my-app
# Press Ctrl+C to stop following (container keeps running)
```

---

### Step 9: Execute Commands Inside Container

Want to peek inside the running container?

```bash
docker exec -it my-app sh
```

**You're now inside the container!** Try:
```bash
ls                    # List files
pwd                   # Current directory (/app)
cat app.py            # View your code
python --version      # Check Python version
exit                  # Leave the container
```

---

### Step 10: Stop and Remove Container

```bash
# Stop the container
docker stop my-app

# Remove the container
docker rm my-app
```

**Or do both at once:**
```bash
docker rm -f my-app
```

---

## 🎓 What You Learned

✅ How to write a Dockerfile  
✅ How to build an image (`docker build`)  
✅ How to run a container (`docker run`)  
✅ Port mapping (`-p`)  
✅ Detached mode (`-d`)  
✅ Naming containers (`--name`)  
✅ Viewing logs (`docker logs`)  
✅ Executing commands inside containers (`docker exec`)  
✅ Stopping and removing containers  

---

## 🧪 Experiments to Try

### Experiment 1: Run Multiple Containers

```bash
# Run on port 5000
docker run -d -p 5000:5000 --name app1 my-first-app

# Run on port 5001 (different host port!)
docker run -d -p 5001:5000 --name app2 my-first-app

# Run on port 5002
docker run -d -p 5002:5000 --name app3 my-first-app
```

Now open:
- http://localhost:5000
- http://localhost:5001
- http://localhost:5002

**Notice:** Each shows a different Container ID! They're isolated.

**Cleanup:**
```bash
docker rm -f app1 app2 app3
```

---

### Experiment 2: Rebuild After Code Change

1. Edit `app.py` - change "Hello from Docker!" to "Hello from MY Docker!"
2. Rebuild:
   ```bash
   docker build -t my-first-app .
   ```
3. Notice it's **much faster** - Docker reused cached layers!
4. Run the new version:
   ```bash
   docker run -p 5000:5000 my-first-app
   ```
5. Refresh browser - see your changes!

---

### Experiment 3: What Happens Without Port Mapping?

```bash
docker run -d --name no-ports my-first-app
```

Try to access http://localhost:5000 - **it won't work!**

The container is running, but you can't reach it because no ports are mapped.

```bash
docker rm -f no-ports
```

---

## 🐛 Common Issues

### "Port already in use"
**Problem:** Another container (or app) is using port 5000

**Solution:**
```bash
# Find what's using the port
docker ps

# Stop that container
docker stop <container-name>

# Or use a different port
docker run -p 5001:5000 my-first-app
```

---

### "Cannot connect to Docker daemon"
**Problem:** Docker Desktop isn't running

**Solution:** Start Docker Desktop application

---

### "docker: command not found"
**Problem:** Docker isn't installed or not in PATH

**Solution:** Install Docker Desktop and restart terminal

---

## 📊 Docker Desktop View

Open Docker Desktop and click **"Containers"**:
- See your running containers
- View logs visually
- Click port numbers to open in browser
- Stop/start containers with buttons

Much easier than remembering commands! 🎉

---

## ✅ Checkpoint

Before moving to Part 2, make sure you can:

- [ ] Build an image from a Dockerfile
- [ ] Run a container from an image
- [ ] Access the app in your browser
- [ ] View running containers with `docker ps`
- [ ] Stop and remove containers
- [ ] Understand port mapping

---

## 🚀 What's Next?

**Part 2: Update the Application** - Learn how to modify and rebuild your app efficiently!

```bash
cd ../part-02-update
```

---

## 🎯 Quick Reference

```bash
# Build image
docker build -t my-first-app .

# Run container (foreground)
docker run -p 5000:5000 my-first-app

# Run container (background)
docker run -d -p 5000:5000 --name my-app my-first-app

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs
docker logs my-app
docker logs -f my-app    # Follow live

# Execute command in container
docker exec -it my-app sh

# Stop container
docker stop my-app

# Remove container
docker rm my-app

# Stop and remove
docker rm -f my-app
```

Great job! 🎉 You've containerized your first application!
