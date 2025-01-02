import { Env } from "handler/contribution";
import { environments } from "@dzcode.io/utils/dist/config/environment";
import { Language, Languages } from "@dzcode.io/models/dist/language";
import { getContributionURL } from "@dzcode.io/web/dist/utils/contribution";
import { fsConfig } from "@dzcode.io/utils/dist/config";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";

function xmlEscape(s: string) {
  return s.replace(
    /[<>&"']/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export const onRequest: PagesFunction<Env> = async (context) => {
  let stage = context.env.STAGE;
  if (!environments.includes(stage)) {
    console.log(`⚠️  No STAGE provided, falling back to "development"`);
    stage = "development";
  }
  const fullstackConfig = fsConfig(stage);
  const links: Array<{ url: string; lang: Language["code"] }> = [];

  for (const lang of Languages) {
    const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, lang.code);
    const { contributions } = await fetchV2("api:contributions/for-sitemap", {});

    for (const contribution of contributions) {
      links.push({
        url: xmlEscape(`${lang.baseUrl}${getContributionURL(contribution)}`),
        lang: lang.code,
      });
    }
  }

  const hostname = "https://www.dzCode.io";
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
