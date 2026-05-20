import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works · Visual Whiteboard",
  description: "The three-step pipeline from sketch to schema."
};

const STEPS = [
  {
    n: 1,
    title: "Give it something to read",
    body: "Upload a whiteboard photo, paste a screenshot from your clipboard, or just describe the app you have in mind. Any one of these is enough."
  },
  {
    n: 2,
    title: "Gemini 3.1 Pro does the thinking",
    body: "Your input is sent to Gemini with a strict system prompt and a JSON response schema. The model returns a normalized PostgreSQL design: snake_case plural table names, uuid primary keys, explicit FK constraints."
  },
  {
    n: 3,
    title: "Four artifacts come back at once",
    body: "A tables/columns object, a ready-to-paste Prisma schema, CREATE TABLE SQL ordered so foreign keys resolve, and a Mermaid erDiagram rendered live in the right panel."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
          <span className="size-1.5 rounded-full bg-indigo-400" /> Pipeline
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">How it works</h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Three steps, no manual schema work in between.
        </p>
      </div>

      <ol className="grid sm:grid-cols-3 gap-4">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="rounded-2xl border border-zinc-800 bg-[var(--panel)] p-5 space-y-3"
          >
            <div className="size-8 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-sm flex items-center justify-center">
              {step.n}
            </div>
            <h2 className="text-base font-medium text-zinc-100">{step.title}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <section className="rounded-2xl border border-zinc-800 bg-[var(--panel)] p-6 space-y-3">
        <h2 className="text-base font-medium text-zinc-100">Conventions the model follows</h2>
        <ul className="text-sm text-zinc-400 space-y-1.5 list-disc pl-5">
          <li>Plural snake_case table names (users, blog_posts)</li>
          <li>Every table has uuid id PK default gen_random_uuid() and created_at timestamptz</li>
          <li>FK columns named &lt;referenced_table_singular&gt;_id, uuid not null by default</li>
          <li>Safe Postgres types only: uuid, text, varchar(n), int, bigint, boolean, timestamptz, date, numeric, jsonb</li>
          <li>Junction tables alphabetized (posts_tags, not tags_posts)</li>
        </ul>
      </section>

      <div className="text-sm text-zinc-400">
        Ready to try it?{" "}
        <Link href="/generate" className="text-indigo-300 hover:text-indigo-200 underline">
          Generate a schema
        </Link>{" "}
        or view our{" "}
        <Link href="/examples" className="text-indigo-300 hover:text-indigo-200 underline">
          interactive examples
        </Link>
        .
      </div>
    </div>
  );
}
