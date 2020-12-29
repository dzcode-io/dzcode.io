/* eslint-disable @typescript-eslint/no-var-requires */
const { SitemapStream } = require("sitemap");
const { createWriteStream } = require("fs");
const distFolder = "./dist";
const { join } = require("path");

// Static URLs
console.log("Getting Static URLs ...");
const urls = ["/", "/Contact-Us"];
console.log("✅", urls.length, "URLs Found");

// Dynamic URLs
console.log("Getting Dynamic URLs ...");
const data = require("@dzcode.io/common/dist/utils/data");
[
  { file: "articles", slug: "Articles" },
  { file: "documentation", slug: "Learn" },
  { file: "projects", slug: "Projects" },
].forEach((collectionInfo) => {
  const collection = data.getDataCollection(collectionInfo.file, "ssr.json");
  collection.forEach((entry) => {
    urls.push(`/${collectionInfo.slug}/${entry.slug}`);
  });
});
console.log("✅", urls.length, "URLs Found");

// Generate xml file
const sitemap = new SitemapStream({
  hostname: "https://www.dzCode.io/",
  cacheTime: 600000,
});
const path = join(distFolder, "w/main-sitemap.xml");
const writeStream = createWriteStream(path);
writeStream.on("error", (err) => {
  if (err) console.log("File writing error", err);
});

writeStream.on("ready", () => {
  sitemap.pipe(writeStream);
  urls.forEach((url) => {
    sitemap.write(url, null, (err) => {
      if (err) console.log("Sitemap generation error", err);
    });
  });

  sitemap.end();
});
