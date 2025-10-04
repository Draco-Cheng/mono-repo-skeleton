# Backend (FastAPI) – Nx Monorepo Example

This is the backend application for the Nx monorepo, built with [FastAPI](https://fastapi.tiangolo.com/) and Python. It provides a RESTful API that integrates with the Next.js frontend and follows modern Python development best practices.

---

## Features

- **FastAPI** - Modern, fast web framework for building APIs
- **Python 3.10+** with type hints and modern syntax
- **Comprehensive Testing** with pytest + pytest-asyncio + httpx
- **Dependency Management** via pyproject.toml (PEP 621)
- **Docker Support** with optimized containerization
- **Kubernetes Ready** with deployment configurations
- **Nx Integration** for monorepo management
- **API Convention** - All endpoints prefixed with `/api`

---

## Project Structure

```
apps/backend/
├── main.py           # FastAPI application entry point
├── config.py         # Centralized configuration (API_PREFIX)
├── pyproject.toml    # Python dependencies and build config
├── project.json      # Nx targets for build/serve/test
├── pytest.ini       # pytest configuration
├── tests/            # Test suite
│   ├── __init__.py   # Test package initialization
│   └── test_main.py  # API endpoint tests
├── Dockerfile        # Container configuration
├── .dockerignore     # Docker ignore patterns
└── README.md         # This file
```

---

## Development

### 1. Install dependencies

From the monorepo root:
```sh
npx nx build backend
```

### 2. Start the backend

From the monorepo root:
```sh
npx nx serve backend
```

The API will be available at [http://localhost:8000](http://localhost:8000).

### 3. API Documentation

FastAPI automatically generates interactive API documentation:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## Testing

### Test Commands

```bash
# Run tests via Nx (recommended)
nx test backend

# Run tests directly
cd apps/backend
python -m pytest

# Run tests with verbose output
python -m pytest -v
```

### Test Configuration

- **pytest** - Core testing framework
- **pytest-asyncio** - Async test support
- **httpx** - HTTP client for testing FastAPI endpoints
- **pytest.ini** - Test discovery and default options

### Test Structure

- **Test Files**: Located in `tests/` directory
- **Test Discovery**: Automatically finds `test_*.py` files
- **Naming Convention**: `test_<module_name>.py`
- **Test Classes**: `Test<ClassName>` for organization

---

## API Endpoints

### Current Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/ping` | Health check endpoint | `{"result": "pong"}` |

### Adding New Endpoints

1. **Define the endpoint** in `main.py` or separate modules
2. **Use the API prefix** from `config.py`: `API_PREFIX = "/api"`
3. **Add type hints** for request/response models
4. **Write tests** in the `tests/` directory
5. **Update documentation** with proper docstrings

---

## Configuration

### Environment Variables

- **API_PREFIX**: Set to `/api` for all endpoints
- **Port**: Default 8000 (configurable via uvicorn)

### Dependencies

Core dependencies are managed in `pyproject.toml`:
- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **pytest**: Testing framework
- **pytest-asyncio**: Async test support
- **httpx**: HTTP client for testing

---

## Docker

### Build and Run

```bash
# Build the image
docker build -t backend .

# Run the container
docker run -p 8000:8000 backend

# Or use docker-compose from root
docker-compose up backend
```

### Dockerfile Features

- Multi-stage build for optimization
- Python 3.10+ base image
- Production-ready configuration
- Health check endpoint support

---

## Nx Integration

### Available Targets

- **`nx build backend`** - Install Python dependencies
- **`nx serve backend`** - Start development server
- **`nx test backend`** - Run pytest tests

### Cross-Platform Commands

All commands are now cross-platform compatible through Nx:
- **`nx build backend`** - Install dependencies
- **`nx serve backend`** - Start development server
- **`nx test backend`** - Run tests

---

## Best Practices

### Code Quality

- Use Python type hints for all functions
- Follow PEP 8 style guidelines
- Write comprehensive docstrings
- Keep functions small and focused

### Testing

- Test both success and error cases
- Use descriptive test names
- Mock external dependencies
- Maintain high test coverage

### API Design

- Use consistent endpoint naming
- Implement proper error handling
- Return structured JSON responses
- Follow RESTful conventions

---

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [pytest Documentation](https://docs.pytest.org/)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)
- [PEP 621 - pyproject.toml](https://peps.python.org/pep-0621/)
- [Nx Documentation](https://nx.dev)
- [Docker Documentation](https://docs.docker.com/)