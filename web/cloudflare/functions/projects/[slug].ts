declare const htmlTemplate: string;
// @ts-expect-error cloudflare converts this to a string using esbuild
import htmlTemplate from "../../public/template.html";

import { fsConfig } from "@dzcode.io/utils/dist/config";
import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";

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

  const slug = pathName.split("/").pop();
  const projectId = slug?.split("-").pop();

  // @TODO-ZM: render 404 page
  if (!projectId) return new Response("Not found", { status: 404 });

  // @TODO-ZM: use fetchV2
  console.log("zako", `${apiUrl}/Projects/${projectId}/name`);
  const projectResponse = await fetch(`${apiUrl}/Projects/${projectId}/name`);
  const projectData = await projectResponse.json();
  // @ts-expect-error @TODO-ZM: import @dzcode.oi/api
  // @TODO-ZM: localize
  const pageTitle = `See the details of ${projectData.project.name} project | DzCode i/o`;

  const newData = htmlTemplate.replace(/{{template-title}}/, pageTitle);

  return new Response(newData, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};
