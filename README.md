# MonoRepoSkeleton

## Monorepo Workspace (Nx + TypeScript + Python)

This project is an Nx-managed monorepo supporting both TypeScript/Node.js and Python, suitable for modern full-stack, API, and library development.

---

## Folder Structure

```
mono-repo-skeleton/
├── apps/
│   ├── backend/                # FastAPI Python backend (API server)
│   │   ├── main.py
│   │   ├── pyproject.toml
│   │   └── package.json        # Nx target for backend
│   └── frontend/               # Next.js frontend (TypeScript/React)
│       ├── src/
│       ├── package.json
│       └── ...
├── packages/                   # Shared packages/libs (for JS/TS)
│   └── .gitkeep
├── scripts/                    # Cross-language startup/install scripts
│   ├── run-backend.bat
│   └── install-backend.bat
├── .gitignore
├── nx.json
├── package.json                # Nx workspace config
├── tsconfig.base.json
├── tsconfig.json
├── setup.py (can be removed, now using pyproject.toml)
└── README.md
```

---

## Docker Development (Compose)

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

## Quick Start

### 1. Install Node.js dependencies
```sh
npm install
```

### 2. Install Python backend dependencies
```sh
npx nx build backend
```
or manually:
```sh
scripts\install-backend.bat
```

### 3. Start Python backend (FastAPI)
```sh
npx nx serve backend
```
or manually:
```sh
scripts\run-backend.bat
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

## Nx Project Types

- **app**: Executable/deployable applications (e.g., frontend, backend).
- **package/lib**: Reusable modules shared by multiple apps, located in `packages/` or `libs/`.

---

## Dependency Management

- **Node.js/TypeScript**: Managed via `package.json` and `npm`.
- **Python**: Managed via `pyproject.toml` (recommended: uv, PDM, Poetry), with virtual environment auto-created in `.venv/`.

---

## Other Notes

- `.gitignore` supports both Node.js/TS and Python.
- All Nx targets can be run from the root with `npx nx <target> <project>`.
- Use scripts in `scripts/` for cross-language install/startup automation.

---

## References

- [Nx Documentation](https://nx.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/)
- [uv (Python ultra fast installer)](https://github.com/astral-sh/uv)
