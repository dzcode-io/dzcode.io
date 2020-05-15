import fse from "fs-extra";
import glob from "glob";
import { getDataEntry, getDataCollection } from "./utils/data";

const outputFolder = "../frontend/firebase/data";

// Empty output folder
fse.ensureDirSync(outputFolder);
fse.emptyDirSync(outputFolder);

// Generate individual Entries:
glob("**/info.json", {}, (err, files) => {
  files.forEach(entryInfoPath => {
    const path = entryInfoPath.slice(0, -"/info.json".length);
    const entry = getDataEntry(path);
    fse.ensureFileSync(`${outputFolder}/${path}.json`);
    fse.writeJSON(`${outputFolder}/${path}.json`, entry);
  });
});

// Generate Collections:
glob("*/*.json", {}, (err, files) => {
  files.forEach(collectionPath => {
    const backslashIndex = collectionPath.indexOf("/");
    const collectionType = collectionPath.slice(0, backslashIndex);
    const collectionName = collectionPath.slice(backslashIndex + 1);
    const collection = getDataCollection(collectionType, collectionName);
    const collectionFilePath = `${outputFolder}/${collectionPath.slice(
      0,
      -5,
    )}.c.json`;
    fse.ensureFileSync(collectionFilePath);
    fse.writeJSON(collectionFilePath, collection);
  });
});
