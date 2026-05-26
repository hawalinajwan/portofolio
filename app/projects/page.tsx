import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Nextfolio Projects",
};

export default function Projects() {
  return (
    <section className="pt-24 sm:pt-20 md:pt-24">
      <h1 className="mb-8 border-b border-neutral-200 pb-5 text-2xl font-bold tracking-tight text-neutral-950 dark:border-neutral-800 dark:text-neutral-50 sm:text-3xl">
        Projects
      </h1>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {projects.map((project) => (
          <Link
            key={project.url}
            href={project.url}
            className="grid gap-2 py-5 transition-opacity duration-200 first:pt-0 hover:opacity-75 sm:grid-cols-[170px_1fr] sm:gap-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="font-medium text-black dark:text-white">
              {project.title}
            </h2>
            <p className="leading-relaxed tracking-tight text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
