/* eslint-disable @typescript-eslint/no-var-requires */
// required modules
// const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// setting up project configurations and some env variables
const t9config = require("../../../../t9config.js");
const app = { ...t9config.apps.main, name: "main" };
// const appPath = app.basePath || app.name;
const isDevelopment = process.env.NODE_ENV === "development";
const fbpCode = app.analytics.facebook;
const gaCode = app.analytics.google;
const fbAppCode = app.plugins.fbAppCode;

module.exports = () => [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: `pug-loader!./src/apps/${app.name}/entry/index.pug`,
    templateParameters: {
      isDev: isDevelopment,
      fbpCode,
      gaCode,
      fbAppCode,
    },
  }),
];
