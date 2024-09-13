import { environments } from "@dzcode.io/utils/dist/config/environment";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
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
  plugins: [pluginReact()],
  source: {
    alias: {
      src: "./src",
    },
    define: {
      "window.bundleInfo": bundleInfo,
    },
  },
  html: {
    template: "./src/_entry/index.html",
    favicon: "./src/assets/ico/favicon.ico",
    templateParameters: {
      stage,
    },
  },
  server: {
    port: 8080,
  },
  output: {
    distPath: {
      root: "./bundle",
      css: `w/${bundleInfo.version}/css`,
      cssAsync: `w/${bundleInfo.version}/css/async`,
      js: `w/${bundleInfo.version}/js`,
      jsAsync: `w/${bundleInfo.version}/js/async`,
      image: `w/${bundleInfo.version}/images`,
      font: `w/${bundleInfo.version}/fonts`,
      media: `w/${bundleInfo.version}/media`,
      svg: `w/${bundleInfo.version}/svg`,
      wasm: `w/${bundleInfo.version}/wasm`,
    },
  },
});
