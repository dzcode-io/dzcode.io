import { Application } from "express";
import { loggerLoader } from "./logger";
import { parserLoader } from "./parser";
import { securityLoader } from "./security";

export const rootLoader: Loader = (params) => {
  loggerLoader(params);
  securityLoader(params);
  parserLoader(params);
};

export type Loader = (params: { app: Application }) => void;
