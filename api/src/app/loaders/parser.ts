import { json, urlencoded } from "express";

import { Loader } from ".";

export const parserLoader: Loader = ({ app }) => {
  app.use(json());
  app.use(urlencoded());
};
