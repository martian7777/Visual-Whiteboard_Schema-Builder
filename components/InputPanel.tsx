"use client";

import { useState, useTransition, useEffect } from "react";
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

  const [showKeyModal, setShowKeyModal] = useState(false);
  const [hasUserApiKey, setHasUserApiKey] = useState(false);
  const [userApiKey, setUserApiKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gemini_user_api_key");
    if (saved) {
      setTimeout(() => {
        setHasUserApiKey(true);
        setUserApiKey(saved);
      }, 0);
    }
  }, []);

  const handleSaveKey = (key: string) => {
    if (key.trim()) {
      localStorage.setItem("gemini_user_api_key", key.trim());
      setUserApiKey(key.trim());
      setHasUserApiKey(true);
    } else {
      handleClearKey();
    }
    setShowKeyModal(false);
  };

  const handleClearKey = () => {
    localStorage.removeItem("gemini_user_api_key");
    setUserApiKey("");
    setHasUserApiKey(false);
    setShowKeyModal(false);
  };

  const hasInput =
    (tab === "upload" && image) ||
    (tab === "paste" && pasted) ||
    (tab === "text" && text.trim().length > 6);
  const canSubmit = Boolean(hasInput);

  const submit = () => {
    // Read the user API key directly from localStorage on submit
    const key = localStorage.getItem("gemini_user_api_key");
    if (!key) {
      setError("Please configure your custom Gemini API key first.");
      setShowKeyModal(true);
      return;
    }

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

      payload.userApiKey = key;

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
        {pending
          ? "Cooking…"
          : !hasUserApiKey
            ? "Set API key to generate"
            : "Generate schema"}
      </button>

      {!hasUserApiKey && (
        <button
          onClick={() => setShowKeyModal(true)}
          className="w-full text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 hover:bg-amber-500/15 transition-colors text-left"
        >
          Your own Gemini API key is required. Click here to add one (stored locally in your browser).
        </button>
      )}

      <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-800/60">
        <span>Powered by Gemini 3.1 Pro</span>
        <button
          onClick={() => setShowKeyModal(true)}
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          {hasUserApiKey ? "🔑 Key Configured" : "🔑 Set Custom Key"}
        </button>
      </div>

      {showKeyModal && (
        <KeyModal
          initialKey={userApiKey}
          onClose={() => setShowKeyModal(false)}
          onSave={handleSaveKey}
          onClear={handleClearKey}
        />
      )}

      {error && (
        <ErrorModal
          error={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}

function KeyModal({
  onClose,
  onSave,
  onClear,
  initialKey
}: {
  onClose: () => void;
  onSave: (key: string) => void;
  onClear: () => void;
  initialKey: string;
}) {
  const [keyInput, setKeyInput] = useState(initialKey);
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#11121a] p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
          <div className="flex items-center justify-center size-8 rounded-lg bg-indigo-500/10 text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Gemini API Key Settings</h2>
            <p className="text-xs text-zinc-500">Provide a custom key for requests</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-zinc-400 leading-relaxed">
            This app uses your own Gemini API key for every request. Grab one from Google AI Studio and paste it below. It is stored only in your local browser storage and sent directly with each generate call.
          </p>
          <div className="relative flex items-center">
            <input
              type={showKey ? "text" : "password"}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-lg bg-zinc-900/60 border border-zinc-800 p-2.5 pr-10 text-sm text-zinc-100 outline-none focus:border-indigo-500/60"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 text-zinc-500 hover:text-zinc-300"
            >
              {showKey ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.056.17.056.36 0 .531Z" />
                  <path d="M12.43 8.19l-3.62 3.62a3.75 3.75 0 0 0 5.17 5.17l3.62-3.62a5.25 5.25 0 0 0-5.17-5.17Z" />
                  <path d="M12 17.25c-.963 0-1.895-.189-2.753-.531L7.87 18.093A11.24 11.24 0 0 1 1.324 12.553a.75.75 0 0 1 0-.53 11.229 11.229 0 0 1 4.312-5.067l3.4 3.401a3.75 3.75 0 0 0 2.966 2.966l.002.002Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.056.17.056.36 0 .53-1.488 4.47-5.704 7.69-10.674 7.69-4.97 0-9.186-3.223-10.675-7.69a.762.762 0 0 1 0-.53ZM12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onSave(keyInput)}
            className="flex-1 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Save Key
          </button>
          {initialKey && (
            <button
              onClick={onClear}
              className="py-2 px-3 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-sm font-medium transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 text-sm font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ErrorModal({
  error,
  onClose
}: {
  error: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-red-950/60 bg-[#161212] p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-red-950/60">
          <div className="flex items-center justify-center size-8 rounded-lg bg-red-500/10 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-200">Generation Failed</h2>
            <p className="text-xs text-red-400/60">An error occurred during generation</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg bg-red-950/20 border border-red-900/30 p-3 max-h-48 overflow-y-auto scrollbar-thin">
            <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap leading-relaxed break-words">
              {error}
            </pre>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Please check your network status, ensure your Gemini API key (if custom configured) is valid and has active quotas, and try again.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 text-sm font-medium transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
