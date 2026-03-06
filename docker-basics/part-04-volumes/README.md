# Part 4: Persist Data with Volumes 💾

> **Goal:** Learn how to save data permanently so it survives container restarts and deletions!

---

## 🎯 What You'll Learn

- Why containers lose data by default
- What Docker volumes are
- How to create and use volumes
- How to inspect volumes
- How to backup and restore data
- Named volumes vs anonymous volumes

---

## 🤔 The Problem: Data Loss

**Without volumes:**
```bash
docker run myapp              # Create data
docker stop myapp             # Stop container
docker rm myapp               # Delete container
docker run myapp              # Data is GONE! 😱
```

**With volumes:**
```bash
docker run -v data:/app/data myapp    # Create data in volume
docker stop myapp                      # Stop container
docker rm myapp                        # Delete container
docker run -v data:/app/data myapp    # Data is STILL THERE! 🎉
```

---

## 📝 Step-by-Step Instructions

### Step 1: Understand the Application

This app counts visits and saves them to `/app/data/visits.json`.

**Without a volume:** Data is lost when container stops.  
**With a volume:** Data persists forever!

---

### Step 2: Run WITHOUT a Volume (Data Loss Demo)

```bash
docker build -t volume-app .

# Run without volume
docker run -d -p 5000:5000 --name app1 volume-app
```

Open http://localhost:5000 and refresh a few times. You'll see the visit count increase.

Now **delete the container:**
```bash
docker rm -f app1
```

**Run a new container:**
```bash
docker run -d -p 5000:5000 --name app2 volume-app
```

Refresh the page - **counter is back to 0!** 😱 All data was lost!

```bash
docker rm -f app2
```

---

### Step 3: Run WITH a Named Volume (Data Persists!)

```bash
# Create a named volume
docker volume create visit-data

# Run with the volume mounted
docker run -d -p 5000:5000 --name app3 -v visit-data:/app/data volume-app
```

**Let's break down the `-v` flag:**
```
-v visit-data:/app/data
   ↑           ↑
   │           └─ Path inside container
   └───────────── Volume name
```

Open http://localhost:5000 and refresh several times. Note the count.

Now **delete the container:**
```bash
docker rm -f app3
```

**Run a NEW container with the SAME volume:**
```bash
docker run -d -p 5000:5000 --name app4 -v visit-data:/app/data volume-app
```

Refresh the page - **the counter continues from where it left off!** 🎉

**The data survived!**

---

### Step 4: Inspect Volumes

```bash
# List all volumes
docker volume ls

# Inspect a specific volume
docker volume inspect visit-data
```

You'll see:
```json
[
    {
        "Name": "visit-data",
        "Driver": "local",
        "Mountpoint": "/var/lib/docker/volumes/visit-data/_data",
        "Scope": "local"
    }
]
```

**Mountpoint** is where Docker stores the data on your computer.

---

### Step 5: View Data Inside Volume

```bash
# Execute into the running container
docker exec -it app4 sh

# Inside container - view the data file
cat /app/data/visits.json

# You'll see the JSON with visit count and history!
exit
```

---

### Step 6: Multiple Containers, Same Volume

You can mount the same volume to multiple containers:

```bash
# Stop current container
docker stop app4

# Run two containers sharing the same volume
docker run -d -p 5001:5000 --name app-a -v visit-data:/app/data volume-app
docker run -d -p 5002:5000 --name app-b -v visit-data:/app/data volume-app
```

Open both:
- http://localhost:5001
- http://localhost:5002

Refresh either one - **both see the same counter!** They're sharing data.

**Cleanup:**
```bash
docker rm -f app-a app-b
```

---

### Step 7: Anonymous Volumes

If you don't specify a volume name, Docker creates an anonymous volume:

```bash
docker run -d -p 5000:5000 --name app5 -v /app/data volume-app
#                                              ↑
#                                              No name - anonymous!
```

```bash
docker volume ls
```

You'll see a volume with a random ID like `abc123def456...`

**Problem:** Hard to identify and reuse!

**Best practice:** Always use named volumes.

```bash
docker rm -f app5
```

---

### Step 8: Backup Volume Data

```bash
# Run a container with the volume
docker run -d -p 5000:5000 --name app -v visit-data:/app/data volume-app

# Backup: Copy data from volume to your computer
docker run --rm -v visit-data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .
```

**What this does:**
1. Runs a temporary Alpine container
2. Mounts the volume to `/data`
3. Mounts current directory to `/backup`
4. Creates a tar.gz backup file
5. Container auto-removes (`--rm`)

You now have `backup.tar.gz` on your computer!

