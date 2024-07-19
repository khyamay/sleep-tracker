import express from "express";
import * as sleepEntryController from "../controllers";

const router = express.Router();

router.post("/sleep-entries", sleepEntryController.createSleepEntry);
router.get("/sleep-entries", sleepEntryController.getAllEntries);
router.get("/sleep-entries/:name", sleepEntryController.getUserEntries);

export default router;
