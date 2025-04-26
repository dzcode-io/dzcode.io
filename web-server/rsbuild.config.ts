import { environments } from "@dzcode.io/utils/dist/config/environment";
import { defineConfig } from "@rsbuild/core";
import { readFileSync } from "fs";

let stage = process.env.STAGE;

if (!environments.includes(stage)) {
  console.log(`⚠️  No STAGE provided, falling back to "development"`);
  stage = "development";
}

let bundleInfo: { version: string } = {
  version: `v${require("./package.json").version as string}`, // eslint-disable-line @typescript-eslint/no-require-imports
};
try {
  bundleInfo = JSON.parse(readFileSync(".bundle-info.json").toString()) as typeof bundleInfo;
} catch (error) {
  console.log(`no .bundle-info.json found`, error);
}

export default defineConfig({
  plugins: [],
  source: {
    alias: {
      src: "./src",
    },
    define: {
      "globals.bundleInfo": JSON.stringify(bundleInfo),
    },
  },
  output: {
    distPath: {
      root: "./bundle",
    },
    target: "node",
  },
  tools: {
    bundlerChain: (chain) => {
      // Disable HTML generation
      chain.plugins.delete("html");

      // Set proper node target
      chain.target("node");
    },
  },
});
