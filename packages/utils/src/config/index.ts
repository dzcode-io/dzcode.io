import { Environment } from "./environment";

const apiPort = 7070;
const frontendPort = 8080;

export const fsConfig = (env: Environment, extra?: Record<string, unknown>) => {
  const hostname = extra?.hostname || "localhost";
  const e = ["development", "staging", "production"].indexOf(env);
  return {
    api: {
      port: apiPort,
      url: [
        `http://${hostname}:${apiPort}`,
        "https://api-stage.dzcode.io",
        "https://api.dzcode.io",
      ][e],
    },
    web: {
      port: frontendPort,
      url: [
        `http://${hostname}:${frontendPort}`,
        "https://stage.dzcode.io",
        "https://www.dzcode.io",
      ][e],
    },
  };
};
