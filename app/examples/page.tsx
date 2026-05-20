"use client";

import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import { EXAMPLES } from "@/lib/examples";
import { ResultTabs } from "@/components/ResultTabs";

export default function ExamplesPage() {
  const [activeId, setActiveId] = useState(EXAMPLES[0].id);
  const active = EXAMPLES.find((e) => e.id === activeId) ?? EXAMPLES[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-zinc-100">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-8">
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
            <span className="size-2 rounded-full bg-indigo-400 animate-pulse" />
            Pre-generated samples
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            See what you&apos;ll get,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              before generating
            </span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            These schemas were produced by the same model the builder uses. Browse the diagram, Prisma model, and raw SQL each example outputs. When ready, bring your own sketch.
          </p>
        </section>

        <section className="grid md:grid-cols-[260px_1fr] gap-4 sm:gap-6">
          <aside className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 px-2 pb-1">
              Examples
            </div>
            {EXAMPLES.map((ex) => {
              const selected = ex.id === activeId;
              return (
                <button
                  key={ex.id}
                  onClick={() => setActiveId(ex.id)}
                  className={clsx(
                    "w-full text-left rounded-xl border p-3 transition-colors",
                    selected
                      ? "border-indigo-500/60 bg-indigo-500/10"
                      : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60"
                  )}
                >
                  <div
                    className={clsx(
                      "text-sm font-medium",
                      selected ? "text-indigo-200" : "text-zinc-200"
                    )}
                  >
                    {ex.label}
                  </div>
                  <div className="text-xs text-zinc-500 leading-snug mt-1">
                    {ex.description}
                  </div>
                </button>
              );
            })}
          </aside>

          <div className="min-h-[560px] h-[70vh]">
            <ResultTabs data={active.data} modelUsed="example" />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-zinc-100">
              Ready to try your own sketch?
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Bring your own Gemini API key and turn a whiteboard photo into a schema.
            </p>
          </div>
          <Link
            href="/generate"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            Open the Builder
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.97H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </section>
      </main>
    </div>
  );
}
