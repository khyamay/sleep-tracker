import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import "reflect-metadata";

dotenv.config();

import cookieParser from "cookie-parser";
import appRoutes from "./routes/sleepEntryRoutes";

export const app: Application = express();
async function createServer() {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/api", appRoutes);
}
createServer();
