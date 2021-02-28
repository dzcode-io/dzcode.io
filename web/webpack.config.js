/* eslint-disable @typescript-eslint/no-var-requires */
// required modules
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const glob = require("glob");

// setting up project configurations and some env variables
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.DEV_SERVER_PORT || 8080;
const distFolder = "./dist";
const publicResourcesPath = "w/";
const publicPath = "/";
const nonCodeFiles = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "ico",
  "ttf",
  "woff",
  "woff2",
];

const apps = glob
  .sync("src/apps/*/entry/app-config.js")
  .map((path) => path.substring(9, path.indexOf("/", 9)));

// exporting configs
module.exports = {
  // https://webpack.js.org/configuration/entry-context/
  entry: Object.fromEntries(
    new Map(
      apps.map((app) => [
        app,
        __dirname + "/src/apps/" + "/" + app + "/" + "/entry/index.tsx",
      ]),
    ),
  ),
  // https://webpack.js.org/concepts/output/#multiple-entry-points
  output: {
    chunkFilename: publicResourcesPath + "/chunk.[contenthash].js",
    filename: publicResourcesPath + "/bundle.[name].[contenthash].js",
    path: __dirname + "/" + distFolder + "/" + publicPath,
    publicPath: publicPath,
  },
  module: {
    rules: [
      // TS / TSX
      {
        include: path.resolve(__dirname, "src"),
        // https://github.com/babel/babel-loader
        loader: "babel-loader",
        test: /\.tsx?$/,
      },
      // SCSS / SASS
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          // extracts CSS into separate files, see https://webpack.js.org/plugins/mini-css-extract-plugin
          MiniCssExtractPlugin.loader,
          // https://webpack.js.org/loaders/css-loader/
          "css-loader",
          // https://github.com/postcss/postcss-loader#plugins
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: { plugins: [autoprefixer, precss] },
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // Non-Code files (assets)
      {
        test: new RegExp(`\.(${nonCodeFiles.join("|")})$`),
        // https://github.com/webpack-contrib/file-loader
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: publicResourcesPath + "/assets",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // https://webpack.js.org/plugins/hot-module-replacement-plugin/
    isDevelopment ? new webpack.HotModuleReplacementPlugin() : () => null,
    // https://webpack.js.org/plugins/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: publicResourcesPath + "/bundle.[contenthash].css",
      chunkFilename: publicResourcesPath + "/chunk.[contenthash].css",
    }),
    ...apps.reduce(
      (pV, app) => [
        ...pV,
        ...require(`./src/apps/${app}/entry/webpack.plugins`),
      ],
      [],
    ),
  ],
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolvealias
    alias: { src: path.resolve(__dirname, "src") },
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: distFolder,
    compress: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    liveReload: false,
    disableHostCheck: true,
    host: "0.0.0.0",
    port,
    writeToDisk: false,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  // https://webpack.js.org/configuration/target/
  target: "web",
  // https://webpack.js.org/configuration/devtool/#development
  devtool: isProduction ? false : "eval-source-map",
  // https://webpack.js.org/configuration/mode/
  mode: isProduction ? "production" : isDevelopment ? "development" : "none",
  // https://webpack.js.org/configuration/optimization/#optimizationminimizer
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};
