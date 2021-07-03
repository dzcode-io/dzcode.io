import fse from "fs-extra";
import glob from "glob";
import { join } from "path";

export interface Collection {
  items: string[] | "all";
  include: string[];
}

export const getDataEntry = <T = Record<string, unknown>>(_path: string, include?: string[]) => {
  const path = join(__dirname, "../../../data/models", _path);
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
    slug: _path.substring(_path.indexOf("/") + 1),
  };

  // Filter properties
  if (!include) {
    entry = { ...info };
  } else {
    entry = Object.keys(info)
      .filter((key) => include.includes(key))
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: info[key],
        }),
        {},
      );
  }

  // Read content.md
  if ((!include || include.includes("content")) && fse.existsSync(`${path}/content.md`))
    entry = {
      ...entry,
      content: String(fse.readFileSync(`${path}/content.md`)),
    };

  // Return the Entry
  return entry as T;
};

export const getDataCollection = <T = Record<string, unknown>>(
  collectionType: string,
  collectionName: string,
) => {
  // add .c
  collectionName = collectionName.replace(".c.json", ".json");
  // Collection doesn't exist
  const path = join(__dirname, "../../../data/models", collectionType, collectionName);
  if (!fse.existsSync(path)) return 404;

  // Read [collection].json
  const collection: Collection = fse.readJsonSync(path);
  let items: string[] = [];

  if (collection.items === "all") {
    const files = glob.sync(join(__dirname, `../../../data/models/${collectionType}/**/info.json`));
    const dPath = `data/models/${collectionType}/`;
    items = files.map((filePath) => {
      return filePath.substring(
        filePath.lastIndexOf(dPath) + dPath.length,
        filePath.lastIndexOf("/info.json"),
      );
    });
  } else {
    items = collection.items;
  }

  // Collect Entries
  const entries = items.map((slug) => {
    const entry = getDataEntry<T>(`${collectionType}/${slug}`, collection.include);
    return {
      slug,
      ...entry,
    };
  });

  // Return matched Entries of the Collection
  return entries as T[];
};
