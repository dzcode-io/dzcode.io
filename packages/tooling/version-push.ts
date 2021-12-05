import { execSync } from "child_process";

const version = process.argv[2];
if (!version) throw new Error("Please provide a version");

console.log(`Pushing version ${version} ...`);

const currentHeadHashStdout = String(execSync(`git rev-parse HEAD`));
console.log("\n" + currentHeadHashStdout);
const currentHeadHash = currentHeadHashStdout.replace("\n", "");

const showRefsStdout = String(execSync(`git show-ref --heads`));
const branches = showRefsStdout
  .split("\n")
  .filter((headAndBranch) => headAndBranch.startsWith(currentHeadHash))
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
  console.log(String(execSync(`git push`)));
  console.log(String(execSync(`git tag ${version} -f`)));
  console.log(String(execSync(`git push --tags -f`)));

  if (branches.length > 1) {
    console.log(
      `found ${
        branches.length - 1
      } more branches with same HEAD, cherry-picking ${firstBranchHeadHash}...`,
    );
    // cherry-pick commit from outer block
    console.log(`@TODO-ZM: cherry-pick ${firstBranchHeadHash} to all branches with same HEAD`);
  }
  console.log(`Done applying version ${version}`);
} else {
  console.log(`Skipping because no branches are found with the current HEAD`);
}