---

### Step 9: Restore Volume Data

```bash
# Create a new volume
docker volume create visit-data-restored

# Restore backup to new volume
docker run --rm -v visit-data-restored:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data

# Run container with restored volume
docker run -d -p 5003:5000 --name app-restored -v visit-data-restored:/app/data volume-app
```

Open http://localhost:5003 - **data is restored!** 🎉

---

### Step 10: Clean Up Volumes

```bash
# Stop and remove all containers
docker rm -f $(docker ps -aq)

# Remove specific volume
docker volume rm visit-data

# Remove all unused volumes
docker volume prune

# Remove all volumes (DANGEROUS!)
docker volume prune -a
```

---

## 🧪 Experiments to Try

### Experiment 1: Volume Permissions

```bash
# Create volume with specific permissions
docker run -d -p 5000:5000 --name app \
  -v visit-data:/app/data:rw \
  volume-app
#                         ↑
#                         rw = read-write (default)
#                         ro = read-only
```

---

### Experiment 2: Inspect Volume Contents

```bash
# On Linux/Mac - directly access volume
sudo ls -la /var/lib/docker/volumes/visit-data/_data/

# On Windows/Mac with Docker Desktop - use a container
docker run --rm -v visit-data:/data alpine ls -la /data
```

---

### Experiment 3: Volume Size

```bash
# Check volume size
docker system df -v
```

Shows size of all volumes.

---

## 📊 Volume Types Comparison

| Type | Command | Use Case | Reusable? |
|------|---------|----------|-----------|
| **Named Volume** | `-v mydata:/app/data` | Production databases | ✅ Yes |
| **Anonymous Volume** | `-v /app/data` | Temporary data | ❌ No |
| **Bind Mount** | `-v /path/on/host:/app/data` | Development | ✅ Yes |

**We'll cover bind mounts in Part 5!**

---

## 🎓 What You Learned

✅ Why containers lose data by default  
✅ What Docker volumes are  
✅ How to create named volumes  
✅ How to mount volumes to containers  
✅ How to share volumes between containers  
✅ How to inspect volumes  
✅ How to backup and restore volume data  
✅ Named vs anonymous volumes  

---

## 💡 Best Practices

### When to Use Volumes

✅ **Use volumes for:**
- Database data (PostgreSQL, MySQL, MongoDB)
- User uploads
- Application logs
- Any data that must persist

❌ **Don't use volumes for:**
- Application code (use bind mounts for development)
- Temporary files (use container filesystem)
- Configuration (use ConfigMaps in Kubernetes)

### Naming Convention

```bash
# ✅ Good - descriptive names
docker volume create postgres-data
docker volume create app-uploads
docker volume create nginx-logs

# ❌ Bad - generic names
docker volume create data
docker volume create vol1
```

### Backup Strategy

```bash
# Regular backups
0 2 * * * docker run --rm -v mydata:/data -v /backups:/backup alpine tar czf /backup/backup-$(date +\%Y\%m\%d).tar.gz -C /data .
```

---

## 🆘 Common Issues

### "Error: volume is in use"
**Problem:** Container is still using the volume

**Solution:**
```bash
docker ps -a  # Find container using volume
docker rm -f <container>
docker volume rm <volume>
```

---

### "Permission denied" when accessing volume
**Problem:** Container user doesn't have permissions

**Solution:**
```dockerfile
# In Dockerfile
RUN chown -R appuser:appuser /app/data
USER appuser
```

---

### Volume data disappeared
**Problem:** Used anonymous volume or didn't mount correctly

**Solution:** Always use named volumes and verify mount:
```bash
docker inspect <container> | grep Mounts -A 10
```

---

## ✅ Checkpoint

Before moving to Part 5, make sure you can:

- [ ] Explain why volumes are needed
- [ ] Create named volumes
- [ ] Mount volumes to containers
- [ ] Share volumes between containers
- [ ] Inspect volume contents
- [ ] Backup and restore volume data
- [ ] Clean up unused volumes

---

## 🚀 What's Next?

**Part 5: Bind Mounts** - Learn how to mount folders from your computer for live code editing!

```bash
cd ../part-05-bind-mounts
```

---

## 🎯 Quick Reference

```bash
# Create volume
docker volume create mydata

# Run with volume
docker run -v mydata:/app/data myapp

# List volumes
docker volume ls

# Inspect volume
docker volume inspect mydata

# Remove volume
docker volume rm mydata

# Remove unused volumes
docker volume prune

# Backup volume
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .

# Restore volume
docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data
```

Excellent work! Your data is now safe! 💾🎉
