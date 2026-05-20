"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/examples", label: "Examples" },
  { href: "/contact", label: "Contact" }
];

export const GITHUB_URL = "https://github.com/martian7777/Visual-Whiteboard_Schema-Builder";
export const CONTACT_EMAIL = "saqibiqbal27772@gmail.com";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-900/80 bg-[var(--background)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight text-zinc-100 hover:text-white">
          Visual Whiteboard
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-3 py-1.5 rounded-md transition-colors",
                  active
                    ? "bg-indigo-500/20 text-indigo-200"
                    : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/generate"
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide transition-colors"
          >
            Launch Builder
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
      <nav className="md:hidden border-t border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-2 py-1 flex items-center gap-1 overflow-x-auto scrollbar-thin text-sm">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-3 py-1.5 rounded-md whitespace-nowrap transition-colors",
                  active
                    ? "bg-indigo-500/20 text-indigo-200"
                    : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.21 9.14 7.66 10.62.56.1.77-.24.77-.54v-1.9c-3.12.68-3.78-1.5-3.78-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.23.71-1.51-2.49-.28-5.11-1.25-5.11-5.55 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.11 1.15.9-.25 1.87-.38 2.83-.38.96 0 1.93.13 2.83.38 2.16-1.45 3.11-1.15 3.11-1.15.61 1.56.23 2.71.11 3 .72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.13 5.54.4.34.76 1.02.76 2.07v3.07c0 .3.21.65.78.54 4.44-1.49 7.64-5.67 7.64-10.62C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}
