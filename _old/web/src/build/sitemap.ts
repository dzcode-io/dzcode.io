import { getCollection } from "@dzcode.io/data/dist/collection";
import { allLanguages } from "@dzcode.io/models/dist/language";
import { createWriteStream } from "fs";
import { join } from "path";
import { SitemapStream } from "sitemap";

const distFolder = "./bundle";

// Static URLs
console.log("Getting Static URLs ...");
const urls = ["/", "/Contribute", "/Learn", "/Projects", "/Articles", "/FAQ", "/Team"].reduce(
  (pV, uri) => [...pV, ...allLanguages.map(({ code }) => (code === "en" ? uri : `/${code}${uri}`))],
  [] as string[],
);
console.log("✅", urls.length, "URLs Found");

// Dynamic URLs
// @TODO-ZM: to localize this
console.log("Getting Dynamic URLs ...");
[
  { file: "articles", slug: "Articles" },
  { file: "documentation", slug: "Learn" },
  // { file: "projects", slug: "Projects" }, // @TODO-ZM: to put back when we have proper project details page
].forEach((collectionInfo) => {
  const collection = getCollection<Record<string, string>>(
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
