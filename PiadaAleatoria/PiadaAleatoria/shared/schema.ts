import { z } from "zod";

export const piadaSchema = z.object({
  piada: z.string(),
});

export type Piada = z.infer<typeof piadaSchema>;
