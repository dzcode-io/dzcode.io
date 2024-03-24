import { CracoConfig } from "@craco/types";
import jest from "@dzcode.io/tooling/jest.config";
import { fsConfig } from "@dzcode.io/utils/dist/config";
import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
import { readFileSync } from "fs-extra";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { join, normalize } from "path";
import { resolve } from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { dynamicPages, PageInfo, staticPages } from "./src/build/pages";

const RobotstxtPlugin = require("robotstxt-webpack-plugin"); // eslint-disable-line @typescript-eslint/no-var-requires

let stage = process.env.STAGE as Environment;
if (!environments.includes(stage)) {
  console.log(`⚠️  No STAGE provided, falling back to "development"`);
  stage = "development";
}
const ANALYZE = process.env.ANALYZE === "true";

let bundleInfo: { version: string } = {
  version: `v${require("./package.json").version as string}`, // eslint-disable-line @typescript-eslint/no-var-requires
};
try {
  bundleInfo = JSON.parse(readFileSync(".bundle-info.json").toString()) as typeof bundleInfo;
} catch (error) {
  console.log(`no .bundle-info.json found`);
}

const distFolder = "./bundle";
const publicResourcesPath = `w/${bundleInfo.version}`;
const publicPath = "/";

type HtmlWebpackPluginTemplate = PageInfo & {
  themeColor: string;
  stage: Environment;
  gaCode: string;
};

module.exports = {
  devServer: {
    port: fsConfig("development").web.port,
  },
  webpack: {
    alias: {
      src: resolve(__dirname, "src/"),
    },
    plugins: {
      remove: ["HtmlWebpackPlugin"],
      add: [
        ...[...staticPages, ...dynamicPages].map(
          (pageInfo) =>
            new HtmlWebpackPlugin({
              filename: normalize(
                pageInfo.uri !== "/" ? `${pageInfo.uri}/index.html` : "/index.html",
              ).substring(1),
              template: `src/_entry/index.html`,
              templateParameters: {
                ...pageInfo,
                stage,
                themeColor: "#43a047",
                gaCode: "UA-163554556-1",
              } as HtmlWebpackPluginTemplate,
              favicon: "./src/assets/ico/favicon.ico",
            }),
        ),
        new RobotstxtPlugin({
          policy: [
            {
              userAgent: "*",
              allow: stage === "production" ? "/" : undefined,
              disallow: stage !== "production" ? "/" : undefined,
            },
          ],
        }),
        ANALYZE && [
          // https://github.com/webpack-contrib/webpack-bundle-analyzer
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "../build/analysis.html",
          }),
        ],
      ].filter(Boolean),
    },
    configure: (webpackConfig, context) => {
      if (context.paths) {
        context.paths.appBuild = distFolder;
      }
      webpackConfig.output = {
        ...webpackConfig.output,
        chunkFilename: join(publicResourcesPath, "chunk.[contenthash].js"),
        filename: join(publicResourcesPath, "bundle.[name].[contenthash].js"),
        path: join(__dirname, distFolder, publicPath),
        publicPath: publicPath,
      };
      return webpackConfig;
    },
  },
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      ["transform-define", { "window.bundleInfo": bundleInfo }],
      // https://www.npmjs.com/package/babel-plugin-typescript-to-proptypes
      ["babel-plugin-typescript-to-proptypes", { comments: true }],
    ],
  },
  jest: { configure: jest },
} as CracoConfig;
