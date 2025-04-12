// can be ran locally from ./api:
// SSH_ADDRESS_STG="user@x.x.x.x" SSH_PATH="path/to/private/ssh/key" npm run deploy:stg

import { execSync } from "child_process";
import { copySync, existsSync } from "fs-extra";
import { join } from "path";

console.log("🏗  Preparing files ...");
const stdout = execSync(
  "lerna list --include-dependencies --json --all --loglevel silent --scope @dzcode.io/api",
);
const dependencies = JSON.parse(stdout.toString()) as Array<{ name: string; location: string }>;
const subPaths = ["dist", "package.json", "models", "db"];
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
  { from: "./oracle-cloud/nginx.conf", to: "./oracle-cloud/build/nginx.conf" },
  { from: join(workspaceRoot, "package.json"), to: "./oracle-cloud/build/package.json" },
  { from: join(workspaceRoot, "package-lock.json"), to: "./oracle-cloud/build/package-lock.json" },
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
const sshKeyPath = process.env.SSH_PATH;
const appPath = "~/app";
const sshPrefix =
  "ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=60 -o ServerAliveCountMax=60 " +
  (sshKeyPath ? `-i ${sshKeyPath} ` : "") +
  sshServer +
  " ";

console.log("⚠️  Cleaning up old containers ...");
logs = execSync(sshPrefix + '"sudo docker container prune --force"');
console.log(String(logs));

console.log("⚠️  Cleaning up old images ...");
logs = execSync(sshPrefix + '"sudo docker image prune --force"');
console.log(String(logs));

console.log("⚠️  Deleting old code ...");
logs = execSync(sshPrefix + '"rm -f -r ' + appPath + '"');
console.log(String(logs));
logs = execSync(sshPrefix + '"mkdir ' + appPath + '"');
console.log(String(logs));

console.log("⤴️  Uploading new code ...");
logs = execSync(
  "rsync " +
    (sshKeyPath ? `-e "ssh -i ${sshKeyPath}" ` : "") +
    " -r oracle-cloud/build/* " +
    sshServer +
    ":" +
    appPath,
);
console.log(String(logs));

// note-zm: we must take down the containers before starting them up, our weak VPS can not handle
// the load of running containers and building new ones at the same time
// todo-zm: build images in CI and push to private Github registry, so our VPS will only pull the images
console.log("⚙️  Taking down running containers ...");
logs = execSync(sshPrefix + '"cd ' + appPath + ' && docker compose down --remove-orphans"');
console.log(String(logs));

console.log("\n⚙️  Starting up the app");
logs = execSync(
  sshPrefix + '"cd ' + appPath + ' && docker compose up -d --build --remove-orphans"',
);
console.log(String(logs));
console.log("✅ Deployment successful.");
