import { PageInfo } from ".";

export const templatePages: PageInfo[] = [
  {
    uri: "/template",
    title: "{{template-title}}",
    description: "{{template-description}}",
    ogImage:
      "https://images.unsplash.com/photo-1527285341945-715b98b98ea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=627&q=80",
    keywords: "open-source, algeria, dzcode",
    lang: "{{template-lang}}" as unknown as PageInfo["lang"],
    canonicalUrl: "{{template-canonical}}",
  },
];
