import Link from "next/link";
import Image from "next/image";

const navItems = {
  "/": { name: "About" },
  "/projects": { name: "Projects" },

};

export function Navbar() {
  return (
    <nav className="mb-4 py-1">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="https://youtu.be/dQw4w9WgXcQ?si=wtacTR8yq7IM5HRG" target="_blank">
          <Image
            src="/h0n.png"
            alt="Logo"
            width={75}
            height={75}
            className="object-contain"
          />
        </Link>
        <div className="flex flex-row gap-4 items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
