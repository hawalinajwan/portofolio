import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tokenEndpoint = "https://accounts.spotify.com/api/token";
const currentlyPlayingEndpoint =
  "https://api.spotify.com/v1/me/player/currently-playing";
const recentlyPlayedEndpoint =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

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

type SpotifyRecentlyPlayed = {
  items?: {
    track?: SpotifyTrackItem | null;
  }[];
};

function toTrackPayload(track: SpotifyTrackItem) {
  const albumImage =
    track.album?.images?.find((image) => image.width && image.width <= 128) ??
    track.album?.images?.at(-1) ??
    null;

  return {
    title: track.name,
    artist: track.artists?.map((artist) => artist.name).join(", ") ?? "",
    albumImageUrl: albumImage?.url ?? null,
    songUrl: track.external_urls?.spotify ?? null,
  };
}

type TrackPayload = ReturnType<typeof toTrackPayload>;

// Last track seen from Spotify, kept in memory so the bubble can still show
// something when the API reports no playback at all (e.g. device off).
let lastKnownTrack: TrackPayload | null = null;

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
    return NextResponse.json({ isPlaying: false, ...lastKnownTrack });
  }

  const response = await fetch(currentlyPlayingEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 200) {
    const data = (await response.json()) as SpotifyCurrentlyPlaying;
    const track = data.item;

    if (track) {
      // Paused tracks keep their playback state, so they act as the last played song.
      lastKnownTrack = toTrackPayload(track);
      return NextResponse.json({
        isPlaying: data.is_playing,
        ...lastKnownTrack,
      });
    }
  }

  // No active playback state: fall back to the most recently played track.
  const recentResponse = await fetch(recentlyPlayedEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (recentResponse.ok) {
    const recent = (await recentResponse.json()) as SpotifyRecentlyPlayed;
    const track = recent.items?.[0]?.track;

    if (track?.name) {
      lastKnownTrack = toTrackPayload(track);
      return NextResponse.json({
        isPlaying: false,
        ...lastKnownTrack,
      });
    }
  }

  // Last resort: the track we last saw from this server.
  if (lastKnownTrack) {
    return NextResponse.json({ isPlaying: false, ...lastKnownTrack });
  }

  return NextResponse.json({ isPlaying: false });
}
