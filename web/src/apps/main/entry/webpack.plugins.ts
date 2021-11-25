import HtmlWebpackPlugin from "html-webpack-plugin";
import config from "./app-config";
import { getCollection } from "@dzcode.io/data/dist/get/collection";
import { join } from "path";

const app = { ...config, name: "main" };
const isDevelopment = process.env.NODE_ENV === "development";
const fbpCode = app.vars.analytics.facebook;
const gaCode = app.vars.analytics.google;
const fbAppCode = app.vars.plugins.fbAppCode;
const plugins: HtmlWebpackPlugin[] = [];

// SSR --------------------------------|
// Root URL ----
const pages = [
  {
    uri: "/",
    title: "DZ Open-Source | DzCode i/o",
    description: "Algerian Open-Source Community",
    ogImage:
      "https://images.unsplash.com/photo-1527285341945-715b98b98ea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=627&q=80",
    themeColor: "#000",
    keywords: "",
  },
];
// Other URLs
if (process.env.NODE_ENV !== "development") {
  // Static URLs ----
  pages.push(
    ...[
      {
        uri: "/Contribute",
        title: "Contribute to algerian open-source projects | DzCode i/o",
        description: "Contribute to algerian open-source projects",
        ogImage:
          "https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=627&q=80",
        themeColor: "#000",
        keywords: "contribute, open-source, algeria, dzcode",
      },
      {
        uri: "/Learn",
        title:
          "Learn about software development through open-source | DzCode i/o",
        description:
          "Learn, edit and share the knowledge between all Algerian developers!",
        ogImage:
          "https://images.unsplash.com/photo-1519670107408-15dc1b3ecb1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=627&q=80",
        themeColor: "#000",
        keywords: "learn, open-source, algeria, dzcode",
      },
      {
        uri: "/Projects",
        title:
          "Browse a growing list of algerian open-source projects | DzCode i/o",
        description:
          "Browse a growing list of algerian open-source projects and be up-to-date with the state of dz open-source, or Add your own project to the list!",
        ogImage:
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=627&q=80",
        themeColor: "#000",
        keywords: "projects, open-source, algeria, dzcode",
      },
      {
        uri: "/Articles",
        title:
          "Read and discuss articles written by algerian developers | DzCode i/o",
        description:
          "Browse, read, modify a growing list of articles written by algerian developers, or Add your own article to the list!",
        ogImage:
          "https://images.unsplash.com/photo-1585241936939-be4099591252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=627&q=80",
        themeColor: "#000",
        keywords: "articles, open-source, algeria, dzcode",
      },
      {
        uri: "/FAQ",
        title:
          "Understand what exactly is DzCode i/o, get answers to the frequently asked questions | DzCode i/o",
        description: "Frequently asked questions about DzCode i/o",
        ogImage:
          "https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80&auto=format&fit=crop&w=1200&h=627&q=80",
        themeColor: "#000",
        keywords: "faq, open-source, algeria, dzcode",
      },
      {
        uri: "/Team",
        title: "Meet the team! | DzCode i/o",
        description:
          "Meet and connect with all the open-source contributors of all the listed projects in dzcode.io website",
        ogImage:
          "https://images.unsplash.com/photo-1526663089957-f2aa2776f572?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80&auto=format&fit=crop&w=1200&h=627&q=80",
        themeColor: "#000",
        keywords: "faq, open-source, algeria, dzcode",
      },
    ]
  );
  // Dynamic URLs ----
  [
    { file: "articles", slug: "Articles" },
    { file: "documentation", slug: "Learn" },
    { file: "projects", slug: "Projects" },
  ].forEach((collectionInfo) => {
    const collection = getCollection<Record<string, string>>(
      join(__dirname, "../../../../../data"),
      collectionInfo.file,
      "ssr.json"
    );
    if (!Array.isArray(collection)) {
      throw new Error(`Collection is not an array: ${collection}`);
    }
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
      },
      chunks: [app.name],
    })
  );
});
// SSR - End --------------------------|

// Export
module.exports = plugins;
