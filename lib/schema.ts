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
