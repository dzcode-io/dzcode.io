/* eslint-disable @typescript-eslint/no-var-requires */
const { SitemapStream } = require("sitemap");
const { createWriteStream } = require("fs");
const t9config = require("../../t9config");
const { join } = require("path");

// Static URLs
const urls = ["/", "/Contact-Us"];

// Dynamic URLs
const data = require("../../../fullstack/dist/utils/data");
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

// Generate xml file
const sitemap = new SitemapStream({
  hostname: "https://www.dzCode.io/",
  cacheTime: 600000,
});
const path = join(t9config.bundles.distFolder, "w/main/sitemap.xml");
const writeStream = createWriteStream(path);
sitemap.pipe(writeStream);
urls.forEach((url) => {
  sitemap.write(url);
});

sitemap.end();
