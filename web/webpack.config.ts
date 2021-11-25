import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import glob from "glob";
import path from "path";
import { Configuration as WPC } from "webpack";
import { Configuration as WPDSC } from "webpack-dev-server";

// setting up project configurations and some env variables
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.DEV_SERVER_PORT || 8080;
const distFolder = "./bundle";
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
  .sync("src/apps/*/entry/app-config.ts")
  .map((path) => path.substring(9, path.indexOf("/", 9)));

const browserslist = [">0.2%", "not dead", "not op_mini all"];
const babelOptions = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: browserslist,
        modules: false,
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    "@babel/proposal-class-properties",
    // https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread
    "@babel/proposal-object-rest-spread",
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    "@babel/plugin-transform-runtime",
    // https://www.npmjs.com/package/babel-plugin-typescript-to-proptypes
    ["babel-plugin-typescript-to-proptypes", { comments: true }],
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    "@babel/plugin-transform-modules-commonjs",
  ],
};

// exporting configs
export default {
  // https://webpack.js.org/configuration/entry-context/
  entry: Object.fromEntries(
    new Map(
      apps.map((app) => [
        app,
        path.join(__dirname + "/src/apps/" + app + "/" + "/entry/index.tsx"),
      ])
    )
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
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
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
              postcssOptions: {
                plugins: [["postcss-preset-env", { browsers: browserslist }]],
              },
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // Non-Code files (assets)
      {
        test: new RegExp(`.(${nonCodeFiles.join("|")})$`),
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
    // https://webpack.js.org/plugins/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: publicResourcesPath + "/bundle.[contenthash].css",
      chunkFilename: publicResourcesPath + "/chunk.[contenthash].css",
    }),
    ...apps.reduce<WPC["plugins"][]>(
      (pV, app) => [
        ...pV,
        ...require(`./src/apps/${app}/entry/webpack.plugins`),
      ],
      []
    ),
  ],
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolvealias
    alias: {
      src: [path.resolve(__dirname, "src")],
    },
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    compress: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    liveReload: false,
    host: "0.0.0.0",
    port,
    historyApiFallback: {
      disableDotRule: true,
    },
    open: { target: "/" },
  } as WPDSC,
  // https://webpack.js.org/configuration/stats/
  stats: "minimal",
  // https://webpack.js.org/configuration/target/
  target: "web",
  // https://webpack.js.org/configuration/devtool/#development
  devtool: isProduction ? false : "eval-source-map",
  // https://webpack.js.org/configuration/mode/
  mode: isProduction ? "production" : isDevelopment ? "development" : "none",
  // https://webpack.js.org/configuration/optimization/#optimizationminimizer
  optimization: {
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
  },
} as WPC;
