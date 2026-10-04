import { z } from 'zod';
import { dateSchema, idSchema, text, urlSchema } from './legacyState';

export const personalProofSchema = z.object({
  id: idSchema,
  title: text(160, 3),
  detail: text(2000, 10),
  source: text(500, 3),
  date: dateSchema.optional(),
  url: urlSchema,
}).strict();

export const personalProofListSchema = z.array(personalProofSchema).max(200)
  .refine(records => new Set(records.map(record => record.id)).size === records.length, 'Personal history contains duplicate record IDs');

export const personalProofFileSchema = z.object({
  format: z.literal('careerhq-personal-proof'),
  version: z.literal(1),
  records: personalProofListSchema.refine(records => records.length > 0, 'The personal-history file has no records'),
}).strict();
