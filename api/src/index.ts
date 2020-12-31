import * as bodyParser from "body-parser";

import express, { Application } from "express";

import cors from "cors";
import { fullstackConfig } from "./config";
import morgan from "morgan";
import routes from "./routes";

const app: Application = express();
const port: number = fullstackConfig.api.port;

app.use(
  cors({
    allowedHeaders:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:8080"]
        : ["https://api.dzcode.io"],
    origin: true,
  }),
);
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(routes);

// Start the server
app.listen(port, () =>
  console.log(`Api server listening at http://localhost:${port}`),
);
