import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tokenEndpoint = "https://accounts.spotify.com/api/token";

function getRedirectUri(request: NextRequest) {
  return (
    process.env.SPOTIFY_REDIRECT_URI ??
    new URL("/api/spotify/callback", request.url).toString()
  );
}

function html(content: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Spotify Token</title>
    <style>
      body {
        margin: 0;
        padding: 32px;
        background: #ffffff;
        color: #111827;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        max-width: 720px;
        margin: 0 auto;
      }
      code {
        display: block;
        overflow-wrap: anywhere;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        background: #f9fafb;
      }
    </style>
  </head>
  <body>
    <main>${content}</main>
  </body>
</html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}

export async function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return html(`<h1>Spotify authorization failed</h1><p>${error}</p>`, 400);
  }

  if (!clientId || !clientSecret) {
    return html(
      "<h1>Missing Spotify env</h1><p>Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.</p>",
      500,
    );
  }

  if (!code) {
    return html("<h1>Missing code</h1><p>Open /api/spotify/login first.</p>", 400);
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: getRedirectUri(request),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    return html(
      `<h1>Token exchange failed</h1><p>Spotify returned:</p><code>${message}</code>`,
      400,
    );
  }

  const data = (await response.json()) as { refresh_token?: string };

  if (!data.refresh_token) {
    return html(
      "<h1>No refresh token returned</h1><p>Try removing the app access from your Spotify account, then authorize again.</p>",
      400,
    );
  }

  return html(
    `<h1>Spotify refresh token</h1><p>Put this value in <strong>SPOTIFY_REFRESH_TOKEN</strong>:</p><code>${data.refresh_token}</code>`,
  );
}
