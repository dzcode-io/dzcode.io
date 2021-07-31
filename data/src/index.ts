import { getDataCollection, getDataEntry } from "./.common/utils/data";
import express from "express";
import { fullstackConfig } from "./config";
import { join } from "path";

const app = express();
const port = fullstackConfig.data.port;

// Apply headers and logger
app.use((req, res, next) => {
  console.log(req.url);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Collections
app.get("/:type/:collection(\\S+.c.json$)", (req, res) =>
  res.json(getDataCollection(join(__dirname, ".."), req.params.type, req.params.collection)),
);

// Entries
app.get("/:type/:entry([\\/\\S]+.json$)", (req, res) =>
  res.json(
    getDataEntry(join(__dirname, ".."), `${req.params.type}/${req.params.entry.slice(0, -5)}`),
  ),
);

// Start the server
app.listen(port, () => console.log(`Data server listening at http://localhost:${port}`));
