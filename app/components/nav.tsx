import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";

const navItems = {
  "/": { name: "About" },
  "/blog": { name: "Post" },

};

export function Navbar() {
  return (
    <nav className="lg:mb-12 mb-12 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
        <Link href="https://youtu.be/dQw4w9WgXcQ?si=wtacTR8yq7IM5HRG"  target="_blank">
        <Image
              src="/h0n.png" 
              alt="Logo"
              width={75} 
              height={75} 
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
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
