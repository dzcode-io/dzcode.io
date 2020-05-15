import fse from "fs-extra";
import { Collection } from "../types";

export const getDataEntry = (path: string, include?: string[]) => {
  // Entry doesn't exist
  if (!fse.existsSync(path))
    return {
      error: {
        code: 404,
      },
    };

  let entry = {};

  // Read info.json
  const info = {
    ...fse.readJsonSync(`${path}/info.json`),
    slug: path.substring(path.indexOf("/") + 1),
  };

  // Filter properties
  if (!include) {
    entry = { ...info };
  } else {
    entry = Object.keys(info)
      .filter(key => include.includes(key))
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: info[key],
        }),
        {},
      );
  }

  // Read content.md
  if (!include || include.includes("content"))
    entry = {
      ...entry,
      content: String(fse.readFileSync(`${path}/content.md`)),
    };

  // Return the Entry
  return entry;
};

export const getDataCollection = (
  collectionType: string,
  collectionName: string,
) => {
  // add .c
  collectionName = collectionName.replace(".c.json", ".json");
  // Collection doesn't exist
  const path = `${collectionType}/${collectionName}`;
  if (!fse.existsSync(path)) return 404;

  // Read [collection].json
  const collection: Collection = fse.readJsonSync(path);

  // Collect Entries
  const entries = collection.items.map(slug => {
    const entry = getDataEntry(`${collectionType}/${slug}`, collection.include);
    return {
      slug,
      ...entry,
    };
  });

  // Return matched Entries of the Collection
  return entries;
};
