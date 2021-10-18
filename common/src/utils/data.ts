import fse from "fs-extra";
import glob from "glob";
import { join } from "path";

export interface Collection {
  items: string[] | "all";
  include: string[];
}

export const getDataEntry = <T = Record<string, unknown>>(
  dataFolder: string,
  _path: string,
  include?: string[],
  language?: string,
) => {
  const path = join(dataFolder, "models", _path);
  // Entry doesn't exist
  if (!fse.existsSync(path))
    return {
      error: {
        code: 404,
      },
    };

  let entry = {};

  // Read info.json
  let info = {
    ...fse.readJsonSync(`${path}/info.json`),
    slug: _path.substring(_path.indexOf("/") + 1),
  };

  // check if the info file contain a title for
  // the given language
  const INFO_CONTAINS_LANG_TITLE = language && info[language].title;
  info = INFO_CONTAINS_LANG_TITLE ? info[language as string] : info;

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
  if (
    (!include || include.includes("content")) &&
    fse.existsSync(`${path}/content.md`) &&
    !INFO_CONTAINS_LANG_TITLE
  )
    entry = {
      ...entry,
      content: String(fse.readFileSync(`${path}/content.md`)),
    };

  // Return the Entry
  return entry as T;
};

export const getDataCollection = <T = Record<string, unknown>>(
  dataFolder: string,
  collectionType: string,
  collectionName: string,
  language?: string,
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
    const files = glob.sync(join(dataFolder, "models", `/${collectionType}/**/info.json`));
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
    const entry = getDataEntry<T>(
      dataFolder,
      `${collectionType}/${slug}`,
      collection.include,
      language,
    );
    return {
      slug,
      ...entry,
    };
  });

  // Return matched Entries of the Collection
  return entries as T[];
};
