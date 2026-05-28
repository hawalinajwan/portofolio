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
  const [hasLoaded, setHasLoaded] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const textViewportRef = useRef<HTMLSpanElement>(null);
  const textMeasureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStatus() {
      try {
        const response = await fetch("/api/spotify", {
          cache: "no-store",
        });

        if (!response.ok) {
          if (isMounted) {
            setStatus(fallbackStatus);
            setHasLoaded(true);
          }
          return;
        }

        const data = (await response.json()) as SpotifyStatus;

        if (isMounted) {
          setStatus(data);
          setHasLoaded(true);
        }
      } catch {
        if (isMounted) {
          setStatus(fallbackStatus);
          setHasLoaded(true);
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
    if (
      !status.isPlaying ||
      !textViewportRef.current ||
      !textMeasureRef.current
    ) {
      setShouldScroll(false);
      return;
    }

    function updateScrollState() {
      if (!textViewportRef.current || !textMeasureRef.current) {
        return;
      }

      setShouldScroll(
        textMeasureRef.current.scrollWidth > textViewportRef.current.clientWidth
      );
    }

    const frame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [status.isPlaying, statusText]);

  if (!hasLoaded) {
    return null;
  }

  const wrapperClassName = "relative inline-block";
  const tailClassName =
    "pointer-events-none absolute border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950";
  const bubbleBaseClassName =
    "spotify-status-pop relative z-10 inline-flex h-9 items-center gap-1.5 rounded-[20px] border border-neutral-300 bg-white px-3 text-xs text-neutral-950 shadow-[0_8px_22px_rgba(15,23,42,0.10)] transition-colors dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:shadow-[0_8px_22px_rgba(0,0,0,0.28)] sm:h-11 sm:gap-2 sm:rounded-[22px] sm:px-4 sm:text-sm";
  const bubbleClassName = `${bubbleBaseClassName} w-max max-w-[min(238px,calc(100vw-116px))] sm:max-w-[290px]`;

  const tail = (
    <>
      <span
        className={`${tailClassName} spotify-status-tail-dot -bottom-3.5 left-3 z-0 h-2.5 w-3.5 rounded-full sm:-bottom-4 sm:left-4 sm:h-3 sm:w-4`}
        aria-hidden="true"
      />
      <span
        className={`${tailClassName} spotify-status-tail-oval -bottom-2 left-5 z-0 h-3.5 w-6 rounded-[999px_999px_999px_6px] sm:-bottom-2.5 sm:left-7 sm:h-4 sm:w-7`}
        aria-hidden="true"
      />
    </>
  );

  if (!status.isPlaying) {
    return (
      <div className={wrapperClassName}>
        {tail}
        <div className={`${bubbleBaseClassName} w-auto font-medium`}>
          <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 sm:h-5 sm:w-5">
            <TbBed className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span>Zzzz</span>
        </div>
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
      <span className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden leading-[1]">
        <span className="block shrink-0 translate-y-px text-neutral-500 dark:text-neutral-400">
          Playing:
        </span>
        <span
          ref={textViewportRef}
          className="relative block min-w-0 flex-1 translate-y-px overflow-hidden whitespace-nowrap"
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
          <span
            ref={textMeasureRef}
            className="pointer-events-none absolute left-0 top-0 -z-10 inline-block whitespace-nowrap opacity-0"
            aria-hidden="true"
          >
            <span className="font-semibold">{status.title}</span>
            {status.artist ? <span> - {status.artist}</span> : null}
          </span>
        </span>
      </span>
    </>
  );

  if (status.songUrl) {
    return (
      <a
        href={status.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${wrapperClassName} group`}
      >
        {tail}
        <span
          className={`${bubbleClassName} group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900`}
        >
          {content}
        </span>
      </a>
    );
  }

  return (
    <div className={wrapperClassName}>
      {tail}
      <div className={bubbleClassName}>{content}</div>
    </div>
  );
}
