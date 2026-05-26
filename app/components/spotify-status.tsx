"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TbBed, TbBrandSpotify, TbPlus } from "react-icons/tb";

type SpotifyStatus = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string | null;
  songUrl?: string | null;
};

const fallbackStatus: SpotifyStatus = {
  isPlaying: false,
};

export function SpotifyStatus() {
  const [status, setStatus] = useState<SpotifyStatus>(fallbackStatus);
  const [shouldScroll, setShouldScroll] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStatus() {
      try {
        const response = await fetch("/api/spotify", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as SpotifyStatus;

        if (isMounted) {
          setStatus(data);
        }
      } catch {
        if (isMounted) {
          setStatus(fallbackStatus);
        }
      }
    }

    loadStatus();
    const interval = window.setInterval(loadStatus, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const statusText = status.artist
    ? `${status.title} - ${status.artist}`
    : status.title;

  useEffect(() => {
    if (!status.isPlaying || !textRef.current) {
      setShouldScroll(false);
      return;
    }

    function updateScrollState() {
      if (!textRef.current) {
        return;
      }

      setShouldScroll(textRef.current.scrollWidth > textRef.current.clientWidth);
    }

    updateScrollState();
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("resize", updateScrollState);
    };
  }, [status.isPlaying, statusText]);

  if (!status.isPlaying) {
    return (
      <div className="relative inline-flex max-w-[min(260px,calc(100vw-116px))] items-center gap-1.5 rounded-[20px] border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-950 shadow-[0_8px_22px_rgba(15,23,42,0.10)] before:absolute before:-bottom-2 before:left-5 before:h-3.5 before:w-6 before:rounded-[999px_999px_999px_6px] before:border before:border-neutral-300 before:bg-white before:content-[''] after:absolute after:-bottom-3.5 after:left-3 after:h-2.5 after:w-3.5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:content-[''] dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_8px_22px_rgba(0,0,0,0.28)] dark:before:border-neutral-700 dark:before:bg-neutral-950 dark:after:border-neutral-700 dark:after:bg-neutral-950 sm:max-w-full sm:gap-2 sm:rounded-[22px] sm:px-4 sm:py-2.5 sm:text-sm sm:before:-bottom-2.5 sm:before:left-7 sm:before:h-4 sm:before:w-7 sm:after:-bottom-4 sm:after:left-4 sm:after:h-3 sm:after:w-4">
        <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 sm:h-5 sm:w-5">
          <TbBed className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="truncate">Zzzz</span>
      </div>
    );
  }

  const content = (
    <>
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 sm:h-6 sm:w-6">
        {status.albumImageUrl ? (
          <Image
            src={status.albumImageUrl}
            alt=""
            width={24}
            height={24}
            className="h-5 w-5 rounded-full object-cover sm:h-6 sm:w-6"
            unoptimized
          />
        ) : (
          <TbPlus className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#1DB954] text-white ring-2 ring-white dark:ring-neutral-950 sm:h-3.5 sm:w-3.5">
          <TbBrandSpotify className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
        <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
          Playing:
        </span>
        <span
          ref={textRef}
          className="min-w-0 overflow-hidden whitespace-nowrap"
          title={statusText}
        >
          <span
            className={
              shouldScroll
                ? "spotify-status-marquee inline-flex min-w-max items-center gap-8"
                : "inline-block max-w-full truncate"
            }
          >
            <span>
              <span className="font-semibold text-neutral-950 dark:text-neutral-50">
                {status.title}
              </span>
              {status.artist ? (
                <span className="text-neutral-500 dark:text-neutral-400">
                  {" "}
                  - {status.artist}
                </span>
              ) : null}
            </span>
            {shouldScroll ? (
              <span aria-hidden="true">
                <span className="font-semibold text-neutral-950 dark:text-neutral-50">
                  {status.title}
                </span>
                {status.artist ? (
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {" "}
                    - {status.artist}
                  </span>
                ) : null}
              </span>
            ) : null}
          </span>
        </span>
      </span>
    </>
  );

  const className =
    "relative inline-flex w-[min(260px,calc(100vw-116px))] items-center gap-1.5 rounded-[20px] border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-950 shadow-[0_8px_22px_rgba(15,23,42,0.10)] transition-colors before:absolute before:-bottom-2 before:left-5 before:h-3.5 before:w-6 before:rounded-[999px_999px_999px_6px] before:border before:border-neutral-300 before:bg-white before:content-[''] after:absolute after:-bottom-3.5 after:left-3 after:h-2.5 after:w-3.5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:content-[''] dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_8px_22px_rgba(0,0,0,0.28)] dark:before:border-neutral-700 dark:before:bg-neutral-950 dark:after:border-neutral-700 dark:after:bg-neutral-950 sm:w-[320px] sm:gap-2 sm:rounded-[22px] sm:px-4 sm:py-2.5 sm:text-sm sm:before:-bottom-2.5 sm:before:left-7 sm:before:h-4 sm:before:w-7 sm:after:-bottom-4 sm:after:left-4 sm:after:h-3 sm:after:w-4";

  if (status.songUrl) {
    return (
      <a
        href={status.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:bg-neutral-50 dark:hover:bg-neutral-900`}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
