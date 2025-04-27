import { LanguageCode } from "@dzcode.io/utils/dist/language";

export interface SiteMapLink {
  url: string;
  lang: LanguageCode;
}

function xmlEscape(s: string) {
  return s.replace(
    /[<>&"']/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export function generateXmlSitemap(
  links: Array<{ url: string; lang: LanguageCode }>,
  hostname: string,
) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${links
      .map((link) => {
        const escapedUrl = xmlEscape(link.url);
        return `
    <url>
        <loc>${hostname}${escapedUrl}</loc>
        <xhtml:link rel="alternate" hreflang="${link.lang}" href="${hostname}${escapedUrl}" />
    </url>`;
      })
      .join("")}
</urlset>`;

  return xml;
}
