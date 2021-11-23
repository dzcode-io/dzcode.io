import { join } from "path";
import fse from "fs-extra";

export const getEntry = <T = Record<string, unknown>>(
  dataFolder: string,
  _path: string,
  include?: string[],
  language?: string
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
  const INFO_CONTAINS_LANG_TITLE = language && info[language]?.title;
  info = INFO_CONTAINS_LANG_TITLE ? info[language] : info;

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
        {}
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
