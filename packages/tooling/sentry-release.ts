import { execSync } from "child_process";

const scope = process.argv[2];
if (!scope) throw new Error("Please provide a scope");

const uploadPath = process.argv[3];
if (!uploadPath) throw new Error("Please provide a uploadPath");

const version = process.argv[4];
if (!version) throw new Error("Please provide a version");

const environment = process.argv[5];
if (!environment) throw new Error("Please provide a environment");

const authToken = process.argv[6];
if (!authToken) throw new Error("Please provide a authToken");

const org = "dzcode";
const project = scope;

console.log(`Creating a Sentry release draft ...`);
const releaseScript = `sentry-cli --auth-token ${authToken} releases --org ${org} new --project ${project} ${scope}@${version}`;
console.log(`running:\n${releaseScript}`);
const releaseScriptStdout = String(execSync(releaseScript));
console.log(releaseScriptStdout);

console.log(`Uploading JS/Map files to the created Sentry release ...`);
const uploadScript = `sentry-cli --auth-token ${authToken} releases --org ${org} --project ${project} files ${scope}@${version} upload-sourcemaps ${uploadPath}`;
console.log(`running:\n${uploadScript}`);
const uploadScriptStdout = String(execSync(uploadScript));
console.log(uploadScriptStdout);

console.log(`Finalizing the created Sentry draft release`);
const finalizeScript = `sentry-cli --auth-token ${authToken} releases --org ${org} --project ${project} finalize ${scope}@${version}`;
console.log(`running:\n${finalizeScript}`);
const finalizeScriptStdout = String(execSync(finalizeScript));
console.log(finalizeScriptStdout);

console.log(`Linking a new deployment to the created Sentry release ...`);
const deployScript = `sentry-cli --auth-token ${authToken} releases --org ${org} deploys ${scope}@${version} new -e ${environment}`;
console.log(`running:\n${deployScript}`);
const deployScriptStdout = String(execSync(deployScript));
console.log(deployScriptStdout);

console.log(`Done creating, publishing and deploying the Sentry release ${scope}@${version}`);
