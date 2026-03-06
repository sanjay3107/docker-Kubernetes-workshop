# Part 5: Bind Mounts - Live Code Editing 🔄

> **Goal:** Learn how to edit code on your computer and see changes instantly in the container!

---

## 🎯 What You'll Learn

- What bind mounts are
- Difference between volumes and bind mounts
- How to mount your code for live development
- Hot reloading with Flask
- When to use bind mounts vs volumes

---

## 🤔 Volumes vs Bind Mounts

### Named Volume (Part 4)
```
Docker manages storage location
Your computer: ???
Container:     /app/data
```
- ✅ Docker manages where data is stored
- ✅ Works same on all operating systems
- ❌ Hard to access files directly

### Bind Mount (This part)
```
You choose the exact folder
Your computer: /home/user/myapp
Container:     /app
```
- ✅ Direct access to files
- ✅ Edit with your favorite editor
- ✅ Perfect for development
- ❌ Path must exist on your computer

---

## 📝 Step-by-Step Instructions

### Step 1: Build the Image

```bash
docker build -t bindmount-app .
```

**Notice:** The Dockerfile doesn't copy `app.py`! We'll mount it instead.

---

### Step 2: Run WITHOUT Bind Mount (Fails!)

```bash
docker run -p 5000:5000 bindmount-app
```

**Error:**
```
python: can't open file '/app/app.py': [Errno 2] No such file or directory
```

**Why?** We didn't copy `app.py` into the image, and we haven't mounted it!

---

### Step 3: Run WITH Bind Mount (Works!)

**On Windows (PowerShell):**
```powershell
docker run -d -p 5000:5000 --name dev-app `
  -v ${PWD}:/app `
  bindmount-app
```

**On Mac/Linux:**
```bash
docker run -d -p 5000:5000 --name dev-app \
  -v $(pwd):/app \
  bindmount-app
```

**Let's break this down:**
```
-v ${PWD}:/app
   ↑      ↑
   │      └─ Path inside container
   └──────── Current directory on your computer
```

Open http://localhost:5000 - it works! 🎉

---

### Step 4: Live Editing Magic! ✨

Keep the container running and edit `app.py`:

**Change this line:**
```python
<h1>🔄 Live Reload Demo</h1>
```

**To:**
```python
<h1>🚀 I EDITED THIS LIVE!</h1>
```

**Save the file and refresh your browser** - changes appear instantly! 🎉

**Why?** Flask's debug mode detects file changes and auto-reloads!

---

### Step 5: How It Works

```
Your Computer                Container
─────────────               ─────────
/part-05-bind-mounts/  ←→   /app/
├── app.py                  ├── app.py (same file!)
├── requirements.txt        ├── requirements.txt
└── Dockerfile              └── ...
```

**The files are the SAME!** When you edit on your computer, the container sees the changes immediately.

---

### Step 6: View Container Logs

Watch the auto-reload in action:

```bash
docker logs -f dev-app
```

When you save `app.py`, you'll see:
```
 * Detected change in '/app/app.py', reloading
 * Restarting with stat
```

Press `Ctrl+C` to stop following logs.

---

### Step 7: Bind Mount with Read-Only

Sometimes you want to prevent the container from modifying files:

```bash
docker rm -f dev-app

# Mount as read-only
docker run -d -p 5000:5000 --name dev-app \
  -v $(pwd):/app:ro \
  bindmount-app
#              ↑
#              ro = read-only
```

Now the container can read files but not write to them.

---

### Step 8: Multiple Bind Mounts

You can mount multiple directories:

```bash
docker run -d -p 5000:5000 --name dev-app \
  -v $(pwd)/app.py:/app/app.py \
  -v $(pwd)/static:/app/static \
  -v $(pwd)/templates:/app/templates \
  bindmount-app
```

**Use case:** Mount only specific files/folders you want to edit.

---

### Step 9: Bind Mount Absolute Paths

You can use absolute paths instead of relative:

**Windows:**
```powershell
docker run -d -p 5000:5000 --name dev-app `
  -v C:\Users\YourName\myapp:/app `
  bindmount-app
```

**Mac/Linux:**
```bash
docker run -d -p 5000:5000 --name dev-app \
  -v /home/username/myapp:/app \
  bindmount-app
```

---

## 🧪 Experiments to Try

