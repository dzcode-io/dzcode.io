import { Router } from "express";
import { parserLoader } from "./parser";

export const rootLoader: Loader = (params) => {
  parserLoader(params);
};

export type Loader = (params: { app: Router }) => void;
