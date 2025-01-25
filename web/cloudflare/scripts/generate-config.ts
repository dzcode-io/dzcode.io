// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { writeFileSync } from "fs";

// Get the environment passed as argument
const STAGE = process.argv[2];
if (!STAGE) throw new Error("Please provide a STAGE");

console.log(`Creating wrangler.toml ...`);

writeFileSync(
  "wrangler.toml",
  `
name = ${STAGE === "production" ? '"dzcode-dot-io"' : '"stage-dot-dzcode-dot-io"'}
compatibility_date = "2024-09-28"
pages_build_output_dir = "./public"

[vars]
STAGE = "${STAGE}"
`,
);

console.log(`Done creating .bundle-info.json`);
