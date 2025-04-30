import { Language } from "@dzcode.io/models/dist/language";
import { Response } from "express";
import { plainLocalize } from "@dzcode.io/web/dist/components/locale/utils";
import { dictionary, AllDictionaryKeys } from "@dzcode.io/web/dist/components/locale/dictionary";
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { fullstackConfig } from "src/utils/config";
import { getProjectURL } from "@dzcode.io/web/dist/utils/project";
import { templateContent } from "./templates";
import { notFoundPath } from "src/utils/paths";

export const renderProjectPage = async (res: Response, lang: Language, projectId: string) => {
  const localize = (key: AllDictionaryKeys) =>
    plainLocalize(dictionary, lang.code, key, "NO-TRANSLATION");
  const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, lang.code);

  try {
    const { project } = await fetchV2("api:projects/:id/name", { params: { id: projectId } });
    const pageTitle = `${localize("project-title-pre")} ${project.name} ${localize("project-title-post")}`;

    const newData = templateContent
      .replace(/{{template-title}}/g, pageTitle)
      .replace(/{{template-description}}/g, localize("projects-description"))
      .replace(/{{template-lang}}/g, lang.code)
      .replace(/{{template-canonical}}/g, getProjectURL({ id: projectId }, lang));

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(newData);
  } catch (error) {
    // @TODO-ZM: log error to loki
    console.error(error);
    res.status(404).sendFile(notFoundPath);
  }
};
