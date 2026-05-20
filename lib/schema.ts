import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const ColumnSchema = z.object({
  name: z.string(),
  type: z.string(),
  nullable: z.boolean(),
  primaryKey: z.boolean(),
  unique: z.boolean(),
  references: z.string().nullable()
});

export const TableSchema = z.object({
  name: z.string(),
  columns: z.array(ColumnSchema)
});

export const SchemaOutput = z.object({
  title: z.string(),
  summary: z.string(),
  tables: z.array(TableSchema),
  prisma: z.string(),
  sql: z.string(),
  mermaid: z.string()
});

export type SchemaOutput = z.infer<typeof SchemaOutput>;

export const SchemaOutputJsonSchema = zodToJsonSchema(SchemaOutput, {
  $refStrategy: "none",
  target: "openApi3"
});

const KEY_RUN_RE = /\b(PK|FK|UK)(?:\s+(PK|FK|UK))+\b/g;

export function sanitizeMermaid(input: string): string {
  return input.replace(KEY_RUN_RE, (match) => {
    const tokens = match.split(/\s+/).filter(Boolean);
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const t of tokens) {
      const up = t.toUpperCase();
      if (!seen.has(up)) {
        seen.add(up);
        ordered.push(up);
      }
    }
    return ordered.join(",");
  });
}
