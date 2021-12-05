import { execSync } from "child_process";

const version = process.argv[2];
if (!version) throw new Error("Please provide a version");

console.log(`Pushing version ${version} ...`);

const showRefsScript = `git show-ref --heads | grep -E $(git rev-parse HEAD)`;
console.log(`running:\n${showRefsScript}`);
const showRefsStdout = execSync(showRefsScript);
console.log("\n" + String(showRefsStdout));
const branches = String(showRefsStdout)
  .split("\n")
  .filter(Boolean)
  .map((headAndBranch) => headAndBranch.replace(/\S+\srefs\/heads\//, ""));

if (branches.length > 0) {
  const firstBranch = branches[0];
  console.log(String(execSync(`git stash`)));
  console.log(String(execSync(`git checkout ${firstBranch}`)));
  console.log(String(execSync(`git stash pop`)));
  console.log(String(execSync(`git add .`)));
  console.log(String(execSync(`git commit -m "version: ${version}\n[skip ci]" --no-verify`)));
  const headStdOut = String(execSync(`git rev-parse HEAD`));
  console.log(headStdOut);
  const firstBranchHeadHash = headStdOut.replace("\n", "");
  // console.log(String(execSync(`git push`)));

  if (branches.length > 1) {
    console.log(
      `found ${
        branches.length - 1
      } more branches with same HEAD, cherry-picking ${firstBranchHeadHash}...`,
    );
    // cherry-pick commit from outer block
  }
  console.log(`Done applying version ${version}`);
} else {
  console.log(`Skipping because no branches are found with the current HEAD`);
}
