import { allLanguages } from "@dzcode.io/models/dist/language";
import { plainLocalize } from "../../components/locale/utils";
import { dictionary } from "../../components/locale/dictionary";

import { PageInfo, PageInfoWithLocalKeys } from ".";

const localize = (key: string, language: string) =>
  plainLocalize(dictionary, language, key, "NO-TRANSLATION");

const staticURLs: PageInfoWithLocalKeys[] = [
  {
    uri: "/",
    title: "landing-title",
    description: "landing-description",
    ogImage:
      "https://images.unsplash.com/photo-1527285341945-715b98b98ea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=627&q=80",
    keywords: "",
  },
  {
    uri: "/contribute",
    title: "contribute-title",
    description: "contribute-description",
    ogImage:
      "https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=627&q=80",
    keywords: "contribute, open-source, algeria, dzcode",
  },
  {
    uri: "/projects",
    title: "projects-title",
    description: "projects-description",
    ogImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=627&q=80",
    keywords: "projects, open-source, algeria, dzcode",
  },
  {
    uri: "/faq",
    title: "faq-title",
    description: "faq-description",
    ogImage:
      "https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8https://images.unsplash.com/photo-1516246843873-9d12356b6fab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80&auto=format&fit=crop&w=1200&h=627&q=80",
    keywords: "faq, open-source, algeria, dzcode",
  },
  {
    uri: "/team",
    title: "team-title",
    description: "team-description",
    ogImage:
      "https://images.unsplash.com/photo-1526663089957-f2aa2776f572?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80&auto=format&fit=crop&w=1200&h=627&q=80",
    keywords: "faq, open-source, algeria, dzcode",
  },
  {
    uri: "/404",
    title: "notfound-title",
    description: "notfound-description",
    ogImage:
      "https://images.unsplash.com/photo-1510133768164-a8f7e4d4e3dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80&auto=format&fit=crop&w=1200&h=627&q=80",
    keywords: "faq, open-source, algeria, dzcode",
  },
];

export const staticPages: PageInfo[] = staticURLs.reduce<PageInfo[]>(
  (acc, { title, description, uri, ...page }) => [
    ...acc,
    ...allLanguages.map<PageInfo>(({ code }) => ({
      ...page,
      title: localize(title, code),
      description: localize(description, code),
      uri: code === "en" ? uri : `/${code}${uri}`,
      lang: code,
    })),
  ],
  [],
);
