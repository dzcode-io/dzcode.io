import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const scope = process.argv[2];
if (!scope) throw new Error("Please provide a scope");

const workspaceRoot = join(__dirname, "../..");
const dockerFilePath = join(workspaceRoot, `${scope.replace("@dzcode.io/", "")}.Dockerfile`);

console.log(`writing ${dockerFilePath} ...`);

const stdout = execSync(
  `lerna list --include-dependencies --json --all --loglevel silent --scope ${scope}`,
);
const dependencies = JSON.parse(stdout.toString()) as Array<{ name: string; location: string }>;
const subPaths = ["dist", "bundle", "package.json", "db", "models"];
const directoriesToCopy = dependencies
  .map<string>(({ location }) => location)
  .reduce<Array<string>>(
    (pV, location) => [...pV, ...subPaths.map((subPath) => join(location, subPath))],
    [],
  )
  .filter((location) => existsSync(location));

const dockerfileContent = readFileSync(dockerFilePath, { encoding: "utf-8" });
const newContent = directoriesToCopy
  .map((dir) => {
    const relativePath = dir.replace(workspaceRoot, ".").replace(/\\/g, "/");
    return `COPY ${relativePath} ${relativePath}`;
  })
  .join("\n");

const newDockerfileContent = dockerfileContent.replace(
  /# AUTO_GEN[\s\S]*?# AUTO_GEN_END/,
  `# AUTO_GEN
${newContent}
# AUTO_GEN_END`,
);
writeFileSync(dockerFilePath, newDockerfileContent);

console.log("Done writing Dockerfile");
