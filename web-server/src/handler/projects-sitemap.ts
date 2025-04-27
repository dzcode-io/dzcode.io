import { LANGUAGES } from "@dzcode.io/models/dist/language";
import { fullstackConfig } from "src/utils/config";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { LanguageCode } from "@dzcode.io/utils/dist/language";
import { getProjectURL } from "@dzcode.io/web/dist/utils/project";

export const generateProjectsSitemap = async () => {
  const links: Array<{ url: string; lang: LanguageCode }> = [];
  for (const lang of LANGUAGES) {
    const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, lang.code);
    const { projects } = await fetchV2("api:projects/for-sitemap", {});
    for (const project of projects) {
      links.push({
        url: `${lang.baseUrl}${getProjectURL(project)}`,
        lang: lang.code,
      });
    }
  }

  const hostname = fullstackConfig.web.url;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${links
      .map(
        (link) => `
    <url>
        <loc>${hostname}${link.url}</loc>
        <xhtml:link rel="alternate" hreflang="${link.lang}" href="${hostname}${link.url}" />
    </url>`,
      )
      .join("")}
</urlset>`;

  return xml;
};
