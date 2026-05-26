import Image from "next/image";
import type { Metadata } from "next";
import { SpotifyStatus } from "./components/spotify-status";
import { socialLinks } from "./config";

export const metadata: Metadata = {
  title: {
    absolute: "About | 花",
  },
};

export default function Page() {
  return (
    <section className="pt-24 sm:pt-20 md:pt-24">
      <div className="relative flex items-center gap-4 border-b border-neutral-200 pb-10 dark:border-neutral-800 sm:gap-5 sm:pb-9">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="relative shrink-0"
        >
          <Image
            src="/profile.png"
            alt="Profile photo"
            className="h-20 w-20 rounded-full bg-gray-100 object-cover grayscale transition-all hover:grayscale-0 sm:h-[108px] sm:w-[108px]"
            unoptimized
            width={120}
            height={120}
            priority
          />
          <div className="absolute left-14 -top-7 z-10 block max-w-[calc(100vw-116px)] sm:left-16 sm:max-w-[320px]">
            <SpotifyStatus />
          </div>
        </a>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-3xl md:text-[2rem]">
            Hawali Najwan
          </h1>
        </div>
      </div>

      <div className="border-b border-neutral-200 py-8 text-lg leading-relaxed text-slate-700 dark:border-neutral-800 dark:text-slate-300 sm:py-10 sm:text-xl">
        <p className="mb-3">
          A student 📑 based in East Java 🇮🇩 with a passion for technology & graphic design.{" "}
          <a
            target="_blank"
            href="mailto:hi@hawali.site"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Email me!
          </a>
        </p>
        <p>
          Discord Server{" "}
          <a
            href="https://discord.gg/YfZjqSsVz8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Kelas-Axem
          </a>{" "}
          &{" "}
          <a
            href="https://discord.gg/joingtid"
            target="_blank"
            rel="noopener"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            GTID
          </a>
        </p>
      </div>

      <div className="pt-8 sm:pt-10">
        <h1 className="mb-3 text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-2xl">
          Latest Video
        </h1>
        <div className="aspect-video cursor-pointer overflow-hidden rounded-[15px] bg-neutral-100 dark:bg-neutral-900">
          <iframe
            loading="lazy"
            className="h-full w-full border-0"
            src="https://www.youtube.com/embed/DU2rhb1VoX0?si=Y-RFUhhlT64TT2Qz"
            title="-"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="mb-3 mt-8 text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-2xl">
          Check out my playlist
        </h1>
        <div className="cursor-pointer overflow-hidden rounded-[15px] bg-neutral-100 dark:bg-neutral-900">
          <iframe
            loading="lazy"
            className="h-[152px] w-full border-0"
            src="https://open.spotify.com/embed/playlist/2lbbYxEXLQpLm1fuXxRfGK?utm_source=generator&theme=0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
