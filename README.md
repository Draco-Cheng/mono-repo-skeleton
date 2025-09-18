# MonoRepoSkeleton

## Monorepo Workspace (Nx + TypeScript + Python)

This project is an Nx-managed monorepo supporting both TypeScript/Node.js and Python, suitable for modern full-stack, API, and library development with comprehensive testing setup.

---

## 🏗️ Project Structure

```
mono-repo-skeleton/
├── apps/
│   ├── backend/                # FastAPI Python backend (API server)
│   │   ├── main.py            # FastAPI application entry point
│   │   ├── pyproject.toml     # Python dependencies & build config
│   │   ├── project.json       # Nx targets for backend
│   │   ├── pytest.ini         # pytest configuration
│   │   └── tests/             # Python unit tests
│   │       ├── __init__.py
│   │       └── test_main.py   # API endpoint tests
│   └── frontend/               # Next.js frontend (TypeScript/React)
│       ├── src/
│       │   ├── app/           # Next.js app router
│       │   ├── components/    # React components (atomic design)
│       │   └── hooks/         # Custom React hooks
│       │       └── __tests__/ # React component tests
│       ├── test/               # Test configuration
│       │   ├── setup.ts       # Vitest setup with jest-dom
│       │   └── postcss.config.cjs # Minimal PostCSS for tests
│       ├── vitest.config.ts   # Vitest configuration
│       ├── package.json       # Frontend dependencies & scripts
│       └── tsconfig.json      # TypeScript configuration
├── packages/                   # Shared packages/libs (for JS/TS)
│   └── .gitkeep
├── k8s/                       # Kubernetes deployment configs
│   ├── backend.yaml
│   └── frontend.yaml
├── .gitignore
├── nx.json                     # Nx workspace configuration
├── package.json                # Nx workspace config
├── tsconfig.base.json          # Base TypeScript configuration
├── tsconfig.json               # Root TypeScript configuration
└── README.md
```

---

## 🧪 Testing Setup

### Frontend Testing (Vitest + React Testing Library)
```bash
# Run frontend tests (interactive mode, enters watch mode)
nx run frontend:test:watch

# Run tests once (non-interactive)
nx test frontend

# Run tests with coverage report
nx run frontend:test:coverage
```

**Test Configuration:**
- **Vitest** - Fast test runner with Jest-compatible API
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests
- **jest-dom** - Additional DOM matchers for assertions
- **@vitest/coverage-v8** - Code coverage reporting

### Backend Testing (pytest)
```bash
# Run backend tests
nx test backend

# Run tests directly
cd apps/backend
python -m pytest
```

**Test Configuration:**
- **pytest** - Python testing framework
- **pytest-asyncio** - Async test support
- **httpx** - HTTP client for testing FastAPI

---

## 🐳 Docker Development (Compose)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed

### Quick Start

```sh
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

### Stopping and Cleanup

```sh
docker-compose down
```

### Notes

- Source code is mounted as a volume for live reload in both frontend and backend.
- Changes to dependencies (package.json/pyproject.toml) require rebuilding:
  `docker-compose build`
- For production, adjust Dockerfiles and compose as needed.

---

## 🚀 Quick Start

### 1. Install Node.js dependencies
```sh
npm install
```

### 2. Install Python backend dependencies
```sh
npx nx build backend
```

### 3. Start Python backend (FastAPI)
```sh
npx nx serve backend
```
API will be available at [http://localhost:8000](http://localhost:8000).

### 4. Start frontend (Next.js)
```sh
npx nx serve frontend
```
or go to `apps/frontend` and run:
```sh
npm run dev
```

---

## 🧪 Running Tests

### Frontend Tests
```bash
# Run tests in interactive mode (enters watch mode)
nx run frontend:test:watch

# Run tests once (non-interactive, good for CI/CD)
nx test frontend

# Run tests with coverage report
nx run frontend:test:coverage
```

**Test Modes:**
- **Interactive Mode** (`nx run frontend:test:watch`): Enters watch mode, automatically re-runs tests when files change
- **Run Once** (`nx test frontend`): Executes tests once and exits, perfect for CI/CD pipelines
- **Coverage Mode** (`nx run frontend:test:coverage`): Runs tests and generates detailed coverage report

### Backend Tests
```bash
# Run all backend tests
nx test backend

# Run tests with verbose output
cd apps/backend
python -m pytest -v
```

---

## 📦 Nx Project Types

- **app**: Executable/deployable applications (e.g., frontend, backend).
- **package/lib**: Reusable modules shared by multiple apps, located in `packages/` or `libs/`.

## 🎯 Nx Targets

### Frontend Targets
- **`nx serve frontend`** - Start Next.js development server
- **`nx build frontend`** - Build production bundle
- **`nx test frontend`** - Run tests once (non-interactive)
- **`nx run frontend:test:watch`** - Run tests in watch mode
- **`nx run frontend:test:coverage`** - Run tests with coverage report

### Backend Targets
- **`nx serve backend`** - Start FastAPI development server
- **`nx build backend`** - Install Python dependencies
- **`nx test backend`** - Run pytest tests

---

## 🔧 Dependency Management

- **Node.js/TypeScript**: Managed via `package.json` and `npm`.
- **Python**: Managed via `pyproject.toml` with pytest and testing dependencies.
- **Testing**: 
  - Frontend: Vitest + React Testing Library
  - Backend: pytest + httpx

---

## 🎯 Key Features

- **Monorepo Architecture**: Nx-managed workspace for scalable development
- **Full-Stack Support**: TypeScript/React frontend + Python/FastAPI backend
- **Comprehensive Testing**: 
  - Frontend: Vitest + React Testing Library + Coverage reporting
  - Backend: pytest + httpx
  - Multiple test modes (interactive, run-once, coverage)
- **Modern Tooling**: Next.js 15, React 19, FastAPI, pytest
- **Docker Support**: Containerized development environment
- **Kubernetes Ready**: Deployment configurations included

---

## 📚 Other Notes

- `.gitignore` supports both Node.js/TS and Python.
- All Nx targets can be run from the root with `npx nx <target> <project>`.
- Use `npx nx` commands for cross-platform development.
- Testing setup follows best practices for both ecosystems.

---

## 🔗 References

- [Nx Documentation](https://nx.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/)
- [Vitest Documentation](https://vitest.dev/)
- [pytest Documentation](https://docs.pytest.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [uv (Python ultra fast installer)](https://github.com/astral-sh/uv)
