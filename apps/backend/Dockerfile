# Backend Dockerfile for FastAPI (development)
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install pip and setuptools
RUN pip install --upgrade pip setuptools

# Copy pyproject.toml and install dependencies
COPY pyproject.toml ./
RUN pip install .

# Copy the rest of the source code
COPY . .

# Expose FastAPI default port
EXPOSE 8000

# Start FastAPI app with reload for development
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]