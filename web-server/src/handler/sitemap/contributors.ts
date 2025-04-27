import { LANGUAGES } from "@dzcode.io/models/dist/language";
import { fullstackConfig } from "src/utils/config";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { getContributorURL } from "@dzcode.io/web/dist/utils/contributor";
import { generateXmlSitemap, SiteMapLink } from "./generate-xml-sitemap";

export const generateContributorsSitemap = async () => {
  const links: SiteMapLink[] = [];
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

  return generateXmlSitemap(links, fullstackConfig.web.url);
};
