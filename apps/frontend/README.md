# Frontend (Next.js) – Nx Monorepo Example

This is the frontend application for the Nx monorepo, built with [Next.js](https://nextjs.org/) and TypeScript. It demonstrates integration with a FastAPI backend and uses modern best practices for monorepo development.

---

## Features

- **Next.js 15+** with App Router
- TypeScript, CSS Modules
- API requests proxied to backend via `/api/*` (see `next.config.ts`)
- Fully integrated with Nx workspace
- Simple, clean UI that fetches backend data
- All configuration and API endpoints are maintainable and easy to update

---

## Project Structure

```
apps/frontend/
├── public/                # Static assets
├── src/
│   └── app/
│       ├── config.ts      # Frontend API config (API_PREFIX)
│       ├── layout.tsx     # Minimal root layout
│       ├── page.tsx       # Main page, fetches backend API
│       └── page.module.css# CSS module for main page
├── next.config.ts         # Next.js config (API proxy rewrites)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Development

### 1. Install dependencies

From the monorepo root:
```sh
npm install
```

### 2. Start the backend

From the monorepo root:
```sh
npx nx serve backend
```
or
```sh
scripts\run-backend.bat
```

### 3. Start the frontend

From the monorepo root:
```sh
npx nx serve frontend
```
or from `apps/frontend`:
```sh
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## API Integration

- All frontend API requests should use the prefix defined in [`src/app/config.ts`](src/app/config.ts):  
  ```ts
  export const API_PREFIX = "/api";
  ```
- During development, `/api/*` requests are proxied to the backend (see [`next.config.ts`](next.config.ts)).
- In production, the frontend expects the backend to be available at the same domain or via a reverse proxy.

---

## Customization

- UI styles are managed via CSS modules (`page.module.css`).
- To add more API endpoints, update both the backend and frontend config as needed.

---

## References

- [Next.js Documentation](https://nextjs.org/)
- [Nx Documentation](https://nx.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
