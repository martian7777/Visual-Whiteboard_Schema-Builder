import { GoogleGenAI } from "@google/genai";

export const MODEL_ID = "gemini-3.1-pro-preview";
export const FALLBACK_MODEL_ID = "gemini-2.5-pro";

export const MISSING_KEY_ERROR =
  "User Gemini API key required. Set it in the key modal.";

export function getGemini(customApiKey?: string): GoogleGenAI {
  const key = customApiKey?.trim();
  if (!key) {
    throw new Error(MISSING_KEY_ERROR);
  }
  return new GoogleGenAI({ apiKey: key });
}
