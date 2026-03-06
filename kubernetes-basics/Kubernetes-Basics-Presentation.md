# Kubernetes Basics - Complete Presentation
## For Converting to PowerPoint

> **Instructions:** Copy each slide section into PowerPoint slides. Use diagrams where indicated.

---

## SLIDE 1: Title Slide

**Title:** Introduction to Kubernetes
**Subtitle:** Container Orchestration Made Simple
**Footer:** Docker & Kubernetes Workshop

**Visual:** Kubernetes logo (ship wheel) ☸️

---

## SLIDE 2: Agenda

**What We'll Cover Today:**

1. What is Kubernetes?
2. The Problem Kubernetes Solves
3. Kubernetes vs Docker
4. Core Concepts (Pods, Deployments, Services)
5. Kubernetes Architecture
6. Hands-On Demo
7. Best Practices
8. Next Steps

**Time:** 40 minutes

---

## SLIDE 3: What is Kubernetes?

**Definition:**
Kubernetes (K8s) is a container orchestration platform that automates deploying, scaling, and managing containerized applications.

**Key Points:**
- ☸️ Open-source (originally by Google)
- 🚀 Automates container management
- 📈 Scales from 1 to thousands of containers
- 🌐 Works across multiple servers (cluster)
- 🔄 Self-healing and auto-recovery

**Pronunciation:** koo-ber-net-eez  
**Short form:** K8s (K + 8 letters + s)

---

## SLIDE 4: The Orchestra Conductor Analogy

**Without Conductor (No Kubernetes):**
- Musicians play independently
- No coordination
- Chaos when mistakes happen
- Hard to add more musicians

**With Conductor (Kubernetes):**
- Coordinates all musicians
- Maintains harmony
- Replaces musicians if needed
- Easy to scale orchestra
- Show goes on!

**Kubernetes is the conductor for your containers** 🎼

**Visual:** Orchestra conductor image

---

## SLIDE 5: The Problem - Running Containers at Scale

**Challenge:**
You have 100 containers to run in production

**Questions:**
- Which server runs which container? 🤔
- What if a container crashes? 💥
- How do you update all containers? 🔄
- How do you scale to 200 containers? 📈
- How do containers find each other? 🔍
- How do you handle traffic spikes? 📊

**Manual management = Impossible!**

---

## SLIDE 6: The Solution - Kubernetes Automation

**You tell Kubernetes:**
```
"I want 100 containers of my app running"
```

**Kubernetes automatically handles:**
- ✅ Distributing across servers
- ✅ Restarting crashed containers
- ✅ Rolling updates (zero downtime)
- ✅ Auto-scaling based on load
- ✅ Service discovery
- ✅ Load balancing

**Result: You focus on code, K8s handles operations!**

---

## SLIDE 7: Real-World Example - High Availability

**Scenario:** Server crashes at 3 AM

**Without Kubernetes:**
```
1. Server dies → All containers die 💀
2. Pager wakes you up 📱
3. You SSH into backup server 💻
4. Manually start containers 🔧
5. Update load balancer ⚙️
6. Test everything 🧪

Downtime: Hours
Your sleep: Ruined 😴
```

---

## SLIDE 8: With Kubernetes - Self-Healing

**Same Scenario:** Server crashes at 3 AM

**With Kubernetes:**
```
1. Server dies → K8s detects in seconds ⚡
2. Automatically reschedules containers 🔄
3. Starts them on healthy servers ✅
4. Updates routing automatically 🌐
5. Everything keeps running 🚀

Downtime: Seconds (or zero!)
Your sleep: Undisturbed 😴✨
```

**This is the power of Kubernetes!**

---

## SLIDE 9: Kubernetes vs Docker

**They Work Together!**

