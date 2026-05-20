# Visual Whiteboard → Schema Builder

One-shot AI tool that turns an ER-diagram sketch (or app description) into:

- a **Prisma** `schema.prisma`
- a **Supabase-flavored Postgres** SQL file
- a **Mermaid** `erDiagram` + live-rendered SVG preview

Built with **Next.js 15 (App Router) · React 19 · Tailwind v4 · Gemini 3.1 Pro · Mermaid**.

## Setup

```bash
npm install
cp .env.example .env.local
# edit .env.local and set GEMINI_API_KEY (get one at https://aistudio.google.com/apikey)
npm run dev
```

Open <http://localhost:3000>.

## How it works

```
User input  ──►  Next.js Server Action  ──►  Gemini 3.1 Pro (vision + JSON Schema)  ──►  { prisma, sql, mermaid }  ──►  client UI
   (image | clipboard paste | text)        responseJsonSchema = Zod schema
```

The model is forced to return a single JSON object that matches `lib/schema.ts`. The client
renders the three artifacts in tabbed panels and lets you copy or download each one.

## Inputs supported

- **Upload** — drag-and-drop or file picker (PNG · JPG · WEBP · GIF). Images are downscaled to ≤1600 px client-side before being base64-encoded into the Server Action.
- **Paste** — Ctrl/Cmd + V a screenshot anywhere on the page while the Paste tab is open.
- **Describe** — type a plain-English app idea.

## Project layout

```
app/
  page.tsx              client shell, wires InputPanel ↔ ResultTabs
  layout.tsx
  globals.css
  actions/generate.ts   "use server" — the only Gemini call
components/
  InputPanel.tsx        tabs: Upload / Paste / Describe
  Dropzone.tsx          drag-drop + clipboard paste + client-side downscale
  ResultTabs.tsx        Diagram / Prisma / SQL / Mermaid tabs
  CodeBlock.tsx         copy + download
  MermaidPreview.tsx    client-side mermaid.render()
  Hero.tsx
lib/
  gemini.ts             SDK init + model ids
  schema.ts             Zod contract + JSON Schema export
  prompt.ts             system prompt
```

## Model

- Primary: `gemini-3.1-pro-preview` (latest, best vision + reasoning)
- Fallback: `gemini-2.5-pro` (auto-switched if primary returns 404)

Change them in [lib/gemini.ts](lib/gemini.ts).

## Notes

- No database. No auth. Stateless one-shot.
- Server Action body limit is raised to 6 MB in `next.config.ts`.
- Mermaid runs only on the client (`"use client"` + dynamic `mermaid.render()`).
