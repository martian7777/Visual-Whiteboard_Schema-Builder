"use server";

import { getGemini, MODEL_ID, FALLBACK_MODEL_ID } from "@/lib/gemini";
import { SchemaOutput, SchemaOutputJsonSchema, sanitizeMermaid } from "@/lib/schema";
import { SYSTEM_PROMPT } from "@/lib/prompt";

export type GenerateInput = {
  imageBase64?: string;
  mime?: string;
  text?: string;
};

export type GenerateResult =
  | { ok: true; data: SchemaOutput; modelUsed: string }
  | { ok: false; error: string };

export async function generate(input: GenerateInput): Promise<GenerateResult> {
  const parts: Array<Record<string, unknown>> = [];

  if (input.imageBase64 && input.mime) {
    parts.push({
      inlineData: { data: input.imageBase64, mimeType: input.mime }
    });
  }
  if (input.text && input.text.trim()) {
    parts.push({ text: input.text.trim() });
  }
  if (parts.length === 0) {
    return { ok: false, error: "Provide an image or a text description." };
  }

  const ai = getGemini();

  async function callModel(modelId: string): Promise<string> {
    const res = await ai.models.generateContent({
      model: modelId,
      contents: [{ role: "user", parts }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseJsonSchema: SchemaOutputJsonSchema,
        temperature: 0.2
      }
    } as Parameters<typeof ai.models.generateContent>[0]);

    const text =
      typeof (res as { text?: unknown }).text === "function"
        ? ((res as unknown as { text: () => string }).text())
        : ((res as { text?: string }).text ?? "");
    if (!text) throw new Error("Empty response from Gemini");
    return text;
  }

  let raw: string;
  let modelUsed = MODEL_ID;
  try {
    raw = await callModel(MODEL_ID);
  } catch (primaryErr) {
    const msg = primaryErr instanceof Error ? primaryErr.message : String(primaryErr);
    if (/404|not found|unsupported/i.test(msg)) {
      try {
        modelUsed = FALLBACK_MODEL_ID;
        raw = await callModel(FALLBACK_MODEL_ID);
      } catch (fallbackErr) {
        return {
          ok: false,
          error:
            "Gemini call failed on both primary and fallback models: " +
            (fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr))
        };
      }
    } else {
      return { ok: false, error: "Gemini call failed: " + msg };
    }
  }

  try {
    const parsed = JSON.parse(raw);
    const data = SchemaOutput.parse(parsed);
    data.mermaid = sanitizeMermaid(data.mermaid);
    return { ok: true, data, modelUsed };
  } catch (err) {
    return {
      ok: false,
      error:
        "Model returned data that did not match the schema: " +
        (err instanceof Error ? err.message : String(err))
    };
  }
}
