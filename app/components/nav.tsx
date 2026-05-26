"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TbMenu2, TbX } from "react-icons/tb";

const navItems = {
  "/": { name: "About" },
  "/projects": { name: "Projects" },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-5 top-5 z-10 flex min-h-11 items-center gap-2 rounded-full px-1 text-base text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300 sm:right-8 sm:top-7 sm:text-lg"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <TbMenu2 className="h-5 w-5" aria-hidden="true" />
        <span>Menu</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex bg-neutral-900/50 backdrop-blur-[1px]"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            type="button"
            className="hidden flex-1 cursor-default sm:block"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          />
          <div className="ml-auto flex min-h-dvh w-full max-w-[320px] flex-col overflow-y-auto bg-white px-7 py-8 text-neutral-950 shadow-xl dark:bg-neutral-950 dark:text-neutral-50">
            <div className="mb-11 flex items-start justify-between gap-6">
              <h2 className="text-[2rem] font-bold leading-none tracking-tight">
                Menu
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center rounded-full text-neutral-950 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:text-neutral-50 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
                aria-label="Close menu"
              >
                <TbX className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-[1.375rem] leading-tight">
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className="w-fit transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
