# 🐳 Docker & Kubernetes Cheatsheet

## Docker

### Images
```bash
docker build -t myapp:v1 .            # Build image from Dockerfile
docker build -t myapp:v1 -f Dockerfile.v2 .  # Use specific Dockerfile
docker images                          # List local images
docker rmi myapp:v1                    # Remove image
docker pull nginx:alpine               # Pull from Docker Hub
docker push username/myapp:v1          # Push to Docker Hub
```

### Containers
```bash
docker run -p 3000:3000 myapp:v1               # Run (foreground)
docker run -d -p 3000:3000 myapp:v1            # Run (detached/background)
docker run -d -p 3000:3000 -e PORT=3000 myapp  # With env variable
docker run -d -p 3000:3000 --name my-container myapp  # Named container
docker ps                                       # List running containers
docker ps -a                                    # List ALL containers
docker stop my-container                        # Stop container
docker rm my-container                          # Remove container
docker logs my-container                        # View logs
docker logs -f my-container                     # Stream logs
docker exec -it my-container sh                 # Shell into container
docker inspect my-container                     # Full JSON details
```

### Docker Compose
```bash
docker compose up                     # Start all services (foreground)
docker compose up -d                  # Start all services (detached)
docker compose up --build             # Rebuild images then start
docker compose down                   # Stop and remove containers
docker compose down -v                # Also remove volumes
docker compose ps                     # List services
docker compose logs -f app            # Stream logs for a service
docker compose restart app            # Restart a single service
```

### Cleanup
```bash
docker system prune                   # Remove unused containers, images, networks
docker system prune -a                # Also remove unused images
docker volume prune                   # Remove unused volumes
```

---

## Kubernetes (kubectl)

### Cluster Info
```bash
kubectl cluster-info                  # Cluster endpoint info
kubectl get nodes                     # List cluster nodes
kubectl get nodes -o wide             # With IP and OS info
```

### Namespaces
```bash
kubectl get namespaces                # List all namespaces
kubectl create namespace workshop     # Create namespace
kubectl config set-context --current --namespace=workshop  # Set default NS
```

### Apply / Delete
```bash
kubectl apply -f file.yaml            # Create or update resource
kubectl apply -f ./k8s/               # Apply all YAMLs in a folder
kubectl delete -f file.yaml           # Delete resource from file
kubectl delete namespace workshop     # Delete namespace (and everything in it)
```

### Pods
```bash
kubectl get pods -n workshop          # List pods
kubectl get pods -n workshop -w       # Watch pods (live)
kubectl get pods -n workshop -o wide  # With node placement
kubectl describe pod <pod> -n workshop  # Full details + events
kubectl logs <pod> -n workshop        # View logs
kubectl logs -f <pod> -n workshop     # Stream logs
kubectl exec -it <pod> -n workshop -- sh  # Shell into pod
kubectl delete pod <pod> -n workshop  # Delete (will be recreated by Deployment)
```

### Deployments
```bash
kubectl get deployments -n workshop
kubectl describe deployment workshop-app -n workshop
kubectl scale deployment workshop-app --replicas=5 -n workshop
kubectl set image deployment/workshop-app workshop-app=myimage:v2 -n workshop
kubectl rollout status deployment/workshop-app -n workshop
kubectl rollout history deployment/workshop-app -n workshop
kubectl rollout undo deployment/workshop-app -n workshop
kubectl rollout undo deployment/workshop-app --to-revision=1 -n workshop
```

### Services
```bash
kubectl get services -n workshop
kubectl describe service workshop-app-service -n workshop
# Access app in minikube:
minikube service workshop-app-service -n workshop
# Port-forward for quick testing:
kubectl port-forward svc/workshop-app-service 8080:80 -n workshop
```

### ConfigMaps & Secrets
```bash
kubectl get configmap -n workshop
kubectl describe configmap app-config -n workshop
kubectl get secret -n workshop
# Decode a secret value:
kubectl get secret app-secret -n workshop -o jsonpath='{.data.DB_PASSWORD}' | base64 --decode
```

### Horizontal Pod Autoscaler
```bash
kubectl get hpa -n workshop
kubectl get hpa -n workshop -w        # Watch HPA live
```

### All Resources at Once
```bash
kubectl get all -n workshop
```

---

## Minikube Quick Reference
```bash
minikube start                        # Start local cluster
minikube start --driver=docker        # Use Docker as driver
minikube stop                         # Stop cluster
minikube delete                       # Delete cluster
minikube status                       # Cluster status
minikube dashboard                    # Open browser dashboard
minikube service <svc> -n workshop    # Open service in browser
minikube tunnel                       # Expose LoadBalancer services
eval $(minikube docker-env)           # Use minikube's Docker daemon
```

---

## Base64 Encode/Decode (for Secrets)
```bash
echo -n "mypassword" | base64         # Encode
echo "bXlwYXNzd29yZA==" | base64 --decode  # Decode
```
