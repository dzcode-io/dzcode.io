import express from "express";
import { fullstackConfig } from "./config";
import loader from "./loaders";
import routes from "./routes";

const app = express();
const port = process.env.PORT || fullstackConfig.api.port;

loader.init({ app });

app.use(routes);

// Start the server
app.listen(port, () =>
  console.log(`Api server listening at http://localhost:${port}`),
);