```
┌─────────────────────────────┐
│    Your Application         │
│                             │
│  ┌───────────────────────┐  │
│  │   Kubernetes          │  │ ← Orchestrator
│  │   (The Manager)       │  │
│  └───────────────────────┘  │
│            ↓                │
│  ┌───────────────────────┐  │
│  │   Docker              │  │ ← Container Runtime
│  │   (The Worker)        │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Not competitors - they're teammates!**

---

## SLIDE 10: Docker vs Kubernetes - Comparison

| Feature | Docker | Kubernetes |
|---------|--------|------------|
| **Purpose** | Run containers | Orchestrate containers |
| **Scope** | Single machine | Multiple machines |
| **Scaling** | Manual | Automatic |
| **Self-healing** | ❌ No | ✅ Yes |
| **Load balancing** | Manual | Built-in |
| **Updates** | Manual | Rolling updates |
| **Complexity** | Simple | More complex |
| **Best for** | Dev/Testing | Production |

---

## SLIDE 11: The Analogy

**Docker:**
- A single delivery truck 🚚
- Carries packages (containers)
- One route at a time

**Kubernetes:**
- Amazon's entire logistics network 📦
- Manages thousands of trucks
- Optimizes routes automatically
- Handles failures gracefully
- Scales for peak demand

**Both are needed for modern delivery!**

---

## SLIDE 12: Kubernetes Architecture

```
┌─────────────────────────────────────────┐
│       Kubernetes Cluster                │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │    Control Plane (Master)         │ │
│  │  • API Server (brain)             │ │
│  │  • Scheduler (assigns work)       │ │
│  │  • Controller Manager (maintains) │ │
│  │  • etcd (database)                │ │
│  └───────────────────────────────────┘ │
│              ↓  ↓  ↓                   │
│  ┌────────┐ ┌────────┐ ┌────────┐     │
│  │ Node 1 │ │ Node 2 │ │ Node 3 │     │
│  │ [Pods] │ │ [Pods] │ │ [Pods] │     │
│  └────────┘ └────────┘ └────────┘     │
│   Worker     Worker     Worker         │
└─────────────────────────────────────────┘
```

---

## SLIDE 13: Core Concept #1 - Pod 🫘

**What is a Pod?**
- Smallest deployable unit
- Wraps 1 or more containers
- Shares network & storage
- Temporary (ephemeral)

**Analogy:** A pod is a **house** where containers live together

**Key Points:**
- Usually 1 container per pod
- Each pod gets unique IP
- Pods are replaceable

**Visual:** Pod diagram with containers inside

---

## SLIDE 14: Pod Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80
```

**What this does:**
- Creates a pod named "nginx-pod"
- Runs nginx container
- Exposes port 80

**Command:**
```bash
kubectl apply -f pod.yaml
kubectl get pods
```

---

## SLIDE 15: Core Concept #2 - Deployment 🚀

**What is a Deployment?**
- Manages a set of identical pods
- Ensures desired number of replicas
- Handles rolling updates
- Self-healing (recreates failed pods)

**Analogy:** A deployment is a **factory manager** ensuring you always have the right number of products

**Key Features:**
- Desired state management
- Automatic pod replacement
- Zero-downtime updates
- Rollback capability

---

## SLIDE 16: Deployment Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3  # Always keep 3 pods
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
```

**Result:** 3 identical pods always running!

---

## SLIDE 17: Deployment Benefits

**Scenario:** One pod crashes

**Without Deployment:**
```
Pod dies → Stays dead → Reduced capacity ❌
```

**With Deployment:**
```
Pod dies → K8s detects → Creates new pod → Full capacity restored ✅
```

**Scenario:** Need to update app

**Without Deployment:**
```
Stop all → Update → Start all → Downtime! ❌
```

**With Deployment:**
```
Rolling update → One by one → Zero downtime ✅
```

---

## SLIDE 18: Core Concept #3 - Service 🌐

**What is a Service?**
- Stable network endpoint
- Load balances across pods
- Doesn't change when pods restart
- Enables service discovery

**Analogy:** A service is like a **phone number** - stays the same even if you change phones

**Problem it solves:**
- Pods have changing IPs
- Need stable way to reach them
- Need load balancing

---

## SLIDE 19: Service Types

**ClusterIP (Default):**
- Internal only
- Other pods can access
- Not accessible from outside

**NodePort:**
- External access
- Via Node IP:Port
- Good for development

**LoadBalancer:**
- Cloud load balancer
- Production-ready
- Costs money (cloud provider)

---

## SLIDE 20: Service Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx  # Routes to pods with this label
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
```

