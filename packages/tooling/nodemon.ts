import { existsSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

console.log("Setting up nodemon.json ...");

const scope = process.argv[2];

if (!scope) throw new Error("Please provide a scope");

const stdout = execSync(
  `lerna list --include-dependencies --json --all --loglevel silent --scope ${scope}`,
);
const dependencies = JSON.parse(stdout.toString()) as Array<{ name: string; location: string }>;
const subPaths = ["dist", "models", ".env"];
const directoriesToWatch = dependencies
  .map<string>(({ location }) => location)
  .reduce<Array<string>>(
    (pV, location) => [...pV, ...subPaths.map((subPath) => join(location, subPath))],
    [],
  )
  .filter((location) => existsSync(location));

const nodemonJson = {
  watch: directoriesToWatch,
  delay: 1000,
};

writeFileSync(join(process.cwd(), "nodemon.json"), JSON.stringify(nodemonJson, null, 2));
console.log("Done setting up nodemon.json");
