# GWIC BET frontend

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`. Leave `VITE_API_URL` empty to use
   the Vite `/api` proxy to `http://localhost:5000`.
3. Start the backend with `npm run dev` from `../backend`.
4. Start the frontend with `npm run dev`.

The onboarding screen checks `/api/health` on load. The desktop header shows
whether the backend and its MongoDB connection are available. This is a
connectivity check only; user accounts, bets, and other application data are not
connected until corresponding backend endpoints and frontend flows are added.

## Deploy the frontend to Vercel

- Set the Vercel project root to this frontend repository's root.
- Use the Vite defaults: build command `npm run build`, output directory `dist`.
- Add `VITE_API_URL` to the Vercel project's Production environment variables.
  Set it to `https://gwic-bet-backend.onrender.com` (no trailing slash).
- Redeploy after adding or changing the variable. `VITE_` variables are
  included in the public frontend build; never put secrets in them.
- For Vercel Preview deployments, add their exact origin to Render's
  `CLIENT_URL` and add `VITE_API_URL` to Vercel's Preview environment only if
  you want previews to use the backend too.

## Deploy the backend to Render

- Create a Web Service for the backend repository.
- Set the root directory to the repository root, build command to `npm install`,
  and start command to `npm start`.
- Add `MONGODB_URI` using the MongoDB Atlas connection string and set
  `CLIENT_URL` to
  `http://localhost:5173,https://gwic-bet-frontend.vercel.app`. Add additional
  allowed frontend origins as comma-separated URLs if needed.
- Render supplies `PORT` automatically. Set `NODE_ENV=production` if desired.
- Set the Render health check path to `/api/health`; it returns success only
  when the API can reach MongoDB.

Use the Render service's public URL for `VITE_API_URL`. Configure the frontend
and backend origins to match exactly, including `https://` and any custom
domain. Do not put database credentials in Vercel or in frontend variables.