**Access:** `http://localhost:30080`

**Load balancing:** Automatic across all nginx pods!

---

## SLIDE 21: How Services Work

```
Request → Service → Load Balancer → Pods

http://nginx-service
         ↓
    [Service]
         ↓
   Load Balancer
    ↙    ↓    ↘
 Pod1  Pod2  Pod3
```

**Key Point:** Service stays stable, pods can come and go

---

## SLIDE 22: Core Concept #4 - Namespace 📁

**What is a Namespace?**
- Virtual cluster within cluster
- Isolates resources
- Organizes applications

**Analogy:** Like **folders** on your computer

**Common Namespaces:**
- `default` - Default namespace
- `kube-system` - K8s system components
- `kube-public` - Public resources
- Your custom namespaces

**Use Cases:**
- Separate dev/staging/prod
- Multi-tenant clusters
- Team isolation

---

## SLIDE 23: Core Concept #5 - ConfigMap & Secret

**ConfigMap:**
- Non-sensitive configuration
- Environment variables
- Config files
- Visible in plain text

**Secret:**
- Sensitive data
- Passwords, tokens, keys
- Base64 encoded
- Access controlled

**Analogy:**
- ConfigMap = **Settings file** 📄
- Secret = **Password manager** 🔐

---

## SLIDE 24: ConfigMap & Secret Example

```yaml
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: "postgres://db:5432"
  LOG_LEVEL: "info"

---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  password: cGFzc3dvcmQxMjM=  # base64
```

**Inject into pods as environment variables**

---

## SLIDE 25: Kubernetes Object Hierarchy

```
Cluster
  └── Namespace
        ├── Deployment
        │     └── ReplicaSet
        │           └── Pod
        │                 └── Container(s)
        │
        ├── Service
        │     └── Endpoints
        │
        ├── ConfigMap
        └── Secret
```

**You work with:** Deployment, Service, ConfigMap, Secret  
**K8s manages:** ReplicaSet, Pod, Endpoints

---

## SLIDE 26: kubectl - The Kubernetes CLI

**What is kubectl?**
- Command-line tool for Kubernetes
- Communicates with API server
- Manages all resources

**Pronunciation:** "kube-control" or "kube-cuttle"

**Essential Commands:**
```bash
kubectl get pods
kubectl describe pod <name>
kubectl logs <pod-name>
kubectl apply -f <file.yaml>
kubectl delete pod <name>
```

---

## SLIDE 27: DEMO - Deploy Your First App

**Live Demo Steps:**

```bash
# 1. Check cluster
kubectl cluster-info

# 2. Create deployment
kubectl create deployment nginx --image=nginx

# 3. View pods
kubectl get pods

# 4. Expose service
kubectl expose deployment nginx --port=80 --type=NodePort

# 5. Get service
kubectl get services

# 6. Access in browser
http://localhost:<nodePort>
```

---

## SLIDE 28: DEMO - Scaling

```bash
# Scale to 5 replicas
kubectl scale deployment nginx --replicas=5

# Watch pods being created
kubectl get pods -w

# Verify
kubectl get pods
```

**Result:** 5 pods running instantly!

**Delete one pod:**
```bash
kubectl delete pod <pod-name>
```

**Watch it recreate automatically!** ✨

---

## SLIDE 29: DEMO - Rolling Update

