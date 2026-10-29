# GWIC BET frontend

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`. Leave `VITE_API_URL` empty to use
   the Vite `/api` proxy to `http://localhost:5000`.
3. Start the backend with `npm run dev` from `../backend`.
4. Start the frontend with `npm run dev`.

The onboarding screen checks `/api/health` on load. The dashboard requests
real fixtures from `/api/dashboard`; until that sports data route is connected,
it clearly shows an unavailable state rather than invented matches or odds.
Account, betslip, and bet history screens likewise show honest empty states
until those services exist. The dashboard carousel uses featured player slides
until real matches are returned; it only shows fixture details supplied by the
sports API.

The dashboard expects the sports API to return:

```json
{
  "matches": [
    {
      "id": "provider-match-id",
      "sport": "Football",
      "league": "League name",
      "status": "live",
      "kickoffAt": "2026-10-28T19:30:00Z",
      "homeTeam": { "name": "Home team", "logoUrl": "https://..." },
      "awayTeam": { "name": "Away team", "logoUrl": "https://..." },
      "score": { "home": 1, "away": 0 },
      "odds": [
        { "selection": "1", "value": 1.85 },
        { "selection": "X", "value": 3.6 },
        { "selection": "2", "value": 4.2 }
      ]
    }
  ]
}
```

`kickoffAt`, logos, score, and odds can be omitted when the provider has not
supplied them. Only include real provider data; never hardcode sample fixtures
or prices in the frontend.

## Dashboard image credits

The featured Premier League player photos are resized local copies of Wikimedia
Commons images, still distributed under their original licenses:

- Erling Haaland — photo by Jacek Stanislawek,
  [source](https://commons.wikimedia.org/wiki/File:Erling_Haaland_2023.jpg),
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Bukayo Saka (England v Ghana, 2026) — photo by Bryan Berlin / WikiPortraits,
  [source](https://commons.wikimedia.org/wiki/File:Bukayo_Saka_England_v_Ghana_23_June_2026-057_(cropped).jpg),
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Other carousel photos are from Unsplash and are free to use under the
[Unsplash License](https://unsplash.com/license):

- Football match — photo by Waldemar Brandt,
  [source](https://unsplash.com/photos/soccer-game-iiwYpGkbDgM).

Sport-specific match slides use these additional Unsplash photos:

- Basketball action — photo by August Phlieger,
  [source](https://unsplash.com/photos/basketball-player-dunking-in-dark-gym-CREqtqgBFcU).
- Tennis action — photo by Moises Alex,
  [source](https://unsplash.com/photos/man-playing-tennis-WqI-PbYugn4).

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
