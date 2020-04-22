import fse from "fs-extra";

export const getDataEntry = (path: string) => {
  // Entry doesn't exist
  if (!fse.existsSync(path)) return 404;

  // Read info.json
  const info = fse.readJsonSync(`${path}/info.json`);

  // Read content.md
  const content = String(fse.readFileSync(`${path}/content.md`));

  // Return the Entry
  return { ...info, content };
};
