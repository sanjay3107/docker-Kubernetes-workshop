# Part 3: Share Your Application on Docker Hub 🌐

> **Goal:** Learn how to share your Docker images so anyone can use them!

---

## 🎯 What You'll Learn

- What Docker Hub is and why it's useful
- How to create a Docker Hub account
- How to tag images for Docker Hub
- How to push images to Docker Hub
- How to pull images from Docker Hub
- Public vs private repositories

---

## 🌐 What is Docker Hub?

**Docker Hub** is like GitHub, but for Docker images instead of code.

- **Public registry** - Anyone can pull public images
- **Free tier** - 1 private repository, unlimited public repositories
- **Official images** - Verified images like `python`, `nginx`, `postgres`

**Popular images on Docker Hub:**
- `python:3.9` - 100M+ pulls
- `nginx` - 1B+ pulls
- `redis` - 1B+ pulls

---

## 📝 Step-by-Step Instructions

### Step 1: Create Docker Hub Account

1. Go to https://hub.docker.com
2. Click "Sign Up"
3. Choose a username (you'll need this!)
4. Verify your email

**Example:** If your username is `john`, your images will be at `john/image-name`

---

### Step 2: Login from Command Line

```bash
docker login
```

Enter your Docker Hub username and password.

**You should see:**
```
Login Succeeded
```

**Troubleshooting:**
- If you have 2FA enabled, use an access token instead of password
- Create token at: https://hub.docker.com/settings/security

---

### Step 3: Tag Your Image for Docker Hub

Images must be tagged with your username to push to Docker Hub.

**Format:** `username/repository:tag`

```bash
# Build the image from part-02
cd ../part-02-update

# Tag it with your username (replace 'YOUR_USERNAME')
docker build -t YOUR_USERNAME/my-first-app:v1 .

# Or tag an existing image
docker tag my-app:v2 YOUR_USERNAME/my-first-app:v1
```

**Example:**
```bash
# If your username is 'john'
docker build -t john/my-first-app:v1 .
```

---

### Step 4: Push to Docker Hub

```bash
docker push YOUR_USERNAME/my-first-app:v1
```

**What happens:**
```
The push refers to repository [docker.io/YOUR_USERNAME/my-first-app]
abc123: Pushed
def456: Pushed
...
v1: digest: sha256:abc123... size: 1234
```

**This uploads your image to Docker Hub!** 🚀

---

### Step 5: View on Docker Hub

1. Go to https://hub.docker.com
2. Click on your profile
3. You'll see your repository: `YOUR_USERNAME/my-first-app`
4. Click on it to see details

**You can now share this URL with anyone!**

---

### Step 6: Pull Your Image on Another Computer

Simulate pulling on a different machine by removing local image:

```bash
# Remove local image
docker rmi YOUR_USERNAME/my-first-app:v1

# Pull from Docker Hub
docker pull YOUR_USERNAME/my-first-app:v1

# Run it
docker run -p 5000:5000 YOUR_USERNAME/my-first-app:v1
```

**Anyone in the world can now run your app with one command!** 🌍

---

### Step 7: Push Multiple Tags

You can push multiple versions:

```bash
# Tag as v1
docker tag my-app:v2 YOUR_USERNAME/my-first-app:v1

# Also tag as latest
docker tag my-app:v2 YOUR_USERNAME/my-first-app:latest

# Push both
docker push YOUR_USERNAME/my-first-app:v1
docker push YOUR_USERNAME/my-first-app:latest
```

**Best practice:** Always push both a version tag and `latest`

---

## 🔒 Public vs Private Repositories

### Public Repository (Free)
- ✅ Anyone can pull
- ✅ Unlimited public repos
- ✅ Great for open source
- ❌ Everyone can see your code

### Private Repository (Free tier: 1 repo)
- ✅ Only you can pull (or invited users)
- ✅ Keep code secret
- ❌ Limited to 1 free private repo

**To make a repo private:**
1. Go to Docker Hub
2. Click on your repository
3. Settings → Make Private

---

## 🧪 Experiments to Try

### Experiment 1: Pull Official Images

Try pulling some popular images:

```bash
# Python
docker pull python:3.9-slim

# Nginx web server
docker pull nginx:alpine

# Redis database
docker pull redis:7-alpine

# Node.js
docker pull node:20-alpine
```

**Notice:** No username prefix - these are official images!

---

### Experiment 2: Search Docker Hub

```bash
# Search for images
docker search python

# Search for specific tags
docker search nginx
```

Or search on https://hub.docker.com

---

### Experiment 3: Inspect Remote Images

```bash
# View image details without pulling
docker manifest inspect python:3.9-slim
```

Shows layers, size, architecture, etc.

---

## 📋 Complete Workflow Example

Here's the full workflow from build to share:

```bash
# 1. Build your app
docker build -t my-app:v1 .

# 2. Test locally
docker run -p 5000:5000 my-app:v1

# 3. Tag for Docker Hub
docker tag my-app:v1 YOUR_USERNAME/my-app:v1
docker tag my-app:v1 YOUR_USERNAME/my-app:latest

# 4. Login to Docker Hub
docker login

# 5. Push to Docker Hub
docker push YOUR_USERNAME/my-app:v1
docker push YOUR_USERNAME/my-app:latest

# 6. Share with team
echo "Run this: docker run -p 5000:5000 YOUR_USERNAME/my-app:v1"
```

---

## 🎓 What You Learned

✅ What Docker Hub is  
✅ How to create and login to Docker Hub  
✅ How to tag images for Docker Hub  
✅ How to push images to Docker Hub  
✅ How to pull images from Docker Hub  
✅ Public vs private repositories  
✅ How to share your applications globally  

---

## 💡 Best Practices

### Tagging Strategy
```bash
# ✅ Good - semantic versioning
docker push myapp:1.0.0
docker push myapp:1.0
docker push myapp:1
docker push myapp:latest

# ❌ Bad - only latest
docker push myapp:latest  # Which version is this?
```

### Security
- ✅ Use private repos for proprietary code
- ✅ Scan images for vulnerabilities
- ✅ Don't include secrets in images
- ✅ Use specific version tags in production

### Documentation
- ✅ Add a README on Docker Hub
- ✅ Document environment variables
- ✅ Provide usage examples
- ✅ List exposed ports

---

## 🆘 Common Issues

### "denied: requested access to the resource is denied"
**Problem:** Not logged in or wrong username

**Solution:**
```bash
docker login
# Make sure image is tagged with YOUR username
docker tag myapp YOUR_USERNAME/myapp:v1
```

---

### "unauthorized: authentication required"
**Problem:** Login expired

**Solution:**
```bash
docker logout
docker login
```

---

### "name unknown: repository not found"
**Problem:** Typo in username or repo name

**Solution:** Double-check the tag matches your Docker Hub username exactly

---

## ✅ Checkpoint

Before moving to Part 4, make sure you can:

- [ ] Create a Docker Hub account
- [ ] Login from command line
- [ ] Tag images with your username
- [ ] Push images to Docker Hub
- [ ] Pull images from Docker Hub
- [ ] View your repositories on Docker Hub

---

## 🚀 What's Next?

**Part 4: Persist Data with Volumes** - Learn how to save data permanently, even when containers are deleted!

```bash
cd ../part-04-volumes
```

---

## 🎯 Quick Reference

```bash
# Login
docker login

# Tag for Docker Hub
docker tag local-image:tag USERNAME/repo:tag

# Push to Docker Hub
docker push USERNAME/repo:tag

# Pull from Docker Hub
docker pull USERNAME/repo:tag

# Search Docker Hub
docker search keyword

# Logout
docker logout
```

**Your app is now globally accessible!** 🌍🎉
