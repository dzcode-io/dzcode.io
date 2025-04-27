import { Language } from "@dzcode.io/models/dist/language";
import { Response } from "express";
import { plainLocalize } from "@dzcode.io/web/dist/components/locale/utils";
import { dictionary, AllDictionaryKeys } from "@dzcode.io/web/dist/components/locale/dictionary";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { fullstackConfig } from "src/utils/config";
import { getContributionURL } from "@dzcode.io/web/dist/utils/contribution";
import { templateContent } from "./templates";
import { notFoundPath } from "src/utils/paths";

export const renderContributionPage = async (
  res: Response,
  lang: Language,
  contributionId: string,
) => {
  const localize = (key: AllDictionaryKeys) =>
    plainLocalize(dictionary, lang.code, key, "NO-TRANSLATION");
  const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, lang.code);

  try {
    const { contribution } = await fetchV2("api:contributions/:id/title", {
      params: { id: contributionId },
    });
    const pageTitle = `${localize("contribution-title-pre")} ${contribution.title} ${localize("contribution-title-post")}`;

    const newData = templateContent
      .replace(/{{template-title}}/g, pageTitle)
      .replace(/{{template-description}}/g, localize("contribute-description"))
      .replace(/{{template-lang}}/g, lang.code)
      .replace(
        /{{template-canonical}}/g,
        getContributionURL({ id: contributionId, title: contribution.title }, lang),
      );

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(newData);
  } catch (error) {
    // @TODO-ZM: log error to loki
    console.error(error);
    res.status(404).sendFile(notFoundPath);
  }
};
