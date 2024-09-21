// for dev, run:
// npm run clean && npm run bundle && npm run generate:htmls
// npm run rsbuild preview

import { join } from "path";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { allPages } from "./pages";
import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
import { SENTRY_ORIGIN } from "../../src/utils/sentry-origin";

let stage = process.env.STAGE as Environment;
if (!environments.includes(stage)) {
  console.log(`⚠️  No STAGE provided, falling back to "development"`);
  stage = "development";
}

const distFolder = "./bundle";

const indexHtmlPath = join(distFolder, "index.html");
const indexHtml = readFileSync(indexHtmlPath).toString();

const SKIP_ROOT_HTML = process.env.SKIP_ROOT_HTML === "true";

console.log(`generating ${allPages.length} html files ...`);

allPages.forEach((pageInfo) => {
  const pathName = pageInfo.uri;
  const outputHtmlDir = join(distFolder, pathName);
  const outputHtmlPath = join(outputHtmlDir, "index.html");
  if (SKIP_ROOT_HTML && outputHtmlPath === indexHtmlPath) {
    console.log(`skipping root html: ${outputHtmlPath}`);
    return;
  }

  let newHtml = indexHtml;
  newHtml = newHtml.replace(
    /{{googleAnalytics}}/g,
    stage === "development"
      ? ""
      : `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YPJCPRQSNE"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-YPJCPRQSNE');
    </script>`
          .replace(/\n/g, "")
          .replace(/\s{2,}/g, " "),
  );
  newHtml = newHtml.replace(/{{themeColor}}/g, "#43a047");
  newHtml = newHtml.replace(/{{lang}}/g, pageInfo.lang);
  newHtml = newHtml.replace(/{{keywords}}/g, pageInfo.keywords);
  newHtml = newHtml.replace(/{{title}}/g, pageInfo.title);
  newHtml = newHtml.replace(/{{description}}/g, pageInfo.description);
  newHtml = newHtml.replace(/{{ogImage}}/g, pageInfo.ogImage);
  newHtml = newHtml.replace(/{{sentryOrigin}}/g, `https://${SENTRY_ORIGIN}`);

  mkdirSync(outputHtmlDir, { recursive: true });
  writeFileSync(outputHtmlPath, newHtml);

  console.log(outputHtmlPath, "✅");
});

console.log("done");
