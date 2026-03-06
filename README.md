# 🐳 Docker & Kubernetes Hands-On Workshop

> **Duration:** 2 hours | **Level:** Beginner → Intermediate  
> **Prerequisites:** Basic command line knowledge, Node.js installed

---

## 📋 Prerequisites — Install These Before the Session

| Tool | Download | Verify |
|------|----------|--------|
| **Node.js 20+** | https://nodejs.org | `node --version` |
| **Docker Desktop** | https://www.docker.com/products/docker-desktop | `docker --version` |
| **Minikube** | https://minikube.sigs.k8s.io/docs/start | `minikube version` |
| **kubectl** | https://kubernetes.io/docs/tasks/tools | `kubectl version --client` |
| **Docker Hub account** | https://hub.docker.com (free signup) | — |

> 💡 **Windows users:** Make sure Docker Desktop is running before starting.

---

## 🗂️ Project Structure

```
docker_kubernetes/
├── step-01-plain-app/        ← Run the app locally without Docker
│   ├── app.js
│   └── package.json
│
├── step-02-dockerize/        ← Containerize with Docker + docker-compose
│   ├── app.js
│   ├── package.json
│   ├── Dockerfile
│   ├── .dockerignore
│   └── docker-compose.yml
│
├── step-03-push-to-hub/      ← Push your image to Docker Hub
│   └── push-instructions.sh
│
├── step-04-kubernetes/       ← Deploy to Kubernetes
│   ├── 01-namespace.yaml
│   ├── 02-configmap.yaml
│   ├── 03-secret.yaml
│   ├── 04-redis-deployment.yaml
│   ├── 05-redis-service.yaml
│   ├── 06-app-deployment.yaml
│   ├── 07-app-service.yaml
│   └── 08-hpa.yaml
│
├── step-05-advanced/         ← Rolling updates, scaling, debugging
│   ├── app-v2.js
│   ├── Dockerfile.v2
│   ├── package.json
│   ├── rolling-update-deployment.yaml
│   └── commands-reference.sh
│
├── cheatsheet.md             ← All commands in one place
└── README.md                 ← This file
```

---

## ⏱️ Session Timeline

| Time | Step | Topic |
|------|------|-------|
| 0:00 – 0:15 | Step 1 | Run plain Node.js app locally |
| 0:15 – 0:40 | Step 2 | Write Dockerfile, build image, docker-compose |
| 0:40 – 0:50 | Step 3 | Push image to Docker Hub |
| 0:50 – 1:20 | Step 4 | Deploy to Kubernetes (namespaces, deployments, services) |
| 1:20 – 1:45 | Step 5 | Scale, rolling updates, rollback, debug |
| 1:45 – 2:00 | Wrap-up | Cleanup + Q&A |

---

---

## 🟢 Step 1 — Run the App Locally (No Docker)

**Goal:** Understand what we're going to containerize.

```bash
cd step-01-plain-app
npm install
npm start
```

Now open: http://localhost:3000

**Try these endpoints:**
- `GET /`       → JSON response with visit counter
- `GET /health` → Health check
- `GET /info`   → Node.js process info

**Key observation:** Notice the `hostname` field in the response. This is your machine name.  
Later, when running in Kubernetes with multiple replicas, each pod will have a different hostname — this is how you'll see load balancing in action.

**Stop the app:** `Ctrl+C`

---

## 🐳 Step 2 — Dockerize the App

**Goal:** Package the app into a Docker image and run it with docker-compose.

```bash
cd ../step-02-dockerize
```

### 2a — Understand the Dockerfile

Open `Dockerfile` and read through it. Key concepts:
- **Multi-stage build** — keeps the final image small
- **Layer caching** — `COPY package*.json ./` before `COPY app.js` so npm install is cached
- **Non-root user** — `USER node` for security

### 2b — Build your first Docker image

```bash
docker build -t docker-k8s-workshop:v1 .
```

Inspect what was built:
```bash
docker images docker-k8s-workshop
```

### 2c — Run just the app container (no Redis yet)

```bash
docker run -d -p 3000:3000 --name workshop-app docker-k8s-workshop:v1
```

- Open http://localhost:3000
- Notice the `hostname` is now a **container ID**, not your machine name!

