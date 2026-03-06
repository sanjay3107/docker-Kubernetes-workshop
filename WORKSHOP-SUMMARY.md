# 🎓 Docker & Kubernetes Workshop - Complete Package

## 📦 What's Included

This repository contains **two complete learning paths** for your 2-hour workshop:

### 1. **Docker Basics Tutorial** (`/docker-basics/`)
A comprehensive, beginner-friendly Docker tutorial with 8 hands-on parts.

**Perfect for:** Students new to Docker who need step-by-step guidance.

**Structure:**
- `DOCKER-CONCEPTS.md` - Core concepts explained simply
- `part-01-containerize/` - Build your first container (15 min)
- `part-02-update/` - Update and rebuild efficiently (10 min)
- `part-03-share/` - Push to Docker Hub (10 min)
- `part-04-volumes/` - Persist data permanently (15 min)
- `part-05-bind-mounts/` - Live code editing (10 min)
- `part-06-multi-container/` - App + Database (20 min)
- `part-07-compose/` - Docker Compose orchestration (20 min)
- `part-08-best-practices/` - Production tips (15 min)

**Features:**
- ✅ Lightweight Python Flask examples (fast builds!)
- ✅ Simple, visual web interfaces
- ✅ Detailed explanations with analogies
- ✅ Common issues & solutions
- ✅ Experiments to try
- ✅ Quick reference commands

---

### 2. **Docker & Kubernetes Full Workshop** (`/step-01-plain-app/` through `/step-05-advanced/`)
Complete production-ready workflow from local development to Kubernetes deployment.

**Perfect for:** Students ready for the full DevOps pipeline.

**Structure:**
- `step-01-plain-app/` - Node.js + Redis app (no Docker)
- `step-02-dockerize/` - Dockerfile + docker-compose
- `step-03-push-to-hub/` - Share via Docker Hub
- `step-04-kubernetes/` - Deploy to Kubernetes (8 YAML files)
- `step-05-advanced/` - Scaling, rolling updates, HPA

**Features:**
- ✅ Real-world Node.js + Express + Redis stack
- ✅ Multi-stage Dockerfile
- ✅ Kubernetes manifests (Deployment, Service, ConfigMap, Secret, HPA)
- ✅ Rolling updates demo
- ✅ Horizontal Pod Autoscaler
- ✅ Production-ready examples

---

## 🎯 Recommended Workshop Flow

### Option A: Docker-First (Recommended for Beginners)
**Total: 2 hours**

1. **Introduction** (10 min)
   - Read `docker-basics/DOCKER-CONCEPTS.md` together
   - Explain containers vs VMs

2. **Hands-On Docker** (60 min)
   - Part 1: Containerize (15 min)
   - Part 2: Update (10 min)
   - Part 4: Volumes (15 min)
   - Part 7: Docker Compose (20 min)

3. **Introduction to Kubernetes** (40 min)
   - Show `step-04-kubernetes/` manifests
   - Deploy to minikube
   - Demonstrate scaling

4. **Wrap-up** (10 min)
   - Q&A
   - Next steps

---

### Option B: Full Pipeline (For Advanced Students)
**Total: 2 hours**

1. **Quick Docker Review** (15 min)
   - Skim `docker-basics/DOCKER-CONCEPTS.md`
   - Show one example from Part 1

2. **Full Workshop** (100 min)
   - Step 1: Plain app (15 min)
   - Step 2: Dockerize (25 min)
   - Step 3: Docker Hub (10 min)
   - Step 4: Kubernetes (30 min)
   - Step 5: Advanced K8s (20 min)

3. **Wrap-up** (5 min)

---

## 🚀 Quick Start for Instructors

### Before the Session
1. Ensure Docker Desktop is installed on all machines
2. For Kubernetes section: Install minikube and kubectl
3. Clone this repository to each student's machine
4. Test one example to verify everything works

### During the Session
1. Students follow along on their own machines
2. Each folder has a detailed README with step-by-step instructions
3. Use Docker Desktop GUI to visualize containers
4. Encourage students to experiment and break things!

