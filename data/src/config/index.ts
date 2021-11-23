import {
  Environment,
  environments,
} from "@dzcode.io/utils/dist/config/environment";

export const getConfig = (
  environment: Environment = (process.env.NODE_ENV as Environment) ||
    "development",
  extra?: Record<string, unknown>
) => {
  const e = environments.indexOf(environment);

  const hostname = extra?.hostname || "localhost";
  const port = 9090;
  return {
    port,
    url: [
      `http://${hostname}:${port}`,
      "https://data.stage.dzcode.io",
      "https://data.dzcode.io",
    ][e],
  };
};
