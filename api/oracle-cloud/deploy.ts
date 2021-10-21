import { copySync } from "fs-extra";
import { execSync } from "child_process";

// Coping files
console.log("⚙️  Preparing files ...");
// root
copySync("../package.json", "./oracle-cloud/build/package.json");
// data
copySync("../data/package.json", "./oracle-cloud/build/data/package.json");
copySync("../data/dist", "./oracle-cloud/build/data/dist");
copySync("../data/models", "./oracle-cloud/build/data/models");
// api
copySync("./package.json", "./oracle-cloud/build/api/package.json");
copySync("./dist", "./oracle-cloud/build/api/dist");
copySync("./oracle-cloud/docker-compose.yml", "./oracle-cloud/build/docker-compose.yml");
copySync("./oracle-cloud/Dockerfile", "./oracle-cloud/build/Dockerfile");
console.log("✅ files copied\n");

// Deploying with ssh
const isProduction = process.argv.includes("production");
console.log("⚙️  Deploying to", isProduction ? "Production" : "Staging", "...");

let logs;
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
