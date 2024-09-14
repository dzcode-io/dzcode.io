import { allLanguages } from "@dzcode.io/models/dist/language";
import { createWriteStream } from "fs";
import { join } from "path";
import { SitemapStream } from "sitemap";
import { staticPages } from "./pages";

const distFolder = "./bundle";

// Static URLs
console.log("Getting Static URLs ...");
const urls = staticPages.map(({ uri }) => uri);

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
    const lang = allLanguages.find(({ code }) => `/${code}/` === url.substring(0, 4))?.code || "en";
    sitemap.write(
      {
        url,
        links: [{ lang, url }],
      },
      undefined,
      (err) => {
        if (err) console.log("Sitemap generation error", err);
      },
    );
  });

  sitemap.end();
});
