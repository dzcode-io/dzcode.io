import { getDataCollection, getDataEntry } from "./.common/utils/data";
import fse from "fs-extra";
import glob from "glob";
import { join } from "path";

const outputFolder = "./dist/_data";

// Empty output folder
fse.ensureDirSync(outputFolder);
fse.emptyDirSync(outputFolder);

// Generate individual Entries:
glob("models/**/info.json", {}, (err, files) => {
  files.forEach((filePath) => {
    const entryInfoPath = filePath.substr(7);
    const path = entryInfoPath.slice(0, -"/info.json".length);
    const entry = getDataEntry(join(__dirname, ".."), path);
    fse.ensureFileSync(`${outputFolder}/${path}.json`);
    fse.writeJSON(`${outputFolder}/${path}.json`, entry);
  });
});

// Generate Collections:
glob("models/*/*.json", {}, (err, files) => {
  files.forEach((filePath) => {
    const collectionPath = filePath.substr(7);
    const backslashIndex = collectionPath.indexOf("/");
    const collectionType = collectionPath.slice(0, backslashIndex);
    const collectionName = collectionPath.slice(backslashIndex + 1);
    console.log(collectionType, collectionName);

    const collection = getDataCollection(join(__dirname, ".."), collectionType, collectionName);
    const collectionFilePath = `${outputFolder}/${collectionPath.slice(0, -5)}.c.json`;
    fse.ensureFileSync(collectionFilePath);
    fse.writeJSON(collectionFilePath, collection);
  });
});
