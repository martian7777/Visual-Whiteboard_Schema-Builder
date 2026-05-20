import { GoogleGenAI } from "@google/genai";

export const MODEL_ID = "gemini-3.1-pro-preview";
export const FALLBACK_MODEL_ID = "gemini-2.5-pro";

let client: GoogleGenAI | null = null;

export function getGemini(): GoogleGenAI {
  if (client) return client;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local");
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}
