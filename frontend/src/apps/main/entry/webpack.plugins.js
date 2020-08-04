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
const icon = app.icon;
const plugins = [];

// SSR --------------------------------|
// Root URL ----
const pages = [
  {
    uri: "/",
    title: "DZ Open-Source | dzCode i/o",
    description: "Algerian Open-Source Community",
    ogImage:
      "https://images.unsplash.com/photo-1527285341945-715b98b98ea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=627&q=80",
    themeColor: "#000",
    keywords: "",
  },
];
// Other URLs
if (process.env.NODE_ENV === "production") {
  // Static URLs ----
  pages.push(
    ...[
      {
        uri: "/Contact-Us",
        title: "Contact-Us",
        description: "Reach Out or Send Us Feedback",
        ogImage:
          "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=627&q=80",
        themeColor: "#000",
        keywords: "",
      },
    ],
  );
  // Dynamic URLs ----
  const data = require("../../../../../fullstack/dist/utils/data");
  [
    { file: "articles", slug: "Articles" },
    { file: "documentation", slug: "Learn" },
    { file: "projects", slug: "Projects" },
  ].forEach((collectionInfo) => {
    const collection = data.getDataCollection(collectionInfo.file, "ssr.json");
    collection.forEach((entry) => {
      pages.push({
        uri: `/${collectionInfo.slug}/${entry.slug}`,
        title: entry.title,
        description: entry.description,
        ogImage: entry.image,
        themeColor: "#000",
        keywords: entry.keywords,
      });
    });
  });
}
// Convert pages into html webpack plugins
pages.forEach((page) => {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: (page.uri !== "/"
        ? `${page.uri}/index.html`
        : "/index.html"
      ).substring(1),
      template: `pug-loader!./src/apps/${app.name}/entry/index.pug`,
      templateParameters: {
        isDev: isDevelopment,
        // Fb and Google analytics
        fbpCode,
        gaCode,
        // Fb feedback plugin
        fbAppCode,
        // Open graph info
        title: page.title,
        description: page.description,
        ogImage: page.ogImage,
        themeColor: "#000",
        // SEO info
        keywords: "",
        lang: "en",
        // icon
        icon,
      },
    }),
  );
});
// SSR - End --------------------------|

// Export
module.exports = () => plugins;
