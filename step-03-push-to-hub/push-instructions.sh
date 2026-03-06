#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Step 3: Tag and Push your image to Docker Hub
# ─────────────────────────────────────────────────────────────
# Replace YOUR_DOCKERHUB_USERNAME with your actual Docker Hub username

DOCKERHUB_USERNAME="YOUR_DOCKERHUB_USERNAME"
IMAGE_NAME="docker-k8s-workshop"
VERSION="v1"

echo "==> Step 1: Login to Docker Hub"
docker login

echo ""
echo "==> Step 2: Build the image (skip if already built in step-02)"
docker build -t ${IMAGE_NAME}:${VERSION} ../step-02-dockerize/

echo ""
echo "==> Step 3: Tag the image with your Docker Hub username"
docker tag ${IMAGE_NAME}:${VERSION} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}
docker tag ${IMAGE_NAME}:${VERSION} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest

echo ""
echo "==> Step 4: Push to Docker Hub"
docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}
docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest

echo ""
echo "==> Step 5: Verify — pull it on another machine"
echo "    docker pull ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}"
echo "    docker run -p 3000:3000 ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}"

echo ""
echo "✅ Done! Your image is now publicly available at:"
echo "   https://hub.docker.com/r/${DOCKERHUB_USERNAME}/${IMAGE_NAME}"
