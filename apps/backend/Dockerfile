# Backend Dockerfile for FastAPI
# Build context: apps/backend/
FROM python:3.11-slim AS base

WORKDIR /app

# Dependencies come from uv.lock, NOT a fresh `pip install .` resolve.
#
# `pip install .` resolves independently of the lock CI and every developer
# uses, and the two drift whenever an upstream package changes HOW it declares
# a dependency -- e.g. SQLAlchemy 2.0.49 moved `greenlet` behind a
# `platform_machine` marker; a bare `sqlalchemy>=2.0.0` then resolves without
# it even though `uv.lock` pins it. The failure shows up at import time in
# production, not in CI, since CI installs from the same lock everyone else
# does.
#
# `--frozen` fails the build if the lock is stale against pyproject.toml,
# rather than silently re-resolving. `--no-dev` excludes the dev extra.
# `--no-install-project` because the app is not installed as a package here --
# the source tree is COPYed in below and run from /app directly; without it uv
# needs the source present, defeating the dependency layer-cache split.
#
# Pin must not fall behind the uv that WRITES uv.lock: a lock with
# `revision = 2` is rejected by older uv versions.
COPY --from=ghcr.io/astral-sh/uv:0.7.19 /uv /usr/local/bin/uv

ENV UV_PROJECT_ENVIRONMENT=/usr/local \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

# Copy dependency manifests first (for layer caching).
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

# Production stage
FROM base AS production

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
