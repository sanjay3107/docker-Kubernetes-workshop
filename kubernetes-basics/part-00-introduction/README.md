# Part 0: Introduction to Kubernetes - The Absolute Basics ☸️

> **Start Here!** Your first step into Kubernetes. Assumes you know Docker basics.

---

## 🎯 What You'll Learn

- What Kubernetes is and why it exists
- The problem Kubernetes solves
- Kubernetes vs Docker (they work together!)
- Core concepts: Pods, Deployments, Services
- How to use kubectl (Kubernetes CLI)
- How to deploy your first application
- Basic Kubernetes commands

**Time:** 40 minutes  
**Prerequisites:** Docker basics, Docker Desktop with Kubernetes enabled

---

## 🤔 What is Kubernetes?

### Simple Definition
**Kubernetes (K8s) is a container orchestration platform that automates deploying, scaling, and managing containerized applications.**

**Think of it as:**
- Docker runs containers on **one computer**
- Kubernetes manages containers across **many computers**

### Real-World Analogy: Orchestra Conductor 🎼

**Without a conductor (No Kubernetes):**
- Each musician (container) plays independently
- No coordination
- Chaos when someone makes a mistake
- Hard to scale (add more musicians)

**With a conductor (Kubernetes):**
- Conductor coordinates all musicians
- Maintains harmony
- Replaces musicians if they can't play
- Easy to add/remove musicians
- Ensures the show goes on!

---

## 🔥 The Problem Kubernetes Solves

### Scenario 1: Running Containers at Scale

**With Docker only:**
```
You have 100 containers to run:
- Which server runs which container?
- What if a container crashes?
- How do you update all containers?
- How do you scale to 200 containers?
- How do containers find each other?

Manual work = 😫 Nightmare!
```

**With Kubernetes:**
```
You tell Kubernetes:
"I want 100 containers running"

Kubernetes handles:
✅ Distributing across servers
✅ Restarting crashed containers
✅ Rolling updates
✅ Auto-scaling to 200
✅ Service discovery

Automated = 😊 Easy!
```

### Scenario 2: High Availability

**Without Kubernetes:**
```
Server crashes → All containers on it die → Downtime! 💥

Manual recovery:
1. Notice the problem (maybe hours later)
2. SSH into backup server
3. Manually start containers
4. Update load balancer
5. Hope nothing else breaks

Downtime: Hours
```

**With Kubernetes:**
```
Server crashes → Kubernetes detects it in seconds

Automatic recovery:
1. Kubernetes notices immediately
2. Reschedules containers to healthy servers
3. Updates routing automatically
4. Everything keeps running

Downtime: Seconds (or none!)
```

### Scenario 3: Scaling

**Without Kubernetes:**
```
Black Friday traffic spike! 📈

Manual scaling:
1. Notice slow performance
2. Build more containers
3. Find servers with capacity
4. Deploy manually
5. Update load balancer
6. Test everything

Time: 30+ minutes (customers already left!)
```

**With Kubernetes:**
```
Traffic spike detected

Automatic scaling:
1. Kubernetes monitors metrics
2. Automatically creates more pods
3. Distributes across cluster
4. Updates routing
5. Handles traffic

Time: Seconds (customers happy!)
```

---

## 🆚 Kubernetes vs Docker

### They're NOT Competitors - They Work Together!

```
┌─────────────────────────────────────┐
│         Your Application            │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Kubernetes (Orchestrator)  │  │ ← Manages everything
│  │   - Scheduling               │  │
│  │   - Scaling                  │  │
│  │   - Self-healing             │  │
│  └──────────────────────────────┘  │
│              ↓                      │
│  ┌──────────────────────────────┐  │
│  │   Docker (Container Runtime) │  │ ← Runs containers
│  │   - Builds images            │  │
│  │   - Runs containers          │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Comparison Table

| Aspect | Docker | Kubernetes |
|--------|--------|------------|
| **Purpose** | Run containers | Orchestrate containers |
| **Scope** | Single machine | Multiple machines (cluster) |
| **Scaling** | Manual | Automatic |
| **Self-healing** | No | Yes |
| **Load balancing** | Manual setup | Built-in |
| **Updates** | Manual | Rolling updates |
| **Best for** | Development, simple apps | Production, complex apps |

### The Relationship

```
Docker:       "I can run this container"
Kubernetes:   "I'll run 100 of those containers across 10 servers,
               restart them if they crash, scale them up during
               peak hours, and update them without downtime"
