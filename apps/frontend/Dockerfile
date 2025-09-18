# Frontend Dockerfile for Next.js
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Development stage (for docker-compose)
FROM base AS development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage (for CI/CD)
FROM base AS production
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]