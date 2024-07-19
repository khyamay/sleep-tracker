export interface IUserSleepSummary {
  name: string;
  gender: string;
  entryCount: number;
}

export interface IUserEntry {
  entryDate: string;
  sleepDuration: number;
}

export interface ISleepEntryInput {
  name: string;
  gender: string;
  sleepDuration: number;
  entryDate: string;
}
