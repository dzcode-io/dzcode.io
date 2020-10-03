/* eslint-disable @typescript-eslint/no-var-requires */
// required modules
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// setting up project configurations and some env variables
const t9config = require("./t9config.js");
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.DEV_SERVER_PORT || 8080;
const webpackConfigArray = [];

// pushWebpackConfig function
const pushWebpackConfig = (app) => {
  const appPath = app.basePath || app.name;
  webpackConfigArray.push({
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      contentBase: t9config.bundles.distFolder,
      compress: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      hot: true,
      liveReload: false,
      disableHostCheck: true,
      host: "0.0.0.0",
      port,
      writeToDisk: true,
      historyApiFallback: true,
    },
    // https://webpack.js.org/configuration/devtool/#development
    devtool: isProduction ? false : "eval-source-map",
    // https://webpack.js.org/configuration/entry-context/
    entry: path.join(__dirname, "./src/apps/", app.name, "/entry/index.tsx"),
    // https://webpack.js.org/configuration/mode/
    mode: isProduction ? "production" : isDevelopment ? "development" : "none",
    module: {
      rules: [
        // https://github.com/microsoft/TypeScript-Babel-Starter#create-a-webpackconfigjs
        { exclude: /node_modules/, loader: "babel-loader", test: /\.tsx?$/ },
        // https://webpack.js.org/loaders/source-map-loader/
        { enforce: "pre", loader: "source-map-loader", test: /\.js$/ },
        // https://github.com/webpack-contrib/mini-css-extract-plugin/
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment },
            },
            // https://github.com/webpack-contrib/css-loader
            "css-loader",
            // https://github.com/postcss/postcss-loader#plugins
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("precss"), require("autoprefixer")],
              },
            },
          ],
        },
        // https://github.com/webpack-contrib/sass-loader
        {
          test: /\.(sa|sc)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment },
            },
            // https://github.com/webpack-contrib/css-loader
            "css-loader",
            // https://github.com/postcss/postcss-loader#plugins
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("precss"), require("autoprefixer")],
              },
            },
            "sass-loader",
          ],
        },
        // https://github.com/webpack-contrib/less-loader
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment },
            },
            // https://github.com/webpack-contrib/css-loader
            "css-loader",
            // https://github.com/postcss/postcss-loader#plugins
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("precss"), require("autoprefixer")],
              },
            },
            {
              loader: "less-loader", // compiles Less to CSS
            },
          ],
        },
        // https://github.com/webpack-contrib/file-loader
        {
          test: /\.(png|jpe?g|gif|svg|ico|ttf|woff2?)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: path.join(
                  t9config.bundles.publicResourcesPath,
                  appPath,
                  "assets",
                ),
              },
            },
          ],
        },
      ],
    },
    // https://webpack.js.org/configuration/optimization/#optimizationminimizer
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          common: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            chunks: "all",
            filename: path.join(
              t9config.bundles.publicResourcesPath,
              appPath,
              "common.js",
            ),
          },
        },
      },
    },
    // https://webpack.js.org/concepts/output/#multiple-entry-points
    output: {
      chunkFilename: path.join(
        t9config.bundles.publicResourcesPath,
        appPath,
        `[name].chunk${isDevelopment ? "" : ".[hash]"}.js`,
      ),
      filename: path.join(
        t9config.bundles.publicResourcesPath,
        appPath,
        `[name]${isDevelopment ? "" : ".[hash]"}.js`,
      ),
      path: path.join(
        __dirname,
        t9config.bundles.distFolder,
        t9config.bundles.publicPath,
      ),
      publicPath: t9config.bundles.publicPath,
    },
    plugins: [
      // https://webpack.js.org/plugins/hot-module-replacement-plugin/
      isDevelopment ? new webpack.HotModuleReplacementPlugin() : () => null,
      // https://github.com/webpack-contrib/mini-css-extract-plugin#advanced-configuration-example
      new MiniCssExtractPlugin({
        filename: path.join(
          t9config.bundles.publicResourcesPath,
          appPath,
          `[name]${isDevelopment ? "" : ".[hash]"}.css`,
        ),
        chunkFilename: path.join(
          t9config.bundles.publicResourcesPath,
          appPath,
          `[id]${isDevelopment ? "" : ".[hash]"}.css`,
        ),
      }),
      // ./src/apps/", app.name, "/entry/index.tsx
      ...require(`./src/apps/${app.name}/entry/webpack.plugins`)(),
    ],
    resolve: {
      // https://webpack.js.org/configuration/resolve/#resolvealias
      alias: {
        "t9/apps": path.resolve(__dirname, "src/apps"),
        src: path.resolve(__dirname, "src"),
      },
      // https://webpack.js.org/configuration/resolve/#resolveextensions
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".json",
        ".scss",
        ".pug",
        ".svg",
        ".ico",
      ],
    },
    // https://webpack.js.org/configuration/target/
    target: "web",
  });
};

// pushing configs for each app
for (const appName in t9config.apps) {
  if (t9config.apps.hasOwnProperty(appName)) {
    const app = t9config.apps[appName];
    pushWebpackConfig({ ...app, name: appName });
  }
}

// exporting configs
module.exports = webpackConfigArray;
