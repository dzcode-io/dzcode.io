import { Endpoints } from "./endpoints";
import { fullstackConfig } from "../../config";

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

  const [domain, url] = (endpoint as string).split(":", 2);
  let baseURL = "";

  switch (domain) {
    case "data":
      baseURL = fullstackConfig.data.url;
      break;
    case "api":
      baseURL = fullstackConfig.api.url;
      break;
  }
  const response = await fetch(`${baseURL}/${url}${queryString}`, { body });
  return (await response.json()) as C[D & "response"];
};
