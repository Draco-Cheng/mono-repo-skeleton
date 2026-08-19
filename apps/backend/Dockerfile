# Backend Dockerfile for FastAPI
# Build context: apps/backend/
FROM python:3.11-slim AS base

WORKDIR /app

RUN pip install --upgrade pip setuptools

# Copy and install dependencies first (for layer caching)
COPY pyproject.toml .
RUN pip install --no-cache-dir .

# Production stage
FROM base AS production

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
