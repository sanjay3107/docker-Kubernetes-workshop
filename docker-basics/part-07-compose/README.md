# Part 7: Docker Compose 🎼

> **Goal:** Orchestrate multi-container apps with one command!

## What is Docker Compose?
Define multi-container apps in YAML, start everything with `docker compose up`

## Quick Start
```bash
# Start everything
docker compose up -d

# View logs
docker compose logs -f

# Stop everything
docker compose down
```

## Key Features
- One file defines entire stack
- Automatic network creation
- Dependency management
- Easy scaling

## Commands
```bash
docker compose up -d          # Start
docker compose ps             # List services
docker compose logs app       # View logs
docker compose restart app    # Restart service
docker compose down -v        # Stop and remove volumes
```

**This is the modern way to run Docker apps!** 🎉
