"use client";

import { useState } from "react";
import { clsx } from "clsx";

type Props = {
  code: string;
  language: string;
  filename: string;
};

export function CodeBlock({ code, language, filename }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  const download = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 text-xs">
        <span className="text-zinc-500">
          {filename} · <span className="uppercase tracking-wider">{language}</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={copy}
            className={clsx(
              "px-2 py-1 rounded text-xs transition-colors",
              copied ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
            )}
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={download}
            className="px-2 py-1 rounded text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
          >
            Download
          </button>
        </div>
      </div>
      <pre className="flex-1 overflow-auto scrollbar-thin p-4 text-xs leading-relaxed font-mono whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