```

**Analogy:**
- **Docker** = A single delivery truck
- **Kubernetes** = Amazon's entire logistics network

---

## 🏗️ Kubernetes Architecture (Simplified)

### The Cluster

```
┌─────────────────────────────────────────────────────┐
│              Kubernetes Cluster                     │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │         Control Plane (Master)              │  │
│  │  - API Server (brain)                       │  │
│  │  - Scheduler (assigns work)                 │  │
│  │  - Controller Manager (maintains state)     │  │
│  │  - etcd (database)                          │  │
│  └─────────────────────────────────────────────┘  │
│                      ↓                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Node 1  │  │  Node 2  │  │  Node 3  │        │
│  │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │        │
│  │ │ Pod  │ │  │ │ Pod  │ │  │ │ Pod  │ │        │
│  │ │ Pod  │ │  │ │ Pod  │ │  │ │ Pod  │ │        │
│  │ └──────┘ │  │ └──────┘ │  │ └──────┘ │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│   (Worker)      (Worker)      (Worker)            │
└─────────────────────────────────────────────────────┘
```

**Components:**
- **Control Plane:** The brain that makes decisions
- **Nodes:** Worker machines that run containers
- **Pods:** Smallest unit (one or more containers)

---

## 🧱 Core Kubernetes Concepts

### 1. Pod 🫘

**What is it?**
- Smallest deployable unit in Kubernetes
- Wraps one or more containers
- Shares network and storage
- Temporary (can be deleted/recreated)

**Analogy:** A pod is like a **house** where containers (people) live together

**Example:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: web-app
    image: nginx
```

**Key Points:**
- Usually 1 container per pod
- Pods are ephemeral (temporary)
- Each pod gets its own IP address

---

### 2. Deployment 🚀

**What is it?**
- Manages a set of identical pods
- Ensures desired number of replicas
- Handles rolling updates
- Self-healing (recreates failed pods)

**Analogy:** A deployment is like a **factory manager** ensuring you always have the right number of products

**Example:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3  # Always keep 3 pods running
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: web-app
        image: nginx
```

**Key Points:**
- Maintains desired state (3 replicas = always 3 pods)
- Automatically replaces failed pods
- Enables rolling updates

---

### 3. Service 🌐

**What is it?**
- Stable network endpoint for pods
- Load balances traffic across pods
- Provides service discovery
- Doesn't change even when pods die/restart

**Analogy:** A service is like a **phone number** - it stays the same even if you change phones

**Types:**
```
ClusterIP   → Internal only (default)
NodePort    → External access via node IP:port
LoadBalancer → Cloud load balancer
```

**Example:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080
```

**Key Points:**
- Pods come and go, services stay
- Automatic load balancing
- Service discovery by name

---

### 4. Namespace 📁

**What is it?**
- Virtual cluster within a cluster
- Isolates resources
- Organizes applications

**Analogy:** Like **folders** on your computer

**Example:**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: development
```

**Common namespaces:**
- `default` - Default namespace
- `kube-system` - Kubernetes system components
- `kube-public` - Public resources
- Your custom namespaces

---

### 5. ConfigMap & Secret 🔐

**ConfigMap** - Non-sensitive configuration
**Secret** - Sensitive data (passwords, tokens)

**Analogy:** 
- ConfigMap = **Settings file** (visible)
- Secret = **Password manager** (encrypted)

**Example:**
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
  password: cGFzc3dvcmQxMjM=  # base64 encoded
```

---

## 🎓 Hands-On: Your First Kubernetes Experience!

### Step 1: Verify Kubernetes is Running

```bash
kubectl version --client
```

**Expected output:**
```
Client Version: v1.34.x
```

```bash
kubectl cluster-info
```

