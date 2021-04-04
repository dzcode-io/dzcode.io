import "reflect-metadata";

import { ConfigService } from "../config/service";
import { Container } from "typedi";
import express from "express";
import { rootLoader } from "./loaders";

// create express app
const app = express();

// add loaders
rootLoader({ app });

// start the app
const port = Container.get(ConfigService).env().PORT;

app.listen(port, () =>
  console.log(`Api server listening at http://localhost:${port}`),
);
