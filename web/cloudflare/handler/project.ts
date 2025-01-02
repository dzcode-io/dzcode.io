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
import { fetchV2Factory } from "@dzcode.io/utils/dist/fetch/factory";
import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { LanguageCode } from "@dzcode.io/utils/dist/language";

export interface Env {
  STAGE: Environment;
}

export const handleProjectRequest: PagesFunction<Env> = async (context) => {
  let stage = context.env.STAGE;
  if (!environments.includes(stage)) {
    console.log(`⚠️  No STAGE provided, falling back to "development"`);
    stage = "development";
  }

  const pathName = new URL(context.request.url).pathname;

  const languageRegex = /^\/(ar|en)\//i;
  const language = (pathName?.match(languageRegex)?.[1]?.toLowerCase() || "en") as LanguageCode;
  const notFound = language === "ar" ? notFoundAr : notFoundEn;

  const projectIdRegex = /projects\/(.*)/;
  const projectId = pathName?.match(projectIdRegex)?.[1];

  if (!projectId)
    return new Response(notFound, {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 404,
    });

  const localize = (key: AllDictionaryKeys) =>
    plainLocalize(dictionary, language, key, "NO-TRANSLATION");

  const fullstackConfig = fsConfig(stage);
  const fetchV2 = fetchV2Factory<Endpoints>(fullstackConfig, language);

  try {
    const { project } = await fetchV2("api:projects/:id/name", { params: { id: projectId } });
    const pageTitle = `${localize("project-title-pre")} ${project.name} ${localize("project-title-post")}`;

    const newData = htmlTemplate
      .replace(/{{template-title}}/g, pageTitle)
      .replace(/{{template-description}}/g, localize("projects-description"))
      .replace(/{{template-lang}}/g, language)
      .replace(/{{template-canonical}}/g, `${fullstackConfig.web.url}${pathName}`);

    return new Response(newData, { headers: { "content-type": "text/html; charset=utf-8" } });
  } catch (error) {
    // @TODO-ZM: log error to sentry
    console.error(error);

    return new Response(notFound, {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 404,
    });
  }
};
