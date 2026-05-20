import Link from "next/link";
import { GITHUB_URL, CONTACT_EMAIL } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-900/80 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-xs text-zinc-500">
        <div>Built with Next.js 15 · React 19 · Tailwind v4 · Gemini 3.1 Pro · Mermaid</div>
        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            GitHub
          </a>
          <Link href="/contact" className="hover:text-zinc-200 transition-colors">
            Contact
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:text-zinc-200 transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
