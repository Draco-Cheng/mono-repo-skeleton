# Frontend (Next.js) – Nx Monorepo Example

This is the frontend application for the Nx monorepo, built with [Next.js](https://nextjs.org/) and TypeScript. It demonstrates integration with a FastAPI backend and uses modern best practices for monorepo development with comprehensive testing setup.

---

## Features

- **Next.js 15+** with App Router
- **React 19** with modern hooks and patterns
- **TypeScript** with strict type checking
- **Tailwind CSS** for utility-first styling
- **Comprehensive Testing** with Vitest + React Testing Library
- **Code Coverage** reporting with @vitest/coverage-v8
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
│   ├── app/              # Next.js app router
│   │   ├── config.ts     # Frontend API config (API_PREFIX)
│   │   ├── layout.tsx    # Root layout with global styles
│   │   ├── page.tsx      # Main page, fetches backend API
│   │   ├── globals.css   # Global styles with Tailwind CSS
│   │   └── ping/         # Ping API demo page
│   ├── components/       # React components (atomic design)
│   │   ├── atoms/        # Basic UI components (Button, Footer)
│   │   ├── molecules/    # Composite components (ApiResult)
│   │   ├── organisms/    # Complex components (Card)
│   │   ├── pages/        # Page-specific components
│   │   └── templates/    # Layout templates (Menu)
│   └── hooks/            # Custom React hooks
│       ├── usePingApi.ts # API integration hook
│       └── __tests__/    # Hook unit tests
├── test/                  # Test configuration
│   ├── setup.ts          # Vitest setup with jest-dom
│   └── postcss.config.cjs # Minimal PostCSS for tests
├── next.config.ts         # Next.js config (API proxy rewrites)
├── vitest.config.ts       # Vitest test configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
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

## Testing

### Test Commands

```bash
# Run tests in interactive mode (watch mode)
nx test frontend

# Run tests once (non-interactive, good for CI/CD)
nx run frontend:test:run

# Run tests with coverage report
nx run frontend:test:coverage
```

### Test Configuration

- **Vitest** - Fast test runner with Jest-compatible API
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests
- **jest-dom** - Additional DOM matchers for assertions
- **@vitest/coverage-v8** - Code coverage reporting

### Test Structure

- **Hook Tests**: `src/hooks/__tests__/usePingApi.test.tsx`
- **Test Setup**: `test/setup.ts` with jest-dom extensions
- **Configuration**: `vitest.config.ts` with jsdom environment

---

## API Integration

- All frontend API requests should use the prefix defined in [`src/app/config.ts`](src/app/config.ts):  
  ```ts
  export const API_PREFIX = "/api";
  ```
- During development, `/api/*` requests are proxied to the backend (see [`next.config.ts`](next.config.ts)).
- In production, the frontend expects the backend to be available at the same domain or via a reverse proxy.

---

## Styling

- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-specific styles
- **Global styles** in `src/app/globals.css`
- **Responsive design** with mobile-first approach

---

## Customization

- UI styles are managed via Tailwind CSS and CSS modules
- Component architecture follows atomic design principles
- To add more API endpoints, update both the backend and frontend config as needed
- Testing follows React Testing Library best practices

---

## References

- [Next.js Documentation](https://nextjs.org/)
- [React Documentation](https://react.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Nx Documentation](https://nx.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
