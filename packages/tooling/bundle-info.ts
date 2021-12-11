import { writeFileSync } from "fs";

// Get the version passed as argument
const version = process.argv[2];
if (!version) throw new Error("Please provide a version");

console.log(`Creating .bundle-info.json ...`);

writeFileSync(
  ".bundle-info.json",
  JSON.stringify(
    {
      version,
    },
    null,
    2,
  ),
);

console.log(`Done creating .bundle-info.json`);
