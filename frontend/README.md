# Crowdfunder — Frontend

React SPA for the Crowdfunder full-stack application.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI library |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling (via `@tailwindcss/vite`) |
| React Router DOM | 7 | Client-side routing |
| Axios | 1.x | HTTP client |
| dayjs | 1.x | Date formatting |
| lucide-react | 1.x | Icon set |

## Project Structure

```
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── axios.js          # Axios instance & interceptors
│   ├── components/           # Reusable UI components
│   ├── layout/               # Page layout wrappers
│   ├── pages/                # Route-level page components
│   ├── store/
│   │   ├── index.js          # Global state store
│   │   └── slices/
│   │       ├── authSlice.js  # Auth state (user, token)
│   │       └── projectsSlice.js  # Projects list state
│   ├── App.jsx               # Root component & router setup
│   ├── index.css             # Tailwind base import
│   └── main.jsx              # App entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
cd frontend
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Environment

The Axios instance at `src/api/axios.js` should be configured to point at the backend API. Set a base URL there or via an `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

## Backend

This frontend is part of a full-stack monorepo. The backend lives in the `../backend/` directory (Express + MongoDB).
