import { z } from "zod";

export const SleepEntrySchema = z.object({
  name: z.string().min(3, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  sleepDuration: z.number().min(0).max(24),
  entryDate: z
    .string()
    .transform((val) => {
      const date = new Date(val);
      return date.toISOString().split("T")[0];
    })
    .refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
      message: "Invalid date format. Use yyyy-mm-dd"
    })
});

export type ISleepEntry = z.infer<typeof SleepEntrySchema>;
