import prisma from "../config/database";
import { ISleepEntryInput, IUserSleepSummary } from "../types";

export const createSleepEntry = async (data: ISleepEntryInput) => {
  return prisma.sleepEntry.create({
    data: {
      ...data,
      entryDate: new Date(data.entryDate)
    }
  });
};

export const getAllSleepEntries = async (): Promise<IUserSleepSummary[]> => {
  const result = await prisma.sleepEntry.groupBy({
    by: ["name", "gender"],
    _count: {
      name: true
    }
  });
  // ISleepEntryInput & { _count: { name: string } }
  return result.map((entry: any) => ({
    name: entry.name,
    gender: entry.gender,
    entryCount: entry._count.name
  }));
};

export const getUserEntries = async (name: string) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return prisma.sleepEntry.findMany({
    where: {
      name: name,
      entryDate: {
        gte: sevenDaysAgo
      }
    },
    orderBy: {
      entryDate: "desc"
    },
    select: {
      entryDate: true,
      sleepDuration: true
    }
  });
};
