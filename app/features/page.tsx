import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features · Visual Whiteboard",
  description: "What Visual Whiteboard ships with today."
};

const FEATURES = [
  {
    title: "Live Mermaid ER diagram",
    body: "Every result includes a rendered erDiagram so you can verify the relationships at a glance before copying any code."
  },
  {
    title: "Prisma schema",
    body: "A complete schema.prisma with datasource and generator blocks, ready to drop into a Next.js project."
  },
  {
    title: "Raw Postgres SQL",
    body: "CREATE TABLE IF NOT EXISTS statements ordered so foreign-key references resolve. Bring-your-own RLS."
  },
  {
    title: "Three input modes",
    body: "Upload a sketch, paste a clipboard screenshot, or describe the app in plain English — whichever is fastest."
  },
  {
    title: "JSON-schema-enforced output",
    body: "Gemini is constrained by a Zod-backed JSON schema, then validated again on the server before it reaches your browser."
  },
  {
    title: "Model fallback",
    body: "Primary on Gemini 3.1 Pro, with an automatic fallback to Gemini 2.5 Pro if the preview model is unavailable."
  }
];

export default function FeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
          <span className="size-1.5 rounded-full bg-indigo-400" /> Features
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">What ships today</h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Everything below is in the current build — no waitlist, no flags.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-zinc-800 bg-[var(--panel)] p-5 space-y-2"
          >
            <h2 className="text-base font-medium text-zinc-100">{f.title}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
