"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { CodeBlock } from "./CodeBlock";
import { MermaidPreview } from "./MermaidPreview";
import type { SchemaOutput } from "@/lib/schema";

type View = "diagram" | "prisma" | "sql" | "mermaid";

const TABS: { id: View; label: string }[] = [
  { id: "diagram", label: "Diagram" },
  { id: "prisma", label: "Prisma" },
  { id: "sql", label: "SQL" },
  { id: "mermaid", label: "Mermaid" }
];

export function ResultTabs({ data, modelUsed }: { data: SchemaOutput; modelUsed: string }) {
  const [view, setView] = useState<View>("diagram");
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "schema";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[var(--panel)] flex flex-col h-full min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div>
          <div className="text-sm font-medium">{data.title}</div>
          <div className="text-xs text-zinc-500">{data.summary}</div>
        </div>
        <div className="text-[10px] uppercase tracking-wider text-zinc-500">{modelUsed}</div>
      </div>
      <div className="flex gap-1 px-3 py-2 border-b border-zinc-800 bg-zinc-900/30">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            className={clsx(
              "px-3 py-1.5 text-xs rounded-md transition-colors",
              view === t.id ? "bg-indigo-500/20 text-indigo-200" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0">
        {view === "diagram" && <MermaidPreview code={data.mermaid} />}
        {view === "prisma" && (
          <CodeBlock code={data.prisma} language="prisma" filename={`${slug}.prisma`} />
        )}
        {view === "sql" && (
          <CodeBlock code={data.sql} language="sql" filename={`${slug}.sql`} />
        )}
        {view === "mermaid" && (
          <CodeBlock code={data.mermaid} language="mermaid" filename={`${slug}.mmd`} />
        )}
      </div>
    </div>
  );
}
