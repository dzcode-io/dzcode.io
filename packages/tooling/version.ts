const version = process.argv[2];
if (!version) throw new Error("Please provide a version");

console.log(`Applying version ${version} ...`);
console.log(`Done applying version ${version}`);
