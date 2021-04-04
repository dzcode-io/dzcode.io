import { Application } from "express";
import { controllerLoader } from "./controller";
import { loggerLoader } from "./logger";
import { parserLoader } from "./parser";
import { securityLoader } from "./security";

export const rootLoader: Loader = ({ app }) => {
  loggerLoader({ app });
  securityLoader({ app });
  parserLoader({ app });
  controllerLoader({ app });
};

export type Loader = ({ app }: { app: Application }) => void;