### Experiment 1: Create a File from Container

```bash
# Execute into container
docker exec -it dev-app sh

# Create a file
echo "Hello from container" > /app/test.txt
exit

# Check your computer
cat test.txt  # File appears on your computer!
```

**It works both ways!** Changes in container appear on your computer too.

---

### Experiment 2: Break the App

Edit `app.py` and introduce a syntax error:

```python
def home()  # Missing colon!
    return "Hello"
```

Save and check logs:
```bash
docker logs dev-app
```

You'll see the error! Fix it and the app auto-recovers.

---

### Experiment 3: Mount node_modules Separately

Common pattern in Node.js development:

```bash
docker run -d -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  my-node-app
#    ↑
#    Anonymous volume - prevents overwriting node_modules
```

---

## 📊 When to Use What?

| Scenario | Use | Example |
|----------|-----|---------|
| **Development** | Bind Mount | `-v $(pwd):/app` |
| **Database data** | Named Volume | `-v pgdata:/var/lib/postgresql/data` |
| **User uploads** | Named Volume | `-v uploads:/app/uploads` |
| **Logs** | Named Volume | `-v logs:/var/log` |
| **Config files** | Bind Mount | `-v ./config.yml:/app/config.yml:ro` |
| **Temporary data** | Container filesystem | (no mount) |

---

## 🎓 What You Learned

✅ What bind mounts are  
✅ Difference between volumes and bind mounts  
✅ How to mount local code for development  
✅ Live code reloading with Flask  
✅ Read-only mounts  
✅ Multiple bind mounts  
✅ When to use bind mounts vs volumes  

---

## 💡 Best Practices

### Development Workflow

```bash
# ✅ Good - bind mount for development
docker run -v $(pwd):/app myapp

# ❌ Bad - rebuilding image for every change
# Edit code → docker build → docker run → repeat
```

### Production Deployment

```bash
# ✅ Good - code baked into image
docker build -t myapp:v1 .
docker run myapp:v1

# ❌ Bad - bind mounts in production
docker run -v /prod/code:/app myapp  # Don't do this!
```

### Security

```bash
# ✅ Good - read-only when possible
docker run -v $(pwd):/app:ro myapp

# ❌ Bad - mounting sensitive directories
docker run -v /:/host myapp  # Gives container access to everything!
```

---

## 🆘 Common Issues

### "No such file or directory"
**Problem:** Path doesn't exist on your computer

**Solution:**
```bash
# Check current directory
pwd

# Use absolute path
docker run -v /full/path/to/folder:/app myapp
```

---

### Changes not appearing
**Problem:** Wrong directory mounted or caching

**Solution:**
```bash
# Verify mount
docker inspect dev-app | grep Mounts -A 10

# Restart container
docker restart dev-app
```

---

### Permission denied
**Problem:** File permissions mismatch

**Solution:**
```bash
# On Linux - fix permissions
sudo chown -R $USER:$USER .

# Or run container as your user
docker run --user $(id -u):$(id -g) -v $(pwd):/app myapp
```

---

### "Invalid mount config"
**Problem:** Windows path format

**Solution:**
```powershell
# Use ${PWD} in PowerShell
docker run -v ${PWD}:/app myapp

# Or use forward slashes
docker run -v C:/Users/Name/app:/app myapp
```

---

## ✅ Checkpoint

Before moving to Part 6, make sure you can:

- [ ] Explain the difference between volumes and bind mounts
- [ ] Mount your local code to a container
- [ ] Edit code and see changes instantly
- [ ] Use read-only mounts
- [ ] Know when to use bind mounts vs volumes

---

## 🚀 What's Next?

**Part 6: Multi-Container Applications** - Learn how to run an app with a database!

```bash
cd ../part-06-multi-container
```

---

## 🎯 Quick Reference

```bash
# Bind mount current directory
docker run -v $(pwd):/app myapp

# Bind mount with absolute path
docker run -v /path/on/host:/app myapp

# Read-only bind mount
docker run -v $(pwd):/app:ro myapp

# Multiple bind mounts
docker run \
  -v $(pwd)/app.py:/app/app.py \
  -v $(pwd)/static:/app/static \
  myapp

# Windows PowerShell
docker run -v ${PWD}:/app myapp
```

Perfect! You can now develop with live reloading! 🔄🎉
