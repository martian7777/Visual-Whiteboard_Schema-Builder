import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About · Visual Whiteboard",
  description: "What Visual Whiteboard → Schema Builder is and why it exists."
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
          <span className="size-1.5 rounded-full bg-indigo-400" /> About
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">About this project</h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Visual Whiteboard → Schema Builder turns a rough sketch on a whiteboard, a pasted
          screenshot, or a plain-English description of an app into a usable database design — Prisma
          schema, raw Postgres SQL, and a live Mermaid ER diagram — in a single shot.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-100">The problem</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Every new product starts with someone scribbling tables on a whiteboard. Translating those
          arrows and column names into a real, normalized schema is tedious busywork that delays the
          first commit. This tool collapses that step.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-100">How it&apos;s built</h2>
        <ul className="text-sm text-zinc-400 space-y-1.5 list-disc pl-5">
          <li>Next.js 15 with the App Router and React Server Actions</li>
          <li>React 19 on the client</li>
          <li>Tailwind v4 for styling</li>
          <li>Google Gemini 3.1 Pro for vision + structured JSON output (Gemini 2.5 Pro fallback)</li>
          <li>Zod for runtime schema validation of the model&apos;s response</li>
          <li>Mermaid 11 for live ER diagram rendering</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-100">Output you get</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          One generation produces a structured tables/columns list, a Prisma schema (with datasource
          and generator blocks), CREATE TABLE statements ordered so foreign keys resolve, and an
          erDiagram block rendered live in the browser. Read more on the{" "}
          <Link href="/how-it-works" className="text-indigo-300 hover:text-indigo-200 underline">
            How it works
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
  );
}
