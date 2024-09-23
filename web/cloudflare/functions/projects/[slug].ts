declare const data: string;
// @ts-expect-error cloudflare converts this to a string using esbuild
import data from "../../public/index.html";

export const onRequest: PagesFunction = (context) => {
  const pathName = new URL(context.request.url).pathname;
  const slug = pathName.split("/").pop();
  const newData = data.replace(/<title>.*<\/title>/, `<title>Project ${slug} at DzCode</title>`);

  return new Response(newData, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};
