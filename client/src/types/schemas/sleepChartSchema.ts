import { z } from "zod";

export const SleepChartSchema = z.object({
  entryDate: z.string().datetime(),
  sleepDuration: z.number().nonnegative()
});

export type ISleepChart = z.infer<typeof SleepChartSchema>;
