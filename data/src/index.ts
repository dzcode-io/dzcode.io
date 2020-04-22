import express from "express";
import { getDataEntry, getDataCollection } from "./utils/data";
const app = express();
const port = process.env.DATA_PORT || 9090;

// Entries
app.get("/:type/:entry([\\/\\S]+[^\\/]$)", (req, res) =>
  res.json(getDataEntry(`${req.params.type}/${req.params.entry}`)),
);

// Start the server
app.listen(port, () =>
  console.log(`Data server listening at http://localhost:${port}`),
);
