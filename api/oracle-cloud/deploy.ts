import { execSync } from "child_process";
import { join } from "path";
import { copySync, existsSync } from "fs-extra";

console.log("🏗  Preparing files ...");
const stdout = execSync(
  "lerna list --include-dependencies --json --all --loglevel silent --scope @dzcode.io/api",
);
const dependencies = JSON.parse(stdout.toString()) as Array<{ name: string; location: string }>;
const subPaths = ["dist", "package.json", "models"];
const workspaceRoot = join(__dirname, "../..");
const fromToRecords = dependencies
  .map<{ from: string; to: string }>(({ location }) => ({
    from: location,
    to: join(workspaceRoot, "api/oracle-cloud/build", location.replace(workspaceRoot, ".")),
  }))
  .reduce<Array<{ from: string; to: string }>>(
    (pV, { from, to }) => [
      ...pV,
      ...subPaths.map((subPath) => ({ from: join(from, subPath), to: join(to, subPath) })),
    ],
    [],
  )
  .filter(({ from }) => existsSync(from));

fromToRecords.push(
  { from: "./oracle-cloud/docker-compose.yml", to: "./oracle-cloud/build/docker-compose.yml" },
  { from: "./oracle-cloud/Dockerfile", to: "./oracle-cloud/build/Dockerfile" },
  { from: join(workspaceRoot, "package.json"), to: "./oracle-cloud/build/package.json" },
  { from: join(workspaceRoot, "yarn.lock"), to: "./oracle-cloud/build/yarn.lock" },
);

fromToRecords.forEach(({ from, to }) => {
  copySync(from, to);
  console.log(to);
});

console.log("✅ File preparation completed\n");

// Deploying with ssh
const isProduction = process.argv.includes("production");
console.log("⚙️  Deploying to", isProduction ? "Production" : "Staging", "...");

let logs: Buffer;
const sshServer = isProduction ? process.env.SSH_ADDRESS_PRD : process.env.SSH_ADDRESS_STG;
const appPath = "~/app";
const sshPrefix = "ssh -o StrictHostKeyChecking=no " + sshServer + " ";

// Check for existing containers
logs = execSync(sshPrefix + '"docker ps -aq"');

if (String(logs)) {
  // stop containers
  console.log("⚠️  Stopping all containers ...");
  logs = execSync(sshPrefix + '"docker stop \\$(docker ps -aq)"');
  console.log(String(logs));

  // delete containers
  console.log("⚠️  Deleting all containers ...");
  logs = execSync(sshPrefix + '"docker rm \\$(docker ps -aq)"');
  console.log(String(logs));
  console.log("✅ All containers stopped");
} else {
  console.log("⏩ No container found, skipping stopping containers.");
}

console.log("⚠️  Deleting old code ...");
logs = execSync(sshPrefix + '"rm -f -r ' + appPath + '"');
logs = execSync(sshPrefix + '"mkdir ' + appPath + '"');

console.log("⤴️  Uploading new code ...");
logs = execSync("rsync -r oracle-cloud/build/* " + sshServer + ":" + appPath);
console.log("✅ New code uploaded.");

console.log("\n⚙️  Starting up the app");
logs = execSync(sshPrefix + '"docker-compose -f ' + appPath + '/docker-compose.yml up -d --build"');
console.log(String(logs));
console.log("✅ Deployment successful.");
