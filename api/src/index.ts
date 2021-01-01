import * as bodyParser from "body-parser";

import cors from "cors";
import express from "express";
import { fullstackConfig } from "./config";
import morgan from "morgan";
import routes from "./routes";

const app = express();
const port = process.env.PORT || fullstackConfig.api.port;

app.use(
  cors({
    allowedHeaders:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:8080"]
        : ["https://www.dzcode.io"],
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
