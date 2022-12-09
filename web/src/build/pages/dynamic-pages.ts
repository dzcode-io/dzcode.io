import { getCollection } from "@dzcode.io/data/dist/get/collection";
import { join } from "path";

import { PageInfo } from ".";

export const dynamicPages: PageInfo[] = [];

[
  { file: "articles", slug: "Articles" },
  { file: "documentation", slug: "Learn" },
  // { file: "projects", slug: "Projects" }, // @TODO-ZM: to put back when we have proper project details page
].forEach((collectionInfo) => {
  const collection = getCollection<Record<string, string>>(
    join(__dirname, "../../../../data"),
    collectionInfo.file,
    "ssr.json",
  );
  if (!Array.isArray(collection)) {
    throw new Error(`Collection is not an array: ${collection}`);
  }
  collection.forEach((entry) => {
    dynamicPages.push({
      uri: `/${collectionInfo.slug}/${entry.slug}`,
      title: `${entry.title} | DzCode i/o`,
      description: entry.description,
      ogImage: entry.image,
      keywords: entry.keywords,
      // @TODO-ZM: to localize this
      lang: "en",
    });
  });
});
