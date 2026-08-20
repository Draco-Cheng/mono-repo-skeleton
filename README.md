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

## ⚙️ GitHub Actions CI/CD Setup

This project uses GitHub Actions for continuous integration and deployment. To enable the CI/CD pipelines, you need to configure the following secrets in your GitHub repository.

### Setting Up GitHub Secrets

Go to your GitHub repository settings: **Settings > Secrets and variables > Actions > New repository secret**

### Required Secrets

#### Docker Registry Credentials
These secrets are used to push Docker images to Docker Hub:

- **`DOCKER_USERNAME`**
  - Your Docker Hub username
  - Example: `myusername`

- **`DOCKER_PASSWORD`**
  - Your Docker Hub password or access token
  - Recommended: Use an access token instead of your password
  - [Create a Docker Hub access token](https://hub.docker.com/settings/security)

#### Kubernetes Cluster Credentials
These secrets are used to deploy applications to your Kubernetes cluster. Two authentication methods are supported:

**Common Settings (Required for both methods):**

- **`K8S_SERVER`**
  - Kubernetes API server URL
  - Example: `https://your-k8s-cluster.com:6443`
  - How to get: Run `kubectl cluster-info` and use the API server URL

- **`K8S_CA_DATA`**
  - Kubernetes cluster CA certificate (base64 encoded)
  - How to get: `kubectl config view --raw -o jsonpath='{.clusters[0].cluster.certificate-authority-data}'`

**Authentication Method 1: Token-based (Recommended for cloud providers)**

Use this method if your cloud provider gives you a User Token or Service Account Token.

- **`K8S_USER_TOKEN`**
  - Kubernetes user token or service account token
  - How to get: Check your cloud provider's dashboard or use `kubectl config view --raw -o jsonpath='{.users[0].user.token}'`

**Authentication Method 2: Certificate-based**

Use this method if your cluster uses TLS client certificates for authentication.

- **`K8S_CLIENT_CERT`**
  - Kubernetes client certificate (base64 encoded)
  - How to get: `kubectl config view --raw -o jsonpath='{.users[0].user.client-certificate-data}'`

- **`K8S_CLIENT_KEY`**
  - Kubernetes client private key (base64 encoded)
  - How to get: `kubectl config view --raw -o jsonpath='{.users[0].user.client-key-data}'`

> **Note:** If `K8S_USER_TOKEN` is set, token-based authentication will be used. Otherwise, certificate-based authentication will be used.

#### Optional Secrets

- **`K8S_NAMESPACE`** *(Optional)*
  - Kubernetes namespace for deployment
  - Default: `default`
  - Example: `my-app-production`

- **`INGRESS_HOST`** *(Optional)*
  - The hostname for the Kubernetes Ingress resource
  - Example: `app.example.com`
  - If not set, the Ingress will be created without a host (matches all hosts)

### GitHub Actions Workflows

The project includes the following workflows:

- **`ci.yml`** - Runs lint/test/build/typecheck (+ Docker build smoke test, E2E when affected) on pull requests
- **`pr-validation.yml`** - Validates pull request format
- **`e2e.yml`** - Runs end-to-end tests
- **`deploy.yml`** - CD: versions, builds/publishes Docker images, and deploys on push to main
- **`manual-deploy.yml`** - Manual deployment workflow with version selection

### Versioning (tag-only release)

`deploy.yml` computes the next version from [conventional commits](https://www.conventionalcommits.org/)
(`nx release version --dry-run`, config in `nx.json`) and pushes it as a git tag —
it never bumps `package.json`/`pyproject.toml` or commits back to `main`. This keeps
`nx affected` accurate: a version-bump commit would otherwise touch every project that
depends on a shared library, making each release rebuild everything regardless of what
actually changed. `VERSION` everywhere (Docker tags, Helm releases) comes from the git
tag, and `deploy.yml`'s `nx affected` base is the previous release tag rather than the
default `nx-set-shas` base.

The default `GITHUB_TOKEN` is sufficient to push tags — no SSH deploy key needed.

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
