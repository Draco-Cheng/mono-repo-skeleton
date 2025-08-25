# Frontend Dockerfile for Next.js (development)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]