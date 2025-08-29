# AI_README: Backend (FastAPI) Conventions & Index

This file is for AI assistants and future contributors.  
It describes the architecture, conventions, and best practices for the backend app.

---

## Framework & Stack

- **Framework:** FastAPI
- **Language:** Python 3.10+
- **Dependency Management:** `pyproject.toml` (PEP 621), `uv` or `pip`
- **Virtual Environment:** `.venv` (auto-created by scripts)
- **API Convention:** All endpoints are prefixed with `/api` (see `config.py`)
- **Scripts:** Use root-level scripts for install/start (`scripts/`)
- **Testing:** pytest + pytest-asyncio + httpx

---

## Directory Structure

```
apps/backend/
├── main.py           # FastAPI app entrypoint
├── config.py         # Centralized backend config (API_PREFIX, etc.)
├── pyproject.toml    # Python project metadata and dependencies
├── project.json      # Nx targets for build/serve/test
├── pytest.ini       # pytest configuration
├── tests/            # Test suite
├── Dockerfile        # Container configuration
└── .dockerignore     # Docker ignore patterns
```

---

## Conventions

- **API Prefix:** Import from `config.py` for all route definitions.
- **Type Hints:** Use Python type hints for all function signatures and API responses.
- **Project Metadata:** Use `pyproject.toml` for dependencies and project info.
- **Scripts:** Use root-level batch scripts for install/start to ensure venv is activated.
- **Nx Integration:** Nx targets in `project.json` call scripts for build/serve/test.
- **Testing:** Follow pytest conventions, use descriptive test names, test both success and error cases.

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