```bash
# Update image version
kubectl set image deployment/nginx nginx=nginx:1.25

# Watch rolling update
kubectl rollout status deployment/nginx

# View history
kubectl rollout history deployment/nginx

# Rollback if needed
kubectl rollout undo deployment/nginx
```

**Zero downtime!** Old pods replaced gradually.

---

## SLIDE 30: Kubernetes Benefits Summary

**For Developers:**
- ✅ Focus on code, not infrastructure
- ✅ Consistent environments
- ✅ Easy local testing
- ✅ Self-service deployments

**For Operations:**
- ✅ Automated operations
- ✅ Self-healing systems
- ✅ Easy scaling
- ✅ Declarative configuration

**For Business:**
- ✅ Reduced downtime
- ✅ Faster deployments
- ✅ Better resource utilization
- ✅ Multi-cloud flexibility

---

## SLIDE 31: When to Use Kubernetes?

**✅ Good Use Cases:**
- Microservices architecture
- Applications needing high availability
- Auto-scaling requirements
- Multi-environment deployments
- Container-based applications
- Cloud-native apps

**❌ Maybe Not:**
- Simple single-server apps
- Legacy monoliths (without containers)
- Very small teams/projects
- Learning curve too steep

---

## SLIDE 32: Kubernetes Ecosystem

**Core:**
- ☸️ Kubernetes
- 🐳 Docker/containerd
- 📦 Helm (package manager)

**Monitoring:**
- 📊 Prometheus
- 📈 Grafana
- 🔍 ELK Stack

**Service Mesh:**
- 🕸️ Istio
- 🔗 Linkerd

**CI/CD:**
- 🔄 ArgoCD
- 🚀 Flux
- ⚙️ Jenkins X

---

## SLIDE 33: Kubernetes Distributions

**Managed Services (Easy):**
- Google Kubernetes Engine (GKE)
- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- DigitalOcean Kubernetes

**Self-Managed:**
- kubeadm (official)
- k3s (lightweight)
- MicroK8s
- OpenShift

**Local Development:**
- Docker Desktop
- Minikube
- kind (Kubernetes in Docker)

---

## SLIDE 34: Best Practices

**Resource Management:**
- ✅ Set resource requests/limits
- ✅ Use namespaces for isolation
- ✅ Implement health checks

**Security:**
- ✅ Use RBAC (Role-Based Access Control)
- ✅ Scan images for vulnerabilities
- ✅ Use Secrets for sensitive data
- ✅ Network policies

**Reliability:**
- ✅ Multiple replicas for HA
- ✅ Use rolling updates
- ✅ Implement monitoring
- ✅ Regular backups

---

## SLIDE 35: Common Pitfalls to Avoid

**❌ Don't:**
- Run without resource limits
- Use `latest` tag in production
- Store secrets in ConfigMaps
- Ignore monitoring/logging
- Deploy directly to production
- Run as root user

**✅ Do:**
- Set proper resource requests/limits
- Use specific version tags
- Use Secrets for sensitive data
- Implement observability
- Use staging environments
- Run as non-root

---

## SLIDE 36: Learning Path

**Your Journey:**

```
1. ✅ Kubernetes Basics (Today)
   ↓
2. Deploy Multi-Container Apps
   ↓
3. ConfigMaps, Secrets, Volumes
   ↓
4. Scaling & Auto-scaling (HPA)
   ↓
5. Rolling Updates & Rollbacks
   ↓
6. Monitoring & Logging
   ↓
7. Production Deployment
```

---

## SLIDE 37: Hands-On Exercise

**Try This Now (5 minutes):**

1. Create a deployment:
   ```bash
   kubectl create deployment hello --image=nginx
   ```

2. Scale it:
   ```bash
   kubectl scale deployment hello --replicas=3
   ```

3. Expose it:
   ```bash
   kubectl expose deployment hello --port=80 --type=NodePort
   ```

4. Access in browser

