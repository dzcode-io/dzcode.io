import { existsSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const version = process.argv[2];
const args = process.argv.slice(3);
if (!version) throw new Error("Please provide a version");

console.log(`Applying version ${version} ...`);
const lernaScript = `lerna list --include-dependencies --include-dependents --json --all --loglevel silent ${args.join(
  " ",
)}`;
console.log(`running:\n${lernaScript}`);
const stdout = execSync(lernaScript);
const dependencies = JSON.parse(stdout.toString()) as Array<{ name: string; location: string }>;
const modifiedFilePaths: string[] = [];

dependencies.forEach(({ location }) => {
  const packageJsonPath = join(location, "package.json");
  if (existsSync(packageJsonPath)) {
    const packageJsonContent = require(packageJsonPath); // eslint-disable-line @typescript-eslint/no-var-requires
    packageJsonContent.version = version;
    writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
    console.log(`Applied version ${version} to ${packageJsonPath}`);
    modifiedFilePaths.push(packageJsonPath);
  }

  const appJsonPath = join(location, "app.json");
  if (existsSync(appJsonPath)) {
    const appJsonContent = require(appJsonPath); // eslint-disable-line @typescript-eslint/no-var-requires
    const clearedVersion = version.replace(/(stg\-v|v)/, "");
    appJsonContent.expo.version = clearedVersion;
    appJsonContent.expo.ios.buildNumber = clearedVersion;
    appJsonContent.expo.android.versionCode = Number(version.replace(/\D/g, ""));
    writeFileSync(appJsonPath, JSON.stringify(appJsonContent, null, 2));
    console.log(`Applied version ${version} to ${appJsonPath}`);
    modifiedFilePaths.push(appJsonPath);
  }
});

const prettierScript = `prettier --config ./packages/tooling/.prettierrc --ignore-path ./packages/tooling/.prettierignore --write ${modifiedFilePaths.join(
  " ",
)}`;
console.log(`running:\n${prettierScript}`);
const prettierStdout = execSync(prettierScript);
console.log("\n" + String(prettierStdout));

console.log(`Done applying version ${version}`);
