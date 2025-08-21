# AI_README: Project Index & Conventions

This file is intended as a machine-readable and human-friendly index for AI assistants (such as GPT) and future contributors.  
It describes the overall architecture, conventions, and best practices for this monorepo.

---

## Monorepo Overview

- **Monorepo manager:** Nx
- **Languages:** TypeScript (frontend), Python (backend)
- **Frontend:** Next.js 15+ (App Router, Atomic Design, CSS Modules)
- **Backend:** FastAPI (Python 3.10+)
- **Component Architecture:** Atomic Design (atoms, molecules, organisms, templates, pages)
- **API Convention:** All backend endpoints are prefixed with `/api`
- **Scripts:** Cross-language scripts in `/scripts`
- **Nx targets:** All build/serve/test tasks are managed via Nx and/or scripts

---

## Directory Structure

```
/
├── apps/
│   ├── backend/         # FastAPI backend (see apps/backend/AI_README.md)
│   └── frontend/        # Next.js frontend (see apps/frontend/AI_README.md)
├── packages/            # Shared JS/TS packages (if any)
├── scripts/             # Cross-language install/start scripts
├── AI_README.md         # (this file)
├── README.md            # Human-facing project overview
└── ...
```

---

## General Conventions

- **Naming:** Use lowerCamelCase for variables/functions, PascalCase for components/classes, kebab-case for folders/files.
- **Atomic Design:** All UI components are organized by atomic level under `src/components/`.
- **Application-level logic:** Place in `templates/`, `pages/`, or directly in `app/` (Next.js).
- **Config:** Use language-native config files, but keep API prefixes and shared constants in a single place per language.
- **TypeScript:** Use strict typing, prefer interfaces for props and API responses.
- **Python:** Use type hints, keep config in `config.py` or `pyproject.toml`.

---

## AI Usage

- When using GPT or other AI tools, reference this file and the per-app AI_README files for context.
- Always follow the conventions and structure described here unless there is a strong reason to deviate.

---

## See Also

- [apps/frontend/AI_README.md](apps/frontend/AI_README.md)
- [apps/backend/AI_README.md](apps/backend/AI_README.md)