/* eslint-disable @typescript-eslint/no-var-requires */

const fse = require("fs-extra");
const cp = require("child_process");

// Coping files
console.log("⚙️  Preparing files ...");
fse.copySync("../package.json", "./oracle-cloud/build/package.json");
fse.copySync(
  "../common/package.json",
  "./oracle-cloud/build/common/package.json",
);
fse.copySync("../common/dist", "./oracle-cloud/build/common/dist");
fse.copySync("./package.json", "./oracle-cloud/build/api/package.json");
fse.copySync("./dist", "./oracle-cloud/build/api/dist");
fse.copySync(
  "./oracle-cloud/docker-compose.yml",
  "./oracle-cloud/build/docker-compose.yml",
);
fse.copySync("./oracle-cloud/Dockerfile", "./oracle-cloud/build/Dockerfile");
console.log("✅ files copied\n");

// Deploying with ssh
const isProduction = process.argv.includes("production");
console.log("⚙️  Deploying to", isProduction ? "Production" : "Staging", "...");

let logs;
const sshServer = isProduction
  ? process.env.SSH_ADDRESS_PRD
  : process.env.SSH_ADDRESS_STG;
const appPath = "~/app";
const sshPrefix = "ssh -o StrictHostKeyChecking=no " + sshServer + " ";

// Check for existing containers
logs = cp.execSync(sshPrefix + '"docker ps -aq"');

if (String(logs)) {
  // stop containers
  console.log("⚠️  Stopping all containers ...");
  logs = cp.execSync(sshPrefix + '"docker stop \\$(docker ps -aq)"');
  console.log(String(logs));

  // delete containers
  console.log("⚠️  Deleting all containers ...");
  logs = cp.execSync(sshPrefix + '"docker rm \\$(docker ps -aq)"');
  console.log(String(logs));
  console.log("✅ All containers stopped");
} else {
  console.log("⏩ No container found, skipping stopping containers.");
}

console.log("⚠️  Deleting old code ...");
logs = cp.execSync(sshPrefix + '"rm -f -r ' + appPath + '"');
logs = cp.execSync(sshPrefix + '"mkdir ' + appPath + '"');

console.log("⤴️  Uploading new code ...");
logs = cp.execSync(
  "rsync -r oracle-cloud/build/* " + sshServer + ":" + appPath,
);
console.log("✅ New code uploaded.");

console.log("\n⚙️  Starting up the app");
logs = cp.execSync(
  sshPrefix +
    '"docker-compose -f ' +
    appPath +
    '/docker-compose.yml up -d --build"',
);
console.log(String(logs));
console.log("✅ Deployment successful.");
