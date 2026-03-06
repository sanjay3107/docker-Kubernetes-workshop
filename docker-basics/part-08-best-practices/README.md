# Part 8: Best Practices 🏆

## Dockerfile Best Practices

### ✅ Use Specific Tags
```dockerfile
FROM python:3.9-slim  # Good
FROM python:latest    # Bad - unpredictable
```

### ✅ Multi-Stage Builds
```dockerfile
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]
```

### ✅ Layer Caching
```dockerfile
# Copy dependencies first
COPY package.json .
RUN npm install
# Copy code last (changes often)
COPY . .
```

### ✅ Minimize Layers
```dockerfile
# Good - one RUN
RUN apt-get update && apt-get install -y curl git

# Bad - multiple RUN
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
```

### ✅ Use .dockerignore
```
node_modules
.git
*.log
.env
```

### ✅ Run as Non-Root
```dockerfile
RUN adduser --disabled-password appuser
USER appuser
```

### ✅ Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
```

## Security Best Practices
- Don't include secrets in images
- Scan images for vulnerabilities
- Use official base images
- Keep images updated
- Minimize attack surface

## Production Checklist
- [ ] Use specific version tags
- [ ] Multi-stage builds for smaller images
- [ ] Run as non-root user
- [ ] Add health checks
- [ ] Use .dockerignore
- [ ] Scan for vulnerabilities
- [ ] Document environment variables
- [ ] Use secrets management
- [ ] Set resource limits
- [ ] Enable logging

**Congratulations! You've completed the Docker basics tutorial!** 🎉
