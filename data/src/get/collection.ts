import { join } from "path";
import glob from "glob";
import fse from "fs-extra";
import { getEntry } from "./entry";

export interface Collection {
  items: string[] | "all";
  include: string[];
}

export const getCollection = <T = Record<string, unknown>>(
  dataFolder: string,
  collectionType: string,
  collectionName: string,
  language?: string
) => {
  // add .c
  collectionName = collectionName.replace(".c.json", ".json");
  // Collection doesn't exist
  const path = join(dataFolder, "models", collectionType, collectionName);
  if (!fse.existsSync(path)) return 404;

  // Read [collection].json
  const collection: Collection = fse.readJsonSync(path);
  let items: string[] = [];

  if (collection.items === "all") {
    const files = glob.sync(
      join(dataFolder, "models", `/${collectionType}/**/info.json`)
    );
    const dPath = `data/models/${collectionType}/`;
    items = files.map((filePath) => {
      return filePath.substring(
        filePath.lastIndexOf(dPath) + dPath.length,
        filePath.lastIndexOf("/info.json")
      );
    });
  } else {
    items = collection.items;
  }

  // Collect Entries
  const entries = items.map((slug) => {
    const entry = getEntry<T>(
      dataFolder,
      `${collectionType}/${slug}`,
      collection.include,
      language
    );
    return {
      slug,
      ...entry,
    };
  });

  // Return matched Entries of the Collection
  return entries as T[];
};
