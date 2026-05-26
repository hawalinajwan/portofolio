import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TbBrandGithub, TbExternalLink } from "react-icons/tb";
import { SpotifyStatus } from "../components/spotify-status";
import { socialLinks } from "../config";
import { Project, projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Nextfolio Projects",
};

function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="aspect-[16/10] overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  if (project.preview === "intern-link") {
    return (
      <div className="relative flex aspect-[16/10] overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white dark:border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.20),transparent_25%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.72)_45%,rgba(244,63,94,0.24))]" />
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-4 bg-white/20 px-5 py-3 text-[11px] font-semibold backdrop-blur">
          <span className="text-sm">intern-link</span>
          <span className="text-white/75">Login</span>
          <span className="rounded-md bg-pink-500 px-3 py-1.5">Register</span>
        </div>
        <div className="relative z-10 mt-auto p-6">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-pink-100">
            Platform Rekrutmen Magang
          </p>
          <p className="max-w-[300px] text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Magang terasa jelas, cepat, dan manusiawi.
          </p>
          <div className="mt-5 flex gap-2">
            <span className="rounded-md bg-pink-500 px-3 py-2 text-xs font-semibold">
              Mulai daftar
            </span>
            <span className="rounded-md border border-white/30 px-3 py-2 text-xs font-semibold">
              Cari lowongan
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] items-center justify-center border-b border-neutral-200 bg-[#f3f4f6] p-7 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="w-full max-w-[340px] text-center">
        <p className="mb-5 text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-3xl">
          Expressive Camera
        </p>
        <div className="mx-auto mb-5 inline-block text-left text-base font-bold leading-relaxed text-black dark:text-white sm:text-lg">
          <p>Automatic Capturing</p>
          <p>Show Expression:😁</p>
        </div>
        <div className="relative mx-auto aspect-video w-full max-w-[300px] overflow-hidden rounded-md bg-neutral-950 shadow-[0_16px_34px_rgba(15,23,42,0.22)]">
          <div className="absolute inset-x-[24%] top-[18%] h-[24%] rounded-full bg-neutral-800" />
          <div className="absolute left-[34%] top-[36%] h-[18%] w-[8%] rounded-full bg-neutral-700" />
          <div className="absolute right-[34%] top-[36%] h-[18%] w-[8%] rounded-full bg-neutral-700" />
          <div className="absolute inset-x-[26%] bottom-[10%] h-[40%] rounded-t-full bg-neutral-700" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0,transparent_24%,rgba(0,0,0,0.36)_60%)]" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="pt-24 sm:pt-20 md:pt-24">
      <div className="relative flex items-center gap-4 border-b border-neutral-200 pb-9 dark:border-neutral-800 sm:gap-5 sm:pb-8">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="relative shrink-0"
        >
          <Image
            src="/profile.jpg"
            alt="Profile photo"
            className="h-20 w-20 rounded-full bg-gray-100 object-cover grayscale transition-all hover:grayscale-0 sm:h-[108px] sm:w-[108px]"
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

      <div className="border-b border-neutral-200 py-8 dark:border-neutral-800 sm:py-10">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-5xl">
          Projects
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-xl">
          A collection of things I built, from internship platforms to playful
          camera experiments.
        </p>
      </div>

      <div className="grid gap-8 py-8 sm:grid-cols-2 sm:py-10">
        {projects.map((project) => (
          <Link
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
          >
            <ProjectPreview project={project} />

            <div className="flex flex-1 flex-col bg-neutral-50 p-5 dark:bg-neutral-900/40">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {project.category} · {project.year}
                </p>
                <TbExternalLink className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-950 dark:group-hover:text-neutral-50" />
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                {project.title}
              </h3>
              <p className="mt-3 min-h-[72px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>

              <div className="mt-5 flex min-h-[58px] flex-wrap content-start gap-1.5">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-medium leading-none text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md border border-blue-600 px-3 py-2.5 text-sm font-semibold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:border-blue-400 dark:text-blue-400 dark:group-hover:bg-blue-400 dark:group-hover:text-neutral-950">
                <TbBrandGithub className="h-5 w-5" aria-hidden="true" />
                View project
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
