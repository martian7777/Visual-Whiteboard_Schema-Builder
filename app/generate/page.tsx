"use client";

import { useState } from "react";
import { InputPanel } from "@/components/InputPanel";
import { ResultTabs } from "@/components/ResultTabs";
import { Hero } from "@/components/Hero";
import { CookingPanel } from "@/components/CookingPanel";
import type { GenerateResult } from "@/app/actions/generate";

export default function GeneratePage() {
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <main className="min-h-screen px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <Hero />
      <div className="grid lg:grid-cols-[400px_1fr] gap-6 lg:h-[calc(100vh-280px)] lg:min-h-[520px]">
        <InputPanel
          onStart={() => {
            setLoading(true);
            setResult(null);
          }}
          onResult={(r) => {
            setLoading(false);
            if (r.ok) {
              setResult(r);
              setErrorMsg(null);
            } else {
              setResult(null);
              setErrorMsg(r.error);
            }
          }}
        />
        <div className="min-h-[480px] lg:min-h-0">
          {loading && <CookingPanel />}
          {!loading && result && result.ok && (
            <ResultTabs data={result.data} modelUsed={result.modelUsed} />
          )}
          {!loading && !result && <EmptyState />}
        </div>
      </div>

      {/* Error Modal Popup */}
      {errorMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-200">Generation Failed</h3>
                  <p className="text-xs text-zinc-500">Gemini was unable to build your schema.</p>
                </div>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Error Message Box */}
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-4 space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Error Details</span>
              <div className="max-h-[160px] overflow-auto text-xs text-red-400 font-mono leading-relaxed break-words scrollbar-thin select-text whitespace-pre-wrap">
                {errorMsg}
              </div>
            </div>

            {/* Troubleshooting Info */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Troubleshooting Tips</span>
              <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-4 leading-relaxed">
                <li>Verify your Gemini API Key is set and valid.</li>
                <li>Make sure you haven&apos;t run out of API rate limits or quota.</li>
                <li>Ensure the sketch or prompt describes tables and columns.</li>
              </ul>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setErrorMsg(null)}
                className="px-4 py-2 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors"
              >
                Dismiss
              </button>
            </div>

          </div>
        </div>
      )}
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
