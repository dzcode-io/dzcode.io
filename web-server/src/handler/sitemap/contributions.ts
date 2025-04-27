import { LANGUAGES } from "@dzcode.io/models/dist/language";
import { fullstackConfig } from "src/utils/config";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { getContributionURL } from "@dzcode.io/web/dist/utils/contribution";
import { generateXmlSitemap, SiteMapLink } from "./generate-xml-sitemap";

export const generateContributionsSitemap = async () => {
  const links: SiteMapLink[] = [];
  for (const lang of LANGUAGES) {
    const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, lang.code);
    const { contributions } = await fetchV2("api:contributions/for-sitemap", {});
    for (const contribution of contributions) {
      links.push({
        url: `${lang.baseUrl}${getContributionURL(contribution)}`,
        lang: lang.code,
      });
    }
  }

  return generateXmlSitemap(links, fullstackConfig.web.url);
};
