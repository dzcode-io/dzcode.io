// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const path = require("path");
const findWorkspaceRoot = require("find-yarn-workspace-root");

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = findWorkspaceRoot(__dirname);
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Ignore `./api` deployment artifacts
config.resolver.blacklistRE = exclusionList([
  new RegExp(`${path.resolve(workspaceRoot, "api/oracle-cloud/build").replace(/\//g, "\\/")}\\/.*`),
]);

module.exports = config;
