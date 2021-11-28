import express from "express";
import { getConfig } from "./config";
import { join } from "path";
import { getCollection } from "./get/collection";
import { getEntry } from "./get/entry";

const app = express();

// Apply headers and logger
app.use((req, res, next) => {
  console.log(req.url);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Collections
app.get("/:type/:collection(\\S+.c.json$)", (req, res) =>
  res.json(
    getCollection(
      join(__dirname, ".."),
      req.params.type,
      req.params.collection,
      req.query.language as string,
    ),
  ),
);

// Entries
app.get("/:type/:entry([\\/\\S]+.json$)", (req, res) =>
  res.json(
    getEntry(
      join(__dirname, ".."),
      `${req.params.type}/${req.params.entry.slice(0, -5)}`,
      undefined,
      req.query.language as string,
    ),
  ),
);

// Start the server
const { port, url } = getConfig();
app.listen(port, () => console.log(`Data server listening at ${url}`));
