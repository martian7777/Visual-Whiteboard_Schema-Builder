"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;
function ensureInit() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    er: { useMaxWidth: true }
  });
  initialized = true;
}

export function MermaidPreview({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    ensureInit();
    if (!ref.current) return;
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    let cancelled = false;
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svg;
        setErr(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setErr(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div className="h-full overflow-auto scrollbar-thin p-4">
      <div ref={ref} className="flex justify-center" />
      {err && (
        <div className="mt-3 text-xs text-red-400">
          <div className="mb-1">Mermaid parse error:</div>
          <pre className="whitespace-pre-wrap text-zinc-500">{err}</pre>
        </div>
      )}
    </div>
  );
}
