import { SitemapStream } from "sitemap";
import { createWriteStream } from "fs";
const distFolder = "./dist";
import { getDataCollection } from "../.common/utils/data";
import { join } from "path";

// Static URLs
console.log("Getting Static URLs ...");
const urls = ["/", "/Contribute", "/Learn", "/Projects", "/Articles", "/FAQ"];
console.log("✅", urls.length, "URLs Found");

// Dynamic URLs
console.log("Getting Dynamic URLs ...");
[
  { file: "articles", slug: "Articles" },
  { file: "documentation", slug: "Learn" },
  { file: "projects", slug: "Projects" },
].forEach((collectionInfo) => {
  const collection = getDataCollection<Record<string, string>>(
    join(__dirname, "../../../data"),
    collectionInfo.file,
    "ssr.json",
  );
  if (!Array.isArray(collection)) {
    throw new Error(`Collection is not an array: ${collection}`);
  }
  collection.forEach((entry) => {
    urls.push(`/${collectionInfo.slug}/${entry.slug}`);
  });
});
console.log("✅", urls.length, "URLs Found");

// Generate xml file
const sitemap = new SitemapStream({ hostname: "https://www.dzCode.io/" });
const path = join(distFolder, "w/main-sitemap.xml");
const writeStream = createWriteStream(path);
writeStream.on("error", (err) => {
  if (err) console.log("File writing error", err);
});

writeStream.on("ready", () => {
  sitemap.pipe(writeStream);
  urls.forEach((url) => {
    sitemap.write(url, undefined, (err) => {
      if (err) console.log("Sitemap generation error", err);
    });
  });

  sitemap.end();
});
