# ─────────────────────────────────────────────
# Stage 1: Builder
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (layer caching — only reinstalls if these change)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# ─────────────────────────────────────────────
# Stage 2: Runtime (smaller final image)
# ─────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Copy installed node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY app.js .

# Document the port the app listens on
EXPOSE 3000

# Run as non-root user (security best practice)
USER node

# Start the application
CMD ["node", "app.js"]
