"use client";

import { useState } from "react";
import { InputPanel } from "@/components/InputPanel";
import { ResultTabs } from "@/components/ResultTabs";
import { Hero } from "@/components/Hero";
import { CookingPanel } from "@/components/CookingPanel";
import type { GenerateResult } from "@/app/actions/generate";

export default function HomePage() {
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto space-y-8">
      <Hero />
      <div className="grid lg:grid-cols-[400px_1fr] gap-6 lg:h-[calc(100vh-280px)] lg:min-h-[520px]">
        <InputPanel
          onStart={() => {
            setLoading(true);
            setResult(null);
          }}
          onResult={(r) => {
            setLoading(false);
            setResult(r);
          }}
        />
        <div className="min-h-[480px] lg:min-h-0">
          {loading && <CookingPanel />}
          {!loading && result && result.ok && (
            <ResultTabs data={result.data} modelUsed={result.modelUsed} />
          )}
          {!loading && result && !result.ok && (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/5 p-6 text-sm text-red-300">
              {result.error}
            </div>
          )}
          {!loading && !result && <EmptyState />}
        </div>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="h-full rounded-2xl border border-dashed border-zinc-800 flex items-center justify-center text-center p-8">
      <div className="space-y-2 text-zinc-500 text-sm max-w-sm">
        <div className="text-zinc-300 font-medium">Nothing generated yet</div>
        <p>
          Drop a whiteboard photo, paste a screenshot from your clipboard, or describe the app you want
          to build. The schema, SQL, Prisma, and a live ER diagram appear here.
        </p>
      </div>
    </div>
  );
}
