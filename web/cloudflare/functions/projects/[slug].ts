declare const data: string;
// @ts-expect-error cloudflare converts this to a string using esbuild
import data from "../../public/index.html";

export const onRequest: PagesFunction = async (context) => {
  // @TODO-ZM: import @dzcode.oi/utils
  // const apiUrl = "https://api-stage.dzcode.io";
  const apiUrl = "http://localhost:7070";

  const pathName = new URL(context.request.url).pathname;
  const slug = pathName.split("/").pop();
  const projectId = slug.split("-").pop();
  // @TODO-ZM: use fetchV2
  const projectResponse = await fetch(`${apiUrl}/Projects/${projectId}/name`);
  const projectData = await projectResponse.json();
  // @ts-expect-error @TODO-ZM: import @dzcode.oi/api
  const pageTitle = `See the details of ${projectData.project.name} project | DzCode i/o`;

  const newData = data.replace(/<title>.*<\/title>/, `<title>${pageTitle}</title>`);

  return new Response(newData, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};