**Expected output:**
```
Kubernetes control plane is running at https://kubernetes.docker.internal:6443
```

---

### Step 2: Check Current Context

```bash
kubectl config current-context
```

**Output:** `docker-desktop` (or your cluster name)

```bash
kubectl get nodes
```

**Output:**
```
NAME             STATUS   ROLES           AGE   VERSION
docker-desktop   Ready    control-plane   10d   v1.34.1
```

---

### Step 3: Create Your First Pod! 🎉

Create a file `my-first-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80
```

**Apply it:**
```bash
kubectl apply -f my-first-pod.yaml
```

**Output:**
```
pod/nginx-pod created
```

**Verify:**
```bash
kubectl get pods
```

**Output:**
```
NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          10s
```

**Congratulations! Your first pod is running!** 🎉

---

### Step 4: Explore the Pod

```bash
# Get detailed information
kubectl describe pod nginx-pod

# View logs
kubectl logs nginx-pod

# Execute into the pod
kubectl exec -it nginx-pod -- sh

# Inside the pod:
ls
hostname
exit
```

---

### Step 5: Create a Deployment

Create `my-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
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
        ports:
        - containerPort: 80
```

**Apply it:**
```bash
kubectl apply -f my-deployment.yaml
```

**Watch pods being created:**
```bash
kubectl get pods -w
```

**You'll see 3 pods created!**

---

### Step 6: Expose with a Service

Create `my-service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
```

**Apply it:**
```bash
kubectl apply -f my-service.yaml
```

**Access it:**
```
http://localhost:30080
```

**You should see the Nginx welcome page!** 🎉

---

### Step 7: Scale the Deployment

```bash
# Scale to 5 replicas
kubectl scale deployment nginx-deployment --replicas=5

# Watch it scale
kubectl get pods -w
```

**You'll see 2 more pods being created!**

```bash
# Scale back down
kubectl scale deployment nginx-deployment --replicas=2
```

---

### Step 8: Update the Application (Rolling Update)

```bash
# Update the image
kubectl set image deployment/nginx-deployment nginx=nginx:1.25

# Watch the rolling update
kubectl rollout status deployment/nginx-deployment
```

**What happens:**
- New pods created with new image
- Old pods terminated gradually
- Zero downtime!

---

### Step 9: View Deployment History

```bash
kubectl rollout history deployment/nginx-deployment
```

**Rollback if needed:**
```bash
kubectl rollout undo deployment/nginx-deployment
```

---

### Step 10: Clean Up

```bash
# Delete service
kubectl delete service nginx-service

# Delete deployment
kubectl delete deployment nginx-deployment

# Delete pod
kubectl delete pod nginx-pod

# Or delete everything at once
kubectl delete -f my-first-pod.yaml
kubectl delete -f my-deployment.yaml
kubectl delete -f my-service.yaml
```

---

## 🧪 Practice Exercises

### Exercise 1: Deploy a Multi-Replica App

Create a deployment with 4 replicas of Redis:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-deployment
spec:
  replicas: 4
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:alpine
        ports:
        - containerPort: 6379
```

**Tasks:**
1. Apply the deployment
2. Verify 4 pods are running
3. Scale to 6 replicas
4. Delete one pod manually (watch it recreate!)
5. Clean up

---

### Exercise 2: Create a Namespace

```bash
# Create namespace
kubectl create namespace my-app

# Deploy to specific namespace
kubectl apply -f my-deployment.yaml -n my-app

# List resources in namespace
kubectl get all -n my-app

# Delete namespace (deletes everything in it)
kubectl delete namespace my-app
```

---

### Exercise 3: Use Labels and Selectors

```bash
# Get pods with specific label
kubectl get pods -l app=nginx

# Get pods with multiple labels
kubectl get pods -l app=nginx,version=v1

# Delete pods by label
kubectl delete pods -l app=nginx
```

---

## 📊 Kubernetes Object Hierarchy

```
Cluster
  └── Namespace
        ├── Deployment
        │     └── ReplicaSet
        │           └── Pod
        │                 └── Container(s)
        │
        ├── Service
        │     └── Endpoints (points to pods)
        │
        ├── ConfigMap
        └── Secret
