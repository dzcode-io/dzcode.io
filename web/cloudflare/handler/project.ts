declare const htmlTemplate: string; // @ts-expect-error cloudflare converts this to a string using esbuild
import htmlTemplate from "../public/template.html";
declare const notFoundEn: string; // @ts-expect-error cloudflare converts this to a string using esbuild
import notFoundEn from "../public/404.html";
declare const notFoundAr: string; // @ts-expect-error cloudflare converts this to a string using esbuild
import notFoundAr from "../public/ar/404.html";

import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
import { fsConfig } from "@dzcode.io/utils/dist/config";
import { plainLocalize } from "@dzcode.io/web/dist/components/locale/utils";
import { dictionary, AllDictionaryKeys } from "@dzcode.io/web/dist/components/locale/dictionary";
import { LanguageEntity } from "@dzcode.io/models/dist/language";

export interface Env {
  STAGE: Environment;
}

export const handleProjectRequest: PagesFunction<Env> = async (context) => {
  let stage = context.env.STAGE;
  if (!environments.includes(stage)) {
    console.log(`⚠️  No STAGE provided, falling back to "development"`);
    stage = "development";
  }
  const fullstackConfig = fsConfig(stage);

  const apiUrl = fullstackConfig.api.url;

  const pathName = new URL(context.request.url).pathname;

  const languageRegex = /^\/(ar|en)\//i;
  const language = (pathName?.match(languageRegex)?.[1]?.toLowerCase() ||
    "en") as LanguageEntity["code"];
  const notFound = language === "ar" ? notFoundAr : notFoundEn;

  const projectIdRegex = /projects\/(.*)-(.\d+)/;
  const projectId = pathName?.match(projectIdRegex)?.[2];

  if (!projectId)
    return new Response(notFound, {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 404,
    });

  const localize = (key: AllDictionaryKeys) =>
    plainLocalize(dictionary, language, key, "NO-TRANSLATION");

  // @TODO-ZM: use fetchV2
  const projectResponse = await fetch(`${apiUrl}/Projects/${projectId}/name`);

  if (!projectResponse.ok) {
    return new Response(notFound, {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 404,
    });
  }

  const projectData = await projectResponse.json();
  // @ts-expect-error @TODO-ZM: import @dzcode.io/api
  const pageTitle = `${localize("project-title-pre")} ${projectData.project.name} ${localize("project-title-post")}`;

  const newData = htmlTemplate
    .replace(/{{template-title}}/g, pageTitle)
    .replace(/{{template-description}}/g, localize("projects-description"))
    .replace(/{{template-lang}}/g, language);

  return new Response(newData, { headers: { "content-type": "text/html; charset=utf-8" } });
};
