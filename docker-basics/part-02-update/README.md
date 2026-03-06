# Part 2: Update and Rebuild Your Application 🔄

> **Goal:** Learn how to update your app and rebuild efficiently using Docker's layer caching!

---

## 🎯 What You'll Learn

- How to modify your application
- How Docker's layer caching speeds up rebuilds
- How to tag images with versions
- How to manage multiple versions of your app

---

## 📝 Step-by-Step Instructions

### Step 1: Compare with Part 1

This folder has the **same structure** as Part 1, but with updates:
- Different gradient color (pink instead of purple)
- Shows current time
- Version badge showing "UPDATED VERSION"
- Health endpoint returns version 2.0

**This simulates a real-world scenario:** You've made changes and need to deploy the new version!

---

### Step 2: Build Version 1 (Baseline)

First, let's build the old version from Part 1:

```bash
cd ../part-01-containerize
docker build -t my-app:v1 .
```

**Note the tag:** `my-app:v1` (version 1)

Run it:
```bash
docker run -d -p 5000:5000 --name app-v1 my-app:v1
```

Open http://localhost:5000 - see the purple gradient, no timestamp.

Stop it:
```bash
docker stop app-v1 && docker rm app-v1
```

---

### Step 3: Build Version 2 (Updated)

Now build the updated version:

```bash
cd ../part-02-update
docker build -t my-app:v2 .
```

**Watch the output carefully!** You'll see:
```
[1/5] FROM python:3.9-slim
[2/5] WORKDIR /app
[3/5] COPY requirements.txt .
[4/5] RUN pip install ...        ← CACHED! (requirements didn't change)
[5/5] COPY app.py .               ← NEW! (app.py changed)
```

**Notice:** Steps 1-4 used **CACHED** layers! Only step 5 was rebuilt.

**This is why we copy requirements.txt separately!**
- If we copied everything at once, changing `app.py` would reinstall all dependencies
- By separating them, we only rebuild what changed
- **Much faster!** ⚡

---

### Step 4: Run Version 2

```bash
docker run -d -p 5000:5000 --name app-v2 my-app:v2
```

Open http://localhost:5000 - see the pink gradient and timestamp! 🎉

---

### Step 5: Compare Both Versions

Let's run both versions side-by-side:

```bash
# Stop v2 first
docker stop app-v2 && docker rm app-v2

# Run v1 on port 5000
docker run -d -p 5000:5000 --name app-v1 my-app:v1

# Run v2 on port 5001
docker run -d -p 5001:5000 --name app-v2 my-app:v2
```

Now open:
- http://localhost:5000 - Version 1 (purple)
- http://localhost:5001 - Version 2 (pink with timestamp)

**This is how you can test new versions before replacing the old one!**

Cleanup:
```bash
docker rm -f app-v1 app-v2
```

---

### Step 6: Understanding Image Tags

List your images:
```bash
docker images my-app
```

You'll see:
```
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
my-app       v2        def456abc789   2 minutes ago    125MB
my-app       v1        abc123def456   10 minutes ago   125MB
```

**Tags are like Git branches** - different versions of the same app!

**Common tagging strategies:**
```bash
my-app:v1.0.0          # Semantic versioning
my-app:latest          # Latest stable version
my-app:dev             # Development version
my-app:prod            # Production version
my-app:2024-03-06      # Date-based
```

---

### Step 7: The "latest" Tag

By default, if you don't specify a tag, Docker uses `latest`:

```bash
docker build -t my-app .        # Same as my-app:latest
docker run my-app               # Runs my-app:latest
```

**Best practice:** Always use explicit tags in production!

```bash
# ❌ Bad (which version is this?)
docker run my-app

# ✅ Good (explicit version)
docker run my-app:v2
```

---

### Step 8: Experiment with Layer Caching

Let's see caching in action!

**Scenario 1: Change only app.py**
```bash
# Edit app.py - change "v2.0" to "v2.1"
# Rebuild
docker build -t my-app:v2.1 .
```
**Result:** Fast! Only the COPY app.py layer rebuilds.

**Scenario 2: Add a new dependency**
```bash
# Edit requirements.txt - add a new line: requests==2.31.0
# Rebuild
docker build -t my-app:v2.2 .
```
**Result:** Slower! The RUN pip install layer and everything after it rebuilds.

**This is why order matters in Dockerfiles!**
- Put things that change rarely at the top (base image, system packages)
- Put things that change often at the bottom (your code)

---

## 🧪 Experiments to Try

### Experiment 1: Break the Cache

Edit the Dockerfile and add a comment at the top:
```dockerfile
# This is my app
FROM python:3.9-slim
...
```

Rebuild:
```bash
docker build -t my-app:test .
```

**Result:** All layers rebuild! Even a comment change breaks the cache for that layer and all subsequent layers.

---

### Experiment 2: Multi-Stage Build Optimization

Create a new Dockerfile:
```dockerfile
# Stage 1: Build dependencies
FROM python:3.9-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.9-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY app.py .
EXPOSE 5000
CMD ["python", "app.py"]
```

**Benefits:**
- Smaller final image (no pip, no build tools)
- More secure (fewer packages = smaller attack surface)

---

### Experiment 3: Version Rollback

```bash
# Deploy v2
docker run -d -p 5000:5000 --name app my-app:v2

# Oh no! Bug found! Rollback to v1
docker stop app && docker rm app
docker run -d -p 5000:5000 --name app my-app:v1
```

**Instant rollback!** This is one of Docker's superpowers. 🦸

---

## 🎓 What You Learned

✅ How to update and rebuild applications  
✅ How Docker's layer caching works  
✅ Why we copy dependencies separately  
✅ How to tag images with versions  
✅ How to run multiple versions side-by-side  
✅ How to rollback to previous versions  
✅ Best practices for Dockerfile layer ordering  

---

## 💡 Key Takeaways

### Layer Caching Rules
1. **Layers are cached** if nothing changed
2. **Once a layer changes**, all subsequent layers rebuild
3. **Order matters** - put stable things first, changing things last

### Optimal Dockerfile Order
```dockerfile
FROM ...              # 1. Base image (rarely changes)
RUN apt-get ...       # 2. System packages (rarely changes)
COPY requirements.txt # 3. Dependencies file (changes sometimes)
RUN pip install ...   # 4. Install dependencies (changes sometimes)
COPY app.py          # 5. Your code (changes often)
CMD ...              # 6. Start command (rarely changes)
```

---

## ✅ Checkpoint

Before moving to Part 3, make sure you understand:

- [ ] How layer caching speeds up builds
- [ ] Why we copy requirements.txt separately
- [ ] How to tag images with versions
- [ ] How to run multiple versions simultaneously
- [ ] How to rollback to a previous version

---

## 🚀 What's Next?

**Part 3: Share Your Application** - Learn how to push your image to Docker Hub so others can use it!

```bash
cd ../part-03-share
```

---

## 🎯 Quick Reference

```bash
# Build with version tag
docker build -t my-app:v1 .

# Build with multiple tags
docker build -t my-app:v1 -t my-app:latest .

# List images
docker images my-app

# Run specific version
docker run -p 5000:5000 my-app:v1

# Remove specific version
docker rmi my-app:v1

# Remove all versions
docker rmi my-app:v1 my-app:v2
```

Great work! You now understand Docker's build optimization! 🎉
