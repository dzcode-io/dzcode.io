import { execSync } from "child_process";

// Get the version passed as argument
const version = process.argv[2];
if (!version) throw new Error("Please provide a version");

console.log(`Pushing version ${version} ...`);

// When running this script, we are checked-out to a tag instead of a branch, now we need to find the related branch and checkout to it
const currentHeadHashStdout = String(execSync(`git rev-parse HEAD`));
console.log("\n" + currentHeadHashStdout);
const currentHeadHash = currentHeadHashStdout.replace("\n", "");

const showRefsStdout = String(execSync(`git show-ref`));

const branches = showRefsStdout
  .split("\n")
  .filter((headAndBranch) => headAndBranch.startsWith(`${currentHeadHash} refs/remotes/origin`))
  .map((headAndBranch) => headAndBranch.replace(/\S+\srefs\/remotes\/origin\//, ""));

if (branches.length > 0) {
  const firstBranch = branches[0];
  // stash the modified files
  console.log(String(execSync(`git stash`)));
  // checkout to the branch for this tag
  console.log(String(execSync(`git checkout ${firstBranch}`)));
  // unstash
  console.log(String(execSync(`git stash pop`)));
  // stage
  console.log(String(execSync(`git add .`)));
  // commit
  console.log(String(execSync(`git config user.name "DzCode i/o"`)));
  console.log(String(execSync(`git config user.email contact@dzcode.io`)));
  console.log(String(execSync(`git commit -m "version: ${version}\n[skip ci]" --no-verify`)));
  // preserve the new head commit for later use
  const headStdOut = String(execSync(`git rev-parse HEAD`));
  console.log(headStdOut);
  const firstBranchHeadHash = headStdOut.replace("\n", "");
  // push the new head commit
  console.log(String(execSync(`git push`)));
  // overwrite the current tag
  console.log(String(execSync(`git tag ${version} -f`)));
  // push the new tag
  console.log(String(execSync(`git push --tags -f`)));

  // in case we have other branches with the same tag, we should update them as well
  if (branches.length > 1) {
    console.log(
      `found ${
        branches.length - 1
      } more branches with same HEAD, cherry-picking ${firstBranchHeadHash}...`,
    );
    // cherry-pick the new head commit`firstBranchHeadHash`
    console.log(`@TODO-ZM: cherry-pick ${firstBranchHeadHash} to all branches with same HEAD`);
  }
  console.log(`Done applying version ${version}`);
} else {
  console.log(`Skipping because no branches are found with the current HEAD`);
}
