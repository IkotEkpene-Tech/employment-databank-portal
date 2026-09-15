# Ikot Ekpene LGA Employment Databank Registration Portal

A React + react-router-dom single-page app, organized by feature (`src/features/*`), styled with
styled-components against a shared design-token theme (`src/theme`).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment variables

Copy `.env.development` and adjust as needed:

- `VITE_API_URL` — backend API base URL
- `VITE_PAYSTACK_PUBLIC_KEY` — Paystack public key
- `VITE_MAINTENANCE_MODE` — `true` to show the maintenance splash instead of the app

## Structure

- `src/app` — router, providers, app shell
- `src/theme` — colors, tokens, global styles
- `src/shared` — cross-feature UI primitives, composed components, hooks, lib (http client, config)
- `src/features` — one folder per domain (`home`, `auth`, `dashboard`, `employment-registration`,
  `complaints`, `not-found`), each with its own `pages/`, `components/`, `api/`, and an `index.ts`
  barrel

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