```bash
docker logs workshop-app          # View logs
docker exec -it workshop-app sh   # Shell inside the container
# Inside container:
ls /app
cat /etc/os-release
exit
```

Stop and remove the container:
```bash
docker stop workshop-app
docker rm workshop-app
```

### 2d — Run with docker-compose (App + Redis together)

```bash
docker compose up --build
```

Open http://localhost:3000 — the visit counter now persists in Redis!  
Refresh several times and watch the `visits` count increase.

```bash
# In a new terminal — inspect running services
docker compose ps
docker compose logs redis
```

Stop everything:
```bash
docker compose down
```

> 💡 **Discuss:** What does `depends_on`, `healthcheck`, `volumes`, and `networks` do in `docker-compose.yml`?

---

## 📦 Step 3 — Push Your Image to Docker Hub

**Goal:** Share your image so Kubernetes can pull it.

```bash
cd ../step-03-push-to-hub
```

> 💡 If you don't have a Docker Hub account, create one at https://hub.docker.com

```bash
# 1. Login
docker login

# 2. Tag the image with your username (replace YOUR_USERNAME)
docker tag docker-k8s-workshop:v1 YOUR_USERNAME/docker-k8s-workshop:v1
docker tag docker-k8s-workshop:v1 YOUR_USERNAME/docker-k8s-workshop:latest

# 3. Push
docker push YOUR_USERNAME/docker-k8s-workshop:v1
docker push YOUR_USERNAME/docker-k8s-workshop:latest
```

Verify at: `https://hub.docker.com/r/YOUR_USERNAME/docker-k8s-workshop`

> ⚠️ **Important:** You'll need your Docker Hub username in Step 4. Replace  
> `YOUR_DOCKERHUB_USERNAME` in `step-04-kubernetes/06-app-deployment.yaml` with your actual username.

---

## ☸️ Step 4 — Deploy to Kubernetes

**Goal:** Run the same app in a Kubernetes cluster with proper orchestration.

### 4a — Start Minikube

```bash
minikube start --driver=docker
minikube status
```

Open the Kubernetes dashboard (optional, great visual):
```bash
minikube dashboard
```

### 4b — Update the image name

Open `step-04-kubernetes/06-app-deployment.yaml` and replace:
```yaml
image: YOUR_DOCKERHUB_USERNAME/docker-k8s-workshop:v1
```
with your actual Docker Hub username.

### 4c — Apply all Kubernetes manifests

```bash
cd ../step-04-kubernetes

# Apply them in order
kubectl apply -f 01-namespace.yaml
kubectl apply -f 02-configmap.yaml
kubectl apply -f 03-secret.yaml
kubectl apply -f 04-redis-deployment.yaml
kubectl apply -f 05-redis-service.yaml
kubectl apply -f 06-app-deployment.yaml
kubectl apply -f 07-app-service.yaml
```

Or apply everything at once:
```bash
kubectl apply -f .
```

### 4d — Watch everything come up

```bash
# Watch pods start (Ctrl+C to stop watching)
kubectl get pods -n workshop -w
```

Wait until all pods show `Running`:
```
NAME                            READY   STATUS    RESTARTS
redis-xxxx                      1/1     Running   0
workshop-app-xxxx-yyyy          1/1     Running   0
workshop-app-xxxx-zzzz          1/1     Running   0
```

### 4e — Access the application

```bash
minikube service workshop-app-service -n workshop
```

This opens the app in your browser!

**Alternative (port-forward):**
```bash
kubectl port-forward svc/workshop-app-service 8080:80 -n workshop
# Open: http://localhost:8080
```

### 4f — Explore what was created

```bash
kubectl get all -n workshop                          # Everything at once
kubectl describe deployment workshop-app -n workshop # Deployment details
kubectl describe service workshop-app-service -n workshop
```

**Look at the ConfigMap and Secret in action:**
```bash
kubectl get configmap app-config -n workshop -o yaml
kubectl get secret app-secret -n workshop -o yaml
# Decode the secret:
kubectl get secret app-secret -n workshop -o jsonpath='{.data.DB_PASSWORD}' | base64 --decode
```

> 💡 **Concepts introduced:** Namespace, Deployment, ReplicaSet, Pod, Service (NodePort), ConfigMap, Secret, health probes

---

