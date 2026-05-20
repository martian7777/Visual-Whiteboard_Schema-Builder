"use client";

import { useState, useTransition } from "react";
import { clsx } from "clsx";
import { Dropzone, type ImagePayload } from "./Dropzone";
import { generate, type GenerateResult } from "@/app/actions/generate";

type Tab = "upload" | "paste" | "text";

type Props = {
  onResult: (result: GenerateResult) => void;
  onStart: () => void;
};

export function InputPanel({ onResult, onStart }: Props) {
  const [tab, setTab] = useState<Tab>("upload");
  const [image, setImage] = useState<ImagePayload | null>(null);
  const [pasted, setPasted] = useState<ImagePayload | null>(null);
  const [text, setText] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    (tab === "upload" && image) ||
    (tab === "paste" && pasted) ||
    (tab === "text" && text.trim().length > 6);

  const submit = () => {
    setError(null);
    onStart();
    startTransition(async () => {
      let payload: Parameters<typeof generate>[0] = {};
      if (tab === "upload" && image) {
        payload = { imageBase64: image.base64, mime: image.mime };
      } else if (tab === "paste" && pasted) {
        payload = { imageBase64: pasted.base64, mime: pasted.mime };
      } else if (tab === "text") {
        payload = { text };
      }
      const result = await generate(payload);
      if (!result.ok) setError(result.error);
      onResult(result);
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[var(--panel)] p-5 space-y-4">
      <div className="flex gap-1 p-1 rounded-lg bg-zinc-900/60 w-fit">
        {(["upload", "paste", "text"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              "px-3 py-1.5 text-sm rounded-md transition-colors",
              tab === t ? "bg-indigo-500/20 text-indigo-200" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {t === "upload" ? "Upload" : t === "paste" ? "Paste" : "Describe"}
          </button>
        ))}
      </div>

      {tab === "upload" && <Dropzone value={image} onChange={setImage} />}
      {tab === "paste" && <Dropzone value={pasted} onChange={setPasted} enableClipboard />}
      {tab === "text" && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          placeholder='Describe your app, e.g. "Twitter clone with users, tweets, likes, follows, and direct messages."'
          className="w-full rounded-lg bg-zinc-900/60 border border-zinc-800 p-3 text-sm outline-none focus:border-indigo-500/60 resize-none"
        />
      )}

      <button
        onClick={submit}
        disabled={!canSubmit || pending}
        className={clsx(
          "w-full py-2.5 rounded-lg font-medium text-sm transition-colors",
          !canSubmit || pending
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-400 text-white"
        )}
      >
        {pending ? "Cooking…" : "Generate schema"}
      </button>

      {error && <div className="text-sm text-red-400 whitespace-pre-wrap">{error}</div>}

      <div className="text-xs text-zinc-500">
        Powered by Gemini 3.1 Pro · vision + structured JSON output
      </div>
    </div>
  );
}
