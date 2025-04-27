import { LANGUAGES } from "@dzcode.io/models/dist/language";
import { fullstackConfig } from "src/utils/config";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { getProjectURL } from "@dzcode.io/web/dist/utils/project";
import { generateXmlSitemap, SiteMapLink } from "./generate-xml-sitemap";

export const generateProjectsSitemap = async () => {
  const links: SiteMapLink[] = [];
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

  return generateXmlSitemap(links, fullstackConfig.web.url);
};