### After the Session
Students can:
- Continue with remaining parts at their own pace
- Use `cheatsheet.md` as a reference
- Push their own projects to Docker Hub
- Deploy to cloud Kubernetes (GKE, EKS, AKS)

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `docker-basics/README.md` | Docker tutorial overview |
| `docker-basics/DOCKER-CONCEPTS.md` | Core concepts explained |
| `README.md` | Main workshop guide (K8s focused) |
| `cheatsheet.md` | Quick command reference |
| `WORKSHOP-SUMMARY.md` | This file |

---

## 🛠️ Prerequisites

**Required:**
- Docker Desktop installed
- Basic command line knowledge
- Text editor (VS Code recommended)

**For Kubernetes sections:**
- minikube installed
- kubectl installed
- Docker Hub account (free)

---

## 💡 Teaching Tips

### For Docker Basics:
- Use Docker Desktop GUI to show containers visually
- Let students see the web apps in their browsers
- Encourage editing code and seeing live changes
- Show common errors and how to fix them

### For Kubernetes:
- Start with simple concepts (Pods, Deployments)
- Use `kubectl get pods -w` to show live updates
- Demonstrate scaling by refreshing browser multiple times
- Show different hostnames = different pods = load balancing

### Common Student Questions:
- **"Why not just use VMs?"** → Show size difference and startup time
- **"When do I use volumes vs bind mounts?"** → Volumes for data, bind mounts for development
- **"What's the difference between Docker and Kubernetes?"** → Docker runs containers, Kubernetes orchestrates many containers

---

## 🎓 Learning Outcomes

After completing this workshop, students will be able to:

**Docker:**
- ✅ Explain what containers are and why they're useful
- ✅ Write Dockerfiles and build images
- ✅ Run containers with proper port mapping
- ✅ Use volumes for data persistence
- ✅ Use Docker Compose for multi-container apps
- ✅ Push images to Docker Hub

**Kubernetes:**
- ✅ Deploy applications to Kubernetes
- ✅ Scale applications horizontally
- ✅ Perform zero-downtime rolling updates
- ✅ Use ConfigMaps and Secrets
- ✅ Understand Pods, Deployments, and Services
- ✅ Debug running containers

---

## 🔧 Troubleshooting

### Docker Desktop not starting
→ Restart computer, ensure virtualization is enabled in BIOS

### Port already in use
→ `docker ps` to find container, `docker stop <container>`

### Image build fails
→ Check Dockerfile syntax, ensure all files exist

### Cannot connect to minikube
→ `minikube delete && minikube start`

### Students falling behind
→ Have pre-built images ready to pull from Docker Hub

---

## 📊 Session Timing Guide

| Activity | Time | Cumulative |
|----------|------|------------|
| Introduction & Setup | 10 min | 10 min |
| Docker Basics Hands-On | 60 min | 70 min |
| Break | 10 min | 80 min |
| Kubernetes Demo | 30 min | 110 min |
| Q&A & Wrap-up | 10 min | 120 min |

---

## 🎉 Success Metrics

Students should be able to:
- [ ] Build and run their own Docker container
- [ ] Access a containerized app in their browser
- [ ] Push an image to Docker Hub
- [ ] Deploy an app to Kubernetes
- [ ] Scale an application

---

## 📝 Feedback & Iteration

After the session, consider:
- Which parts took longer than expected?
- Which concepts needed more explanation?
- What questions came up repeatedly?
- What worked really well?

Use this to adjust timing and content for future sessions.

---

## 🌟 Next Steps for Students

**Beginner Path:**
1. Complete all docker-basics parts
2. Build a personal project and containerize it
3. Deploy to Docker Hub
4. Learn Kubernetes basics

**Advanced Path:**
1. Deploy to cloud Kubernetes (GKE, EKS, AKS)
2. Learn CI/CD with GitHub Actions
3. Explore service meshes (Istio, Linkerd)
4. Study microservices architecture

---

**Good luck with your workshop!** 🚀

For questions or improvements, feel free to modify these materials.
