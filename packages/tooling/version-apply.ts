import { existsSync, writeFileSync } from "fs";
import { clean } from "semver";
import { execSync } from "child_process";
import { join } from "path";

const version = process.argv[2];
if (!version) throw new Error("Please provide a version");
const cleanVersion = clean(version);
if (!cleanVersion) throw new Error("Provided version does not follow semver format");
console.log(`Applying version ${version} ...`);

const args = process.argv.slice(3);
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
    packageJsonContent.version = cleanVersion;
    writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
    console.log(`Applied version ${version} to ${packageJsonPath}`);
    modifiedFilePaths.push(packageJsonPath);
  }

  const appJsonPath = join(location, "app.json");
  if (existsSync(appJsonPath)) {
    const appJsonContent = require(appJsonPath); // eslint-disable-line @typescript-eslint/no-var-requires
    appJsonContent.expo.version = cleanVersion;
    appJsonContent.expo.ios.buildNumber = cleanVersion;
    appJsonContent.expo.android.versionCode = Number(cleanVersion.replace(/\D/g, ""));
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
