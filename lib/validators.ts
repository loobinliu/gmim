import { z } from "zod";
import { backgrounds } from "@/lib/backgrounds";

export const quotePayloadSchema = z.object({
  text: z.string().trim().min(4).max(120),
  author: z.string().trim().min(1).max(40),
  source: z.string().trim().min(1).max(80).default("出处未详"),
  explanation: z.string().trim().min(20).max(220),
});

export const dateQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const posterRequestSchema = z.object({
  quoteId: z.string().optional(),
  embedInImage: z.boolean().default(true),
  backgroundId: z.enum(backgrounds.map((item) => item.id) as [string, ...string[]]).default("gradient-warm"),
  width: z.number().int().min(720).max(1600).default(1080),
  height: z.number().int().min(720).max(2000).default(1440),
});

export type QuotePayload = z.infer<typeof quotePayloadSchema>;
export type PosterRequest = z.infer<typeof posterRequestSchema>;
