// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { execSync } = require("child_process");
const { join, resolve } = require("path");
const { existsSync } = require("fs");

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = resolve(__dirname, "..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all the dependencies within the monorepo
const stdout = execSync(
  `lerna list --include-dependencies --json --all --loglevel silent --scope @dzcode.io/mobile`,
);
const dependencies = JSON.parse(stdout);
config.watchFolders = dependencies
  .map((dependency) =>
    join(dependency.location, dependency.name !== "@dzcode.io/mobile" ? "dist" : "src"),
  )
  .filter((dependency) => existsSync(dependency.location));
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPath = [
  resolve(projectRoot, "node_modules"),
  resolve(workspaceRoot, "node_modules"),
];

module.exports = config;
