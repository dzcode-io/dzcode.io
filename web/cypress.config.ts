import { fsConfig } from "@dzcode.io/utils/dist/config";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: fsConfig("development").web.url,
    supportFile: "src/_e2e-test/support/e2e.ts",
    specPattern: "src/_e2e-test/e2e/**/*.cy.{js,jsx,ts,tsx}",
    downloadsFolder: "src/_e2e-test/downloads",
    videosFolder: "src/_e2e-test/videos",
    screenshotsFolder: "src/_e2e-test/screenshots",
  },
});
