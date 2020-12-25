import * as bodyParser from "body-parser";

import express, { Application } from "express";

import { fullstackConfig } from "./config";
import morgan from "morgan";
import routes from "./routes";

const app: Application = express();
const port: number = fullstackConfig.api.port;

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(routes);

// Start the server
app.listen(port, () =>
  console.log(`Api server listening at http://localhost:${port}`),
);
