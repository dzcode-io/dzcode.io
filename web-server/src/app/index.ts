import express from "express";
import { log } from "src/_utils/log";
import path from "path";

const app = express();
const port = process.env.PORT || 6060;

const staticPath = path.join(__dirname, "../../../web/bundle");
const indexPath = path.join(staticPath, "index.html");

app.use(express.static(staticPath));

app.use((req, res) => {
  res.sendFile(indexPath);
});

app
  .listen(port, () => {
    log(`Server running at http://localhost:${staticPath}`);
  })
  .on("error", (err) => {
    log(`Failed to start server: ${err.message}`);
    process.exit(1);
  });
