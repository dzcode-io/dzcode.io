import { writeFileSync } from "fs";
import { join } from "path";

console.log("Setting up .ts-prunerc ...");

const paths = ["node_modules", "coverage", "dist", "bundle"];
const tsPruneJson = { ignore: paths.join("|") };

writeFileSync(join(process.cwd(), ".ts-prunerc"), JSON.stringify(tsPruneJson, null, 2));
console.log("Done setting up .ts-prunerc");
