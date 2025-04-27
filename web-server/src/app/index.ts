import express from "express";
import path from "path";
import { generateProjectsSitemap } from "src/handler/projects-sitemap";

const app = express();
const port = process.env.PORT || 6060;

const staticPath = path.join(__dirname, "../../../web/bundle");
const indexPath = path.join(staticPath, "index.html");

app.get("/w/contributions-sitemap.xml", (req, res) => {
  res.status(200).send("OK");
});

app.get("/w/contributors-sitemap.xml", (req, res) => {
  res.status(200).send("OK");
});

app.get("/w/projects-sitemap.xml", async (req, res) => {
  const xml = await generateProjectsSitemap();
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(xml);
});

app.get(/^\/(?:([a-z]{2})\/)?projects\/(.*)$/, (req, res) => {
  const lang = req.params[0] || "en";
  const projectId = req.params[1];

  res.json({
    lang,
    projectId,
  });
});

app.get(/^\/(?:([a-z]{2})\/)?contribute\/(.*)$/, (req, res) => {
  const lang = req.params[0] || "en";
  const contributionId = req.params[1];

  res.json({
    lang,
    contributionId,
  });
});

app.get(/^\/(?:([a-z]{2})\/)?team\/(.*)$/, (req, res) => {
  const lang = req.params[0] || "en";
  const contributorId = req.params[1];

  res.json({
    lang,
    teamId: contributorId,
  });
});

app.use(express.static(staticPath));

app.use((req, res) => {
  res.sendFile(indexPath);
});

app
  .listen(port, () => {
    console.log(`Web Server running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.log(`Failed to start server: ${err.message}`);
    process.exit(1);
  });
