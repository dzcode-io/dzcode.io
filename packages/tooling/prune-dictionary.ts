// check for unused keys in dictionary.ts and prefix them with "skip-"
// to manually remove them later after double checking

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";

const dictionaryPath = "./src/components/locale/dictionary.ts";
const dictionary = readFileSync(dictionaryPath, "utf-8");

const keysRegex = /\s\s"(.*)":/g;
const keys = Array.from(dictionary.matchAll(keysRegex)).map((match) => match[1]);
const filteredKeys = keys.filter((key) => !key.startsWith("skip-"));
const keysRecord = filteredKeys.reduce<Record<string, unknown>>((acc, key) => {
  acc[key] = null;
  return acc;
}, {});

const srcPath = "./src";
const exts = [".ts", ".tsx", ".js", ".jsx"];
const ignoreExts = ["dictionary.ts"];

const walk = (dir: string) => {
  const files = readdirSync(dir);
  for (const file of files) {
    const path = `${dir}/${file}`;
    if (statSync(path).isDirectory()) {
      walk(path);
    } else {
      if (!exts.some((ext) => path.endsWith(ext))) continue;
      if (ignoreExts.some((ext) => path.endsWith(ext))) continue;
      const content = readFileSync(path, "utf-8");
      const foundKeys = [];
      for (const key in keysRecord) {
        if (content.includes(key)) {
          console.log(`Found key: ${key} in ${path}`);

          foundKeys.push(key);
        }
      }
      foundKeys.forEach((key) => {
        delete keysRecord[key];
      });
    }
  }
};

walk(srcPath);

const unusedKeys = Object.keys(keysRecord);
console.log(`Found ${unusedKeys.length} unused keys`);

// prefix unused keys with "skip-" in dictionary variable
const newDictionary = dictionary.replace(keysRegex, (match, key) => {
  if (match.includes("skip-")) return match;

  if (unusedKeys.includes(key)) {
    return `  "skip-${key}":`;
  }
  return match;
});

writeFileSync(dictionaryPath, newDictionary);