5. Clean up:
   ```bash
   kubectl delete deployment hello
   kubectl delete service hello
   ```

---

## SLIDE 38: Key Takeaways

**Remember:**

1. ☸️ **Kubernetes** orchestrates containers at scale
2. 🫘 **Pods** are the smallest unit
3. 🚀 **Deployments** manage desired state
4. 🌐 **Services** provide stable networking
5. 🔄 **Self-healing** is automatic
6. 📈 **Scaling** is easy
7. 🎯 **Declarative** configuration (YAML)

**One Sentence:** Kubernetes automates everything you'd do manually to run containers in production.

---

## SLIDE 39: Quick Reference

```bash
# Cluster
kubectl cluster-info
kubectl get nodes

# Pods
kubectl get pods
kubectl logs <pod>
kubectl exec -it <pod> -- sh

# Deployments
kubectl get deployments
kubectl scale deployment <name> --replicas=3
kubectl rollout status deployment/<name>

# Services
kubectl get services
kubectl expose deployment <name> --port=80

# Apply YAML
kubectl apply -f <file.yaml>
kubectl delete -f <file.yaml>

# Everything
kubectl get all
```

---

## SLIDE 40: Resources

**Official:**
- 📖 Kubernetes Docs: https://kubernetes.io/docs
- 🎓 Kubernetes Training: https://kubernetes.io/training
- 🧪 Interactive Tutorial: https://kubernetes.io/docs/tutorials

**Practice:**
- 🎮 Play with Kubernetes: https://labs.play-with-k8s.com
- 💻 Our Workshop: `/kubernetes-basics/`

**Community:**
- 💬 Kubernetes Slack
- 📺 KubeCon talks
- 📚 Books: "Kubernetes Up & Running"

---

## SLIDE 41: What's Next in Workshop?

**Today's Hands-On:**
- ✅ Part 0: Introduction (Done!)
- 📝 Deploy real app (Node.js + Redis)
- 📝 Use ConfigMaps & Secrets
- 📝 Implement health checks
- 📝 Set up auto-scaling (HPA)
- 📝 Perform rolling updates
- 📝 Practice troubleshooting

**Let's deploy something real!**

---

## SLIDE 42: Q&A

**Common Questions:**

- How is Kubernetes different from Docker?
- Do I need Kubernetes for my project?
- How hard is it to learn?
- What about costs?
- Can I run it locally?
- How do I migrate existing apps?

**Let's discuss!**

---

## SLIDE 43: Thank You!

**Contact & Resources:**
- 📁 Workshop materials: `/kubernetes-basics/`
- 📖 Detailed guides in each folder
- 🎯 Hands-on exercises included
- 💬 Ask questions anytime!

**Next:** Deploy your first real application!

```bash
cd ../../step-04-kubernetes
```

**Let's orchestrate some containers!** ☸️🚀

---

## PRESENTATION NOTES

### Slide Design Tips:
1. Use Kubernetes blue (#326CE5) as primary color
2. Include Kubernetes ship wheel logo
3. Use monospace font for code/commands
4. Add diagrams for architecture
5. Keep text minimal, focus on visuals

### Timing Guide:
- Slides 1-8: Introduction & Problems (8 min)
- Slides 9-11: K8s vs Docker (4 min)
- Slides 12-25: Core Concepts (12 min)
- Slides 26-29: Demo (10 min)
- Slides 30-43: Best Practices & Wrap-up (6 min)

### Interactive Elements:
- Live demo at slides 27-29
- Hands-on exercise at slide 37
- Q&A at slide 42

### Visual Assets Needed:
- Kubernetes logo
- Orchestra conductor image
- Architecture diagrams
- kubectl command screenshots
- Before/after comparisons

---

**END OF PRESENTATION**

**Total Slides:** 43
**Estimated Duration:** 40-50 minutes with demos
**Format:** Ready for PowerPoint conversion
