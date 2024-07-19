import { z } from "zod";

export const SleepSummarySchema = z.object({
  name: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  entryCount: z.number().int().nonnegative()
});

export type ISleepSummary = z.infer<typeof SleepSummarySchema>;
