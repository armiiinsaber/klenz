# Klenz

The health app for cool people. Track your runs via Strava and your substance intentions with daily check-ins.

**klenz-app.com**

## Run locally
```bash
npx serve -l 3000 .
```

## Deploy
Push to GitHub → connect to Vercel → live in 60 seconds.

## Strava setup
1. Create app at strava.com/settings/api
2. Add `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` to Vercel env vars
3. Set callback domain to your Vercel URL
