import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const authorizeEndpoint = "https://accounts.spotify.com/authorize";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];

function getRedirectUri(request: NextRequest) {
  return (
    process.env.SPOTIFY_REDIRECT_URI ??
    new URL("/api/spotify/callback", request.url).toString()
  );
}

export async function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing SPOTIFY_CLIENT_ID" },
      { status: 500 },
    );
  }

  const url = new URL(authorizeEndpoint);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", getRedirectUri(request));
  url.searchParams.set("scope", scopes.join(" "));

  return NextResponse.redirect(url);
}
