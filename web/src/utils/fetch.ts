import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { fullstackConfig } from "src/utils/config";

interface Endpoint {
  params?: Record<string, string>;
  query?: [string, string][];
  body?: never;
}

export const fetchV2 = async <
  T extends Endpoints,
  E extends keyof T,
  C extends T[E],
  D extends keyof C,
>(
  endpoint: E,
  config: Pick<C, Exclude<D, "response">>,
): Promise<C[D & "response"]> => {
  const { body, params, query } = config as Endpoint;

  const queryString = query ? "?" + query.map(([key, value]) => `${key}=${value}`).join("&") : "";

  const domain = (endpoint as string).slice(0, (endpoint as string).indexOf(":"));
  let url = (endpoint as string).slice(domain.length + 1);

  if (params) {
    Object.keys(params).forEach((param) => {
      url = url.replace(`:${param}`, params[param]);
    });
  }

  let baseURL = "";

  switch (domain) {
    case "api":
      baseURL = fullstackConfig.api.url;
      break;
  }
  const fullUrl = `${baseURL}/${url}${queryString}`;
  const response = await fetch(fullUrl, { body });
  if (!response.ok) {
    throw new Error(`Fetch: ${response.statusText}: (${fullUrl})`);
  }
  return (await response.json()) as C[D & "response"];
};
