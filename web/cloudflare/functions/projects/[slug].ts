declare const htmlTemplate: string; // @ts-expect-error cloudflare converts this to a string using esbuild
import htmlTemplate from "../../public/template.html";
declare const notFoundEn: string; // @ts-expect-error cloudflare converts this to a string using esbuild
import notFoundEn from "../../public/404.html";

import { fsConfig } from "@dzcode.io/utils/dist/config";
import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
import { plainLocalize } from "@dzcode.io/web/dist/components/locale/utils";
import { dictionary, AllDictionaryKeys } from "@dzcode.io/web/dist/components/locale/dictionary";

// @TODO-ZM: pass envs during deployment
export interface Env {
  STAGE: Environment;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  let stage = context.env.STAGE;
  if (!environments.includes(stage)) {
    console.log(`⚠️  No STAGE provided, falling back to "development"`);
    stage = "development";
  }
  const fullstackConfig = fsConfig(stage);

  const apiUrl = fullstackConfig.api.url;

  const pathName = new URL(context.request.url).pathname;

  const projectIdRegex = /projects\/(.*)-(.\d)+/;
  const projectId = pathName?.match(projectIdRegex)?.[2];

  if (!projectId)
    return new Response(notFoundEn, {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 404,
    });

  // @TODO-ZM: get language from request url
  const language = "en";
  const localize = (key: AllDictionaryKeys) =>
    plainLocalize(dictionary, language, key, "NO-TRANSLATION");

  // @TODO-ZM: use fetchV2
  const projectResponse = await fetch(`${apiUrl}/Projects/${projectId}/name`);

  if (!projectResponse.ok) {
    return new Response(notFoundEn, {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 404,
    });
  }

  const projectData = await projectResponse.json();
  // @ts-expect-error @TODO-ZM: import @dzcode.io/api
  const pageTitle = `${localize("project-title-pre")} ${projectData.project.name} ${localize("project-title-post")}`;

  const newData = htmlTemplate
    .replace(/{{template-title}}/g, pageTitle)
    .replace(/{{template-description}}/g, localize("projects-description"));

  return new Response(newData, { headers: { "content-type": "text/html; charset=utf-8" } });
};
