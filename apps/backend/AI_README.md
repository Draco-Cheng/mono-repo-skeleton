# AI_README: Backend (FastAPI) Conventions & Index

This file is for AI assistants and future contributors.  
It describes the architecture, conventions, and best practices for the backend app.

---

## Framework & Stack

- **Framework:** FastAPI
- **Language:** Python 3.11+ (`tomllib` is stdlib only from 3.11; a lower `requires-python` makes ruff sort it as third-party)
- **Dependency Management:** `pyproject.toml` (PEP 621), `uv` (dev + CI + Docker image all install from `uv.lock` — `pip install .` re-resolves independently and silently drifts; see `tests/test_production_dependencies.py`)
- **Virtual Environment:** `.venv` (auto-created by scripts)
- **API Convention:** All endpoints are prefixed with `/api` (see `config.py`)
- **Scripts:** Use root-level scripts for install/start (`scripts/`)
- **Testing:** pytest + pytest-asyncio + httpx

---

## Conventions

- API prefix: import from `config.py` for all route definitions — never hardcode `/api`.
- EVERY nx target goes through `uv` (`uv sync` / `uv run`) — a bare `pip install` or `python` resolves against system Python, not `.venv`, so it silently ignores `uv.lock` and can run a Python below the floor.

---

## Application-level Logic

- Place all config in `config.py`.
- Keep business logic in separate modules as the project grows.
- Use FastAPI's dependency injection for shared logic/services.
- Write tests for all new endpoints and business logic.

---

## API Endpoints

### Current Endpoints
- **GET /api/ping**: Health check endpoint, returns `{"result": "pong"}`

### Adding New Endpoints
- All endpoints must use the `/api` prefix from `config.py`
- Include comprehensive tests in `tests/` directory
- Use proper type hints and docstrings
- Follow RESTful conventions

---

## AI Usage

- Reference this file for conventions, structure, and best practices when using GPT or other AI tools.
- Follow the FastAPI and Python conventions described here.
- When adding new endpoints, ensure they follow the `/api` prefix convention.
- Always include tests for new functionality.
- Use the established project structure and naming conventions.
