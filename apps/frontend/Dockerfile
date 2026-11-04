# Frontend Dockerfile for Next.js
# syntax=docker/dockerfile:1
#
# Node pinned to an exact patch so a stale local/CI tag cache cannot ship a
# runtime missing a security fix. Floor: 22.23.4 (CVE-2026-111497, Brotli
# decoder RCE). Node 20 is EOL and never received that fix. Keep the base and
# production stages on the same tag.
FROM node:22.23.4-alpine AS base
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json ./
COPY package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the source code
COPY . .

# Development stage (for docker-compose)
FROM base AS development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm run build

# Production stage - Next.js standalone server
FROM node:22.23.4-alpine AS production
WORKDIR /app

# Owned by the unprivileged `node` user (uid 1000, shipped with the image):
# the Next.js server writes its image/fetch cache under .next/cache at runtime.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
# Numeric uid, not the name: Kubernetes `runAsNonRoot` can only verify a
# numeric USER and rejects the pod otherwise.
USER 1000:1000
CMD ["node", "server.js"]
