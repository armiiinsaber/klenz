// Vercel Edge Function — Strava OAuth token exchange
// Deploy: this file lives at /api/strava-exchange.js in your Vercel project
// Add these env vars in Vercel dashboard:
//   STRAVA_CLIENT_ID
//   STRAVA_CLIENT_SECRET

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { code, grant_type, refresh_token } = await req.json();

    const body = new URLSearchParams({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      ...(grant_type === 'refresh_token'
        ? { grant_type: 'refresh_token', refresh_token }
        : { grant_type: 'authorization_code', code }
      )
    });

    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export const config = { runtime: 'edge' };
