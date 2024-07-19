import { Request, Response } from "express";

import { errorMessages } from "../constants";
import * as sleepEntryService from "../services";

export const createSleepEntry = async (req: Request, res: Response) => {
  try {
    const result = await sleepEntryService.createSleepEntry(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const getAllEntries = async (_req: Request, res: Response) => {
  try {
    const result = await sleepEntryService.getAllSleepEntries();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const getUserEntries = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const result = await sleepEntryService.getUserEntries(name);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: errorMessages.INTERNAL_SERVER_ERROR });
  }
};