## ⚡ Step 5 — Scaling, Rolling Updates & Debugging

### 5a — Manual Scaling

```bash
# Scale up to 5 replicas
kubectl scale deployment workshop-app --replicas=5 -n workshop

# Watch pods come up
kubectl get pods -n workshop -w
```

Now hit the app endpoint multiple times:
```bash
# In a loop to see different hostnames (different pods handling requests)
for i in {1..10}; do curl http://$(minikube ip):30080; echo ""; done
```

Notice **different `hostname` values** — that's Kubernetes load balancing across your 5 pods!

Scale back:
```bash
kubectl scale deployment workshop-app --replicas=2 -n workshop
```

### 5b — Rolling Update to v2 (Zero Downtime)

First, build and push v2:
```bash
cd ../step-05-advanced

docker build -t YOUR_USERNAME/docker-k8s-workshop:v2 -f Dockerfile.v2 .
docker push YOUR_USERNAME/docker-k8s-workshop:v2
```

Update the image name in `rolling-update-deployment.yaml`, then apply:
```bash
kubectl apply -f rolling-update-deployment.yaml
```

Watch the rolling update in real-time (open a second terminal):
```bash
kubectl rollout status deployment/workshop-app -n workshop
kubectl get pods -n workshop -w
```

Notice: old pods terminate one at a time, new ones start up. **Zero downtime!**

Verify v2 is running — the response now includes a `color` field and `new_feature` message.

### 5c — Rollback

```bash
kubectl rollout history deployment/workshop-app -n workshop

# Rollback to the previous version instantly
kubectl rollout undo deployment/workshop-app -n workshop

# Verify it's back to v1
kubectl rollout status deployment/workshop-app -n workshop
```

### 5d — Horizontal Pod Autoscaler (HPA)

```bash
kubectl apply -f ../step-04-kubernetes/08-hpa.yaml

# Watch the HPA
kubectl get hpa -n workshop -w
```

Simulate traffic load to trigger autoscaling:
```bash
kubectl run load-test --image=busybox -it --rm -n workshop \
  -- sh -c "while true; do wget -q -O- http://workshop-app-service/; done"
```

Watch the pod count automatically increase in another terminal:
```bash
kubectl get pods -n workshop -w
```

Stop the load test with `Ctrl+C` and watch pods scale back down.

### 5e — Debugging a Pod

```bash
# Get pod name
kubectl get pods -n workshop

# View logs
kubectl logs <pod-name> -n workshop

# Stream live logs
kubectl logs -f <pod-name> -n workshop

# Shell into a running pod
kubectl exec -it <pod-name> -n workshop -- sh

# Inside the pod:
wget -q -O- http://localhost:3000/health
wget -q -O- http://redis-service:6379  # test redis connectivity
exit
```

---

## 🧹 Cleanup

```bash
# Delete everything in the workshop namespace
kubectl delete namespace workshop

# Stop minikube
minikube stop

# Optional: delete the minikube cluster entirely
minikube delete
```

---

## 📚 Key Concepts Recap

| Concept | What it does |
|---------|-------------|
| **Docker Image** | Packaged app + runtime environment |
| **Docker Container** | Running instance of an image |
| **Dockerfile** | Recipe to build an image |
| **docker-compose** | Run multi-container apps locally |
| **Namespace** | Logical isolation within a cluster |
| **Pod** | Smallest deployable unit (1+ containers) |
| **Deployment** | Manages desired replica count, rolling updates |
| **ReplicaSet** | Ensures N pods are always running |
| **Service** | Stable network endpoint for a set of pods |
| **ConfigMap** | Non-sensitive configuration as key-value pairs |
| **Secret** | Sensitive data (passwords, keys) stored encoded |
| **HPA** | Automatically scales pods based on CPU/memory |
| **Rolling Update** | Deploy new version with zero downtime |

---

## 🔗 Further Learning

- [Docker Docs](https://docs.docker.com)
- [Kubernetes Docs](https://kubernetes.io/docs)
- [Play with Docker](https://labs.play-with-docker.com) — free browser-based Docker playground
- [Play with Kubernetes](https://labs.play-with-k8s.com) — free browser-based K8s playground
- [Lens](https://k8slens.dev) — great Kubernetes desktop GUI