```

**Understanding:**
- **Deployment** creates **ReplicaSet**
- **ReplicaSet** creates **Pods**
- **Service** routes to **Pods**
- You usually work with **Deployments** and **Services**

---

## 🎯 Key Takeaways

### Kubernetes in One Sentence
**Kubernetes automates deploying, scaling, and managing containerized applications across multiple machines.**

### Core Concepts Summary

1. **Pod** = Smallest unit (1+ containers)
2. **Deployment** = Manages pods (desired state)
3. **Service** = Stable network endpoint
4. **Namespace** = Virtual cluster isolation
5. **ConfigMap/Secret** = Configuration management

### Why Kubernetes?

- ✅ **Auto-scaling** - Handle traffic spikes
- ✅ **Self-healing** - Restart failed containers
- ✅ **Rolling updates** - Zero downtime deployments
- ✅ **Load balancing** - Distribute traffic
- ✅ **Service discovery** - Find services by name
- ✅ **Storage orchestration** - Manage persistent data
- ✅ **Multi-cloud** - Run anywhere

### Basic Workflow

```
1. Write YAML manifest
   (Deployment + Service)
   
2. Apply to cluster
   kubectl apply -f app.yaml
   
3. Kubernetes handles
   - Creating pods
   - Load balancing
   - Self-healing
   - Scaling
   
4. Update application
   kubectl set image ...
   
5. Kubernetes does rolling update
   (zero downtime!)
```

---

## ✅ Checkpoint

Before moving forward, make sure you understand:

- [ ] What Kubernetes is and why we use it
- [ ] Difference between Docker and Kubernetes
- [ ] Core concepts: Pod, Deployment, Service
- [ ] How to use kubectl commands
- [ ] How to deploy applications
- [ ] How to scale deployments
- [ ] How to expose services

---

## 🚀 What's Next?

Now that you understand Kubernetes basics, you're ready for:

**Real Workshop Deployment:**
- Deploy multi-container app (App + Redis)
- Use ConfigMaps and Secrets
- Implement health checks
- Set up auto-scaling (HPA)
- Perform rolling updates

```bash
cd ../../step-04-kubernetes
```

---

## 🎯 Quick Reference

```bash
# Cluster info
kubectl cluster-info
kubectl get nodes

# Pods
kubectl get pods
kubectl get pods -o wide
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl exec -it <pod-name> -- sh

# Deployments
kubectl get deployments
kubectl describe deployment <name>
kubectl scale deployment <name> --replicas=5
kubectl rollout status deployment/<name>
kubectl rollout history deployment/<name>
kubectl rollout undo deployment/<name>

# Services
kubectl get services
kubectl describe service <name>

# Apply/Delete
kubectl apply -f <file.yaml>
kubectl delete -f <file.yaml>
kubectl delete pod <name>
kubectl delete deployment <name>

# Namespaces
kubectl get namespaces
kubectl get pods -n <namespace>
kubectl create namespace <name>

# Everything in namespace
kubectl get all -n <namespace>
kubectl delete namespace <namespace>

# Watch resources
kubectl get pods -w
kubectl get pods --watch
```

---

## 🔍 Common kubectl Patterns

```bash
# Get resources
kubectl get <resource>              # List
kubectl get <resource> <name>       # Specific
kubectl get <resource> -o wide      # More details
kubectl get <resource> -o yaml      # YAML format
kubectl get <resource> -o json      # JSON format

# Describe (detailed info)
kubectl describe <resource> <name>

# Create/Update
kubectl apply -f <file>
kubectl create -f <file>

# Delete
kubectl delete <resource> <name>
kubectl delete -f <file>

# Logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>          # Follow
kubectl logs <pod-name> -c <container>  # Specific container

# Execute
kubectl exec <pod-name> -- <command>
kubectl exec -it <pod-name> -- sh

# Port forwarding
kubectl port-forward <pod-name> 8080:80
kubectl port-forward svc/<service> 8080:80
```

---

**Congratulations!** You now understand Kubernetes fundamentals! ☸️

Ready to deploy real applications? Let's go to the workshop! 🚀
