# Part 6: Multi-Container Applications 🐘

> **Goal:** Run an app with a PostgreSQL database using Docker networks!

## What You'll Learn
- How to run multiple containers together
- Docker networks for container communication
- Environment variables for configuration
- Connecting app to database

## Quick Start

```bash
# Create network
docker network create myapp-net

# Run PostgreSQL
docker run -d --name db --network myapp-net \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=myapp \
  postgres:15-alpine

# Run app (build from part-06 folder with app.py)
docker build -t multiapp .
docker run -d --name app --network myapp-net \
  -p 5000:5000 \
  -e DB_HOST=db \
  -e DB_PASS=secret \
  multiapp
```

Open http://localhost:5000

## Key Concepts
- Containers on same network can talk by name
- Use environment variables for config
- Database persists in container (use volumes in production)

## Cleanup
```bash
docker rm -f app db
docker network rm myapp-net
```

**Next:** Part 7 - Docker Compose makes this much easier!
