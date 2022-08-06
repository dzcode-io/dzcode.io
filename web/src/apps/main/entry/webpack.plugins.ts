import { getCollection } from "@dzcode.io/data/dist/get/collection";
import { allLanguages } from "@dzcode.io/models/dist/language";
import { translationFunctionFactory } from "@dzcode.io/ui/dist/translation-factory";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { join } from "path";

import { dictionary } from "../components/t/dictionary";
import config from "./app-config";

const app = { ...config, name: "main" };
const isDevelopment = process.env.NODE_ENV === "development";
const fbpCode = app.vars.analytics.facebook;
const gaCode = app.vars.analytics.google;
const fbAppCode = app.vars.plugins.fbAppCode;
const plugins: HtmlWebpackPlugin[] = [];

const t = translationFunctionFactory(dictionary, () => "en");

// SSR --------------------------------|
// Static URLs ----
const pages = (
  [
    {
      uri: "/",
      title: "landing-title",
      description: "landing-description",
      ogImage:
        "https://images.unsplash.com/photo-1527285341945-715b98b98ea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=627&q=80",
      themeColor: "#000",
      keywords: "",
    },
    {
      uri: "/Contribute",
      title: "contribute-title",
      description: "contribute-description",
      ogImage:
        "https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=627&q=80",
      themeColor: "#000",
      keywords: "contribute, open-source, algeria, dzcode",
    },
    {
      uri: "/Learn",
      title: "learn-title",
      description: "learn-description",
      ogImage:
        "https://images.unsplash.com/photo-1519670107408-15dc1b3ecb1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=627&q=80",
      themeColor: "#000",
      keywords: "learn, open-source, algeria, dzcode",
    },
    {
      uri: "/Projects",
      title: "projects-title",
      description: "projects-description",
      ogImage:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=627&q=80",
      themeColor: "#000",
      keywords: "projects, open-source, algeria, dzcode",
    },
    {
      uri: "/Articles",
      title: "articles-title",
      description: "articles-description",
      ogImage:
        "https://images.unsplash.com/photo-1585241936939-be4099591252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=627&q=80",
      themeColor: "#000",
      keywords: "articles, open-source, algeria, dzcode",
    },
    {
      uri: "/FAQ",
      title: "faq-title",
      description: "faq-description",
      ogImage:
        "https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80&auto=format&fit=crop&w=1200&h=627&q=80",
      themeColor: "#000",
      keywords: "faq, open-source, algeria, dzcode",
    },
    {
      uri: "/Team",
      title: "team-title",
      description: "team-description",
      ogImage:
        "https://images.unsplash.com/photo-1526663089957-f2aa2776f572?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80&auto=format&fit=crop&w=1200&h=627&q=80",
      themeColor: "#000",
      keywords: "faq, open-source, algeria, dzcode",
    },
  ] as const
).reduce(
  (pV, { title, description, uri, ...page }) => [
    ...pV,
    ...allLanguages.map(({ code }) => ({
      ...page,
      title: t(title, undefined, code),
      description: t(description, undefined, code),
      uri: code === "en" ? uri : `/${code}${uri}`,
    })),
  ],
  [] as any[],
);

// Dynamic URLs ----
// @TODO-ZM: to localize this
[
  { file: "articles", slug: "Articles" },
  { file: "documentation", slug: "Learn" },
  { file: "projects", slug: "Projects" },
].forEach((collectionInfo) => {
  const collection = getCollection<Record<string, string>>(
    join(__dirname, "../../../../../data"),
    collectionInfo.file,
    "ssr.json",
  );
  if (!Array.isArray(collection)) {
    throw new Error(`Collection is not an array: ${collection}`);
  }
  collection.forEach((entry) => {
    pages.push({
      uri: `/${collectionInfo.slug}/${entry.slug}`,
      title: `${entry.title} | DzCode i/o`,
      description: entry.description,
      ogImage: entry.image,
      themeColor: "#000",
      keywords: entry.keywords,
    });
  });
});

// Convert pages into html webpack plugins
(process.env.NODE_ENV === "development" ? [pages[0]] : pages).forEach((page) => {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: (page.uri !== "/" ? `${page.uri}/index.html` : "/index.html").substring(1),
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
    }),
  );
});
// SSR - End --------------------------|

// Export
module.exports = plugins;
