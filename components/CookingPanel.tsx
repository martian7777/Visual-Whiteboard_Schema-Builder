"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Reading your whiteboard…",
  "Planning tables…",
  "Wiring foreign keys…",
  "Drawing the diagram…"
];

export function CookingPanel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-full rounded-2xl border border-zinc-800 bg-[var(--panel)] p-6 flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-4 max-w-sm">
        <div className="text-6xl animate-bounce" aria-hidden="true">
          👨‍🍳
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-100">
          AI is cooking something for you…
        </h2>
        <p
          key={i}
          className="text-sm text-zinc-400 transition-opacity duration-300 min-h-[1.25rem]"
        >
          {MESSAGES[i]}
        </p>
        <div className="flex items-center gap-1.5 pt-1">
          <span
            className="size-2 rounded-full bg-indigo-400 animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="size-2 rounded-full bg-indigo-400 animate-pulse"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="size-2 rounded-full bg-indigo-400 animate-pulse"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
}
