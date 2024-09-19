// for dev, run:
// npm run clean && npm run bundle && npm run generate:robots-txt
// npm run bundle:preview

import { join } from "path";
import { writeFileSync } from "fs";
import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";

let stage = process.env.STAGE as Environment;
if (!environments.includes(stage)) {
  console.log(`⚠️  No STAGE provided, falling back to "development"`);
  stage = "development";
}

const distFolder = "./bundle";

const robotsTxtPath = join(distFolder, "robots.txt");

console.log(`generating $robot.txt ...`);

const robotsTxt = `User-agent: *
${stage === "production" ? "Allow: /" : "Disallow: /"}
`;

writeFileSync(robotsTxtPath, robotsTxt);

console.log("done");
