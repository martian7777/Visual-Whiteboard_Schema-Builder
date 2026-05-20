"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

export type ImagePayload = { base64: string; mime: string; previewUrl: string; sizeKb: number };

const MAX_DIMENSION = 1600;
const SUPPORTED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

async function fileToPayload(file: File): Promise<ImagePayload> {
  const mime = file.type || "image/png";
  if (!SUPPORTED.includes(mime)) {
    throw new Error(`Unsupported image type: ${mime}`);
  }
  const downscaled = await downscale(file);
  const base64 = downscaled.dataUrl.split(",")[1] ?? "";
  return {
    base64,
    mime: downscaled.mime,
    previewUrl: downscaled.dataUrl,
    sizeKb: Math.round((base64.length * 3) / 4 / 1024)
  };
}

async function downscale(file: File): Promise<{ dataUrl: string; mime: string }> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    const dataUrl = await readAsDataUrl(file);
    return { dataUrl, mime: file.type };
  }
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    const dataUrl = await readAsDataUrl(file);
    return { dataUrl, mime: file.type };
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();
  const outMime = "image/jpeg";
  return { dataUrl: canvas.toDataURL(outMime, 0.85), mime: outMime };
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

type Props = {
  value: ImagePayload | null;
  onChange: (img: ImagePayload | null) => void;
  enableClipboard?: boolean;
};

export function Dropzone({ value, onChange, enableClipboard = false }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      try {
        const payload = await fileToPayload(file);
        onChange(payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!enableClipboard) return;
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            void handleFile(file);
            e.preventDefault();
            return;
          }
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [enableClipboard, handleFile]);

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) void handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={clsx(
          "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
          dragOver ? "border-indigo-400 bg-indigo-500/10" : "border-zinc-700 hover:border-zinc-500"
        )}
      >
        {value ? (
          <div className="flex flex-col items-center gap-2">
            {}
            <img src={value.previewUrl} alt="preview" className="max-h-48 rounded-lg" />
            <div className="text-xs text-zinc-400">
              {value.mime} · {value.sizeKb} KB
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="text-xs text-zinc-300 underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-sm">
              {enableClipboard
                ? "Paste an image (Ctrl/Cmd+V), drop a file, or click to choose."
                : "Drop an image here, or click to choose."}
            </div>
            <div className="text-xs text-zinc-500">PNG · JPG · WEBP · GIF (auto-resized to ≤1600px)</div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <div className="text-sm text-red-400">{error}</div>}
    </div>
  );
}
