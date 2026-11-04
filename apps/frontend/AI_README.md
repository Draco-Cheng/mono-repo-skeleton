# AI_README: Frontend (Next.js) Conventions & Index

This file is for AI assistants and future contributors.  
It describes the architecture, conventions, and best practices for the frontend app.

---

## Framework & Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules (per component/page)
- **Component Architecture:** Atomic Design (atoms, molecules, organisms, templates, pages)
- **State/Logic:** Prefer custom React hooks (in `/src/hooks`)
- **API Integration:** All API calls use `/api` prefix, proxied to backend at runtime by `src/proxy.ts` (strips `/api`)
- **Routing:** All route files (`page.tsx`, `layout.tsx`) live in `src/app/` and subfolders

---



## Conventions

- **Component Naming:** PascalCase for all components.
- **CSS Modules:** Each component/page has its own `.module.css` file.
- **Atomic Design:**  
  - Atoms: Basic UI elements (Button, Footer, etc.)
  - Molecules: Small reusable groups (ApiResult, etc.)
  - Organisms: Complex UI blocks (Card, etc.)
  - Templates: Application-level layout/composition (Menu, etc.)
  - Pages: Page-level components, imported by route files
- **Hooks:** Place all custom hooks in `src/hooks/`, use strict typing.
- **API Prefix:** Import from `src/app/config.ts` for consistency.

---


- `next dev` / `next build` MUST pass `--webpack` — `@serwist/next` is a webpack plugin; Next 16 Turbopack default breaks the service worker build.
- Request interception lives in `src/proxy.ts` exporting `proxy` — Next 16 renamed middleware; never recreate `middleware.ts`.
- Lint = plain `eslint .` (Next 16 removed `next lint`) — generated files must be in `globalIgnores`. See eslint.config.mjs.
- Mock globals in tests with `vi.stubGlobal`, not `global.x =` + `@ts-expect-error`.
## Application-level Logic

- Components using Next.js context (e.g., `usePathname`, navigation) should be placed in `templates/` or `pages/`, not in atomic folders.
- Only route files in `src/app/` define actual routes.

---

## AI Usage

- Reference this file for conventions, structure, and best practices when using GPT or other AI tools.
- Follow the Atomic Design and Next.js conventions described here.
