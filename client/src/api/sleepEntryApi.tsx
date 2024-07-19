import { z } from "zod";

import { API_URLS } from "@/constants/apiUrls";
import {
  ISleepChart,
  ISleepEntry,
  ISleepSummary,
  SleepChartSchema,
  SleepEntrySchema,
  SleepSummarySchema
} from "@/types/schemas";

export const getAllSleepEntries = async (): Promise<ISleepSummary[]> => {
  const response = await fetch(API_URLS.SLEEP_ENTRIES);
  const data = await response.json();
  return z.array(SleepSummarySchema).parse(data);
};

export const getUserEntries = async (
  userName: string
): Promise<ISleepChart[]> => {
  const response = await fetch(API_URLS.USER_ENTRIES(userName));
  const data = await response.json();
  return z.array(SleepChartSchema).parse(data);
};

export const addSleepEntry = async (
  data: ISleepEntry
): Promise<ISleepEntry> => {
  const validatedData = SleepEntrySchema.parse(data);
  const response = await fetch(API_URLS.SLEEP_ENTRIES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedData)
  });
  return SleepEntrySchema.parse(await response.json());
};
