#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Step 5: Advanced Kubernetes Commands Reference
# Run these one at a time during the workshop demo
# ─────────────────────────────────────────────────────────────

# ── SCALING ─────────────────────────────────────────────────

# Manually scale up to 5 replicas
kubectl scale deployment workshop-app --replicas=5 -n workshop

# Watch pods come up in real time
kubectl get pods -n workshop -w

# Scale back down
kubectl scale deployment workshop-app --replicas=2 -n workshop


# ── ROLLING UPDATE ──────────────────────────────────────────

# Apply the v2 deployment (image updated to :v2)
kubectl apply -f rolling-update-deployment.yaml

# Watch the rolling update in real time (open a second terminal)
kubectl rollout status deployment/workshop-app -n workshop

# See history of rollouts
kubectl rollout history deployment/workshop-app -n workshop

# !! Something went wrong? ROLLBACK instantly !!
kubectl rollout undo deployment/workshop-app -n workshop

# Rollback to a specific revision
kubectl rollout undo deployment/workshop-app --to-revision=1 -n workshop


# ── INSPECT & DEBUG ─────────────────────────────────────────

# List all resources in the workshop namespace
kubectl get all -n workshop

# Describe a deployment (events, conditions, config)
kubectl describe deployment workshop-app -n workshop

# Describe a specific pod
kubectl describe pod <pod-name> -n workshop

# View logs from a pod
kubectl logs <pod-name> -n workshop

# Stream logs live
kubectl logs -f <pod-name> -n workshop

# Exec into a running container
kubectl exec -it <pod-name> -n workshop -- sh

# Port-forward to test without a service
kubectl port-forward deployment/workshop-app 8080:3000 -n workshop


# ── CONFIGMAP & SECRET ──────────────────────────────────────

# Update a configmap value
kubectl edit configmap app-config -n workshop

# View secret values (base64 decoded)
kubectl get secret app-secret -n workshop -o jsonpath='{.data.DB_PASSWORD}' | base64 --decode

# ── HORIZONTAL POD AUTOSCALER ───────────────────────────────

# Apply HPA
kubectl apply -f ../step-04-kubernetes/08-hpa.yaml

# Watch HPA status
kubectl get hpa -n workshop -w

# Simulate load (in a separate terminal) to trigger autoscaling
kubectl run load-test --image=busybox -it --rm -n workshop -- \
  sh -c "while true; do wget -q -O- http://workshop-app-service/; done"


# ── CLEANUP ─────────────────────────────────────────────────

# Delete everything in the namespace
kubectl delete namespace workshop
