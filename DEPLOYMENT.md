# Serverless Deployment

This project is now set up for Vercel serverless deployment.

## Structure

```text
ClientApp/          React + Vite frontend
api/                Vercel serverless functions
wwwroot/            Production build output
vercel.json         Vercel build and routing config
```

## Local frontend

```bash
cd ClientApp
npm install
npm run dev
```

The Vite dev server runs the frontend on `http://localhost:5173`. This is frontend-only local development.

For local testing with serverless functions, install the Vercel CLI and run this from the repository root:

```bash
vercel dev
```

## Production build

```bash
cd ClientApp
npm run build
```

The build is written to `wwwroot/`.

## Deploy on Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the root directory as the repository root.
4. Vercel will use `vercel.json`:
   - Build command: `cd ClientApp && npm install && npm run build`
   - Output directory: `wwwroot`
   - Serverless API directory: `api/`

The project-info endpoint is available at:

```text
POST /api/project-info
```

## Next AI endpoints

Good next serverless functions to add:

```text
POST /api/summary
POST /api/improve-bullet
POST /api/review-resume
POST /api/match-job
```
