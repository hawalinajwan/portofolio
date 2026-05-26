import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tokenEndpoint = "https://accounts.spotify.com/api/token";
const currentlyPlayingEndpoint =
  "https://api.spotify.com/v1/me/player/currently-playing";

type SpotifyTrackItem = {
  name: string;
  external_urls?: {
    spotify?: string;
  };
  album?: {
    images?: {
      url: string;
      width?: number;
    }[];
  };
  artists?: {
    name: string;
  }[];
};

type SpotifyCurrentlyPlaying = {
  is_playing: boolean;
  item?: SpotifyTrackItem | null;
};

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { access_token?: string };

  return data.access_token ?? null;
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ isPlaying: false });
  }

  const response = await fetch(currentlyPlayingEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 204 || response.status === 202) {
    return NextResponse.json({ isPlaying: false });
  }

  if (!response.ok) {
    return NextResponse.json({ isPlaying: false });
  }

  const data = (await response.json()) as SpotifyCurrentlyPlaying;
  const track = data.item;

  if (!data.is_playing || !track) {
    return NextResponse.json({ isPlaying: false });
  }

  const albumImage =
    track.album?.images?.find((image) => image.width && image.width <= 128) ??
    track.album?.images?.at(-1) ??
    null;

  return NextResponse.json({
    isPlaying: true,
    title: track.name,
    artist: track.artists?.map((artist) => artist.name).join(", ") ?? "",
    albumImageUrl: albumImage?.url ?? null,
    songUrl: track.external_urls?.spotify ?? null,
  });
}
