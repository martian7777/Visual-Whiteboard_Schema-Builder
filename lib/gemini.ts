import { GoogleGenAI } from "@google/genai";

export const MODEL_ID = "gemini-3.1-pro-preview";
export const FALLBACK_MODEL_ID = "gemini-2.5-pro";

let client: GoogleGenAI | null = null;

export function getGemini(customApiKey?: string): GoogleGenAI {
  if (customApiKey) {
    return new GoogleGenAI({ apiKey: customApiKey });
  }
  if (client) return client;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local or provide your own in the settings.");
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}
