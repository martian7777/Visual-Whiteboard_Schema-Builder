import type { Metadata } from "next";

const GITHUB_URL = "https://github.com/martian7777/Visual-Whiteboard";
const EMAIL = "saqibiqbal27772@gmail.com";

export const metadata: Metadata = {
  title: "Contact · Visual Whiteboard",
  description: "Get in touch about Visual Whiteboard → Schema Builder."
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
          <span className="size-1.5 rounded-full bg-indigo-400" /> Contact
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Get in touch</h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Bug reports, feature requests, or just want to say hi — any of these channels work.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[var(--panel)] p-6 space-y-5">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Email</div>
          <a
            href={`mailto:${EMAIL}`}
            className="text-lg sm:text-xl font-medium text-indigo-300 hover:text-indigo-200 break-all"
          >
            {EMAIL}
          </a>
        </div>

        <div className="h-px bg-zinc-900" />

        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-zinc-500">GitHub</div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg sm:text-xl font-medium text-indigo-300 hover:text-indigo-200 break-all"
          >
            {GITHUB_URL.replace("https://", "")}
          </a>
          <p className="text-sm text-zinc-500">
            Open an issue for bugs or schema-quality regressions — please include the input you used.
          </p>
        </div>
      </div>
    </div>
  );
}
