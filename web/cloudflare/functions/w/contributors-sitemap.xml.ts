import { Env } from "handler/contributor";
import { environments } from "@dzcode.io/utils/dist/config/environment";
import { LANGUAGES } from "@dzcode.io/models/dist/language";
import { getContributorURL } from "@dzcode.io/web/dist/utils/contributor";
import { fsConfig } from "@dzcode.io/utils/dist/config";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { LanguageCode } from "@dzcode.io/utils/dist/language";

export const onRequest: PagesFunction<Env> = async (context) => {
  let stage = context.env.STAGE;
  if (!environments.includes(stage)) {
    console.log(`⚠️  No STAGE provided, falling back to "development"`);
    stage = "development";
  }
  const fullstackConfig = fsConfig(stage);
  const links: Array<{ url: string; lang: LanguageCode }> = [];
  for (const lang of LANGUAGES) {
    const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, lang.code);
    const { contributors } = await fetchV2("api:contributors/for-sitemap", {});
    for (const contributor of contributors) {
      links.push({
        url: `${lang.baseUrl}${getContributorURL(contributor)}`,
        lang: lang.code,
      });
    }
  }

  const hostname = "https://www.dzcode.io";
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

  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
