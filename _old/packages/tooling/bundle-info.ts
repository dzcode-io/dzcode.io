import { writeFileSync } from "fs";

// Get the version passed as argument
const version = process.argv[2];
if (!version) throw new Error("Please provide a version");

// Get the environment passed as argument
const environment = process.argv[3];
if (!environment) throw new Error("Please provide an environment");

console.log(`Creating .bundle-info.json ...`);

writeFileSync(
  ".bundle-info.json",
  JSON.stringify(
    {
      version,
      environment,
    },
    null,
    2,
  ),
);

console.log(`Done creating .bundle-info.json`);
