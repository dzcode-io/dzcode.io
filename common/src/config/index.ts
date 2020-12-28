import { Environment } from "../types";

const apiPort = 7070;
const dataPort = 9090;
const frontendPort = 8080;

export const fsConfig = (env: Environment, extra?: Record<string, unknown>) => {
  const hostname = extra?.hostname || "localhost";
  const e = ["development", "staging", "production"].indexOf(env);
  return {
    api: {
      port: apiPort,
      url: [
        `http://${hostname}:${apiPort}`,
        "https://api.staging.dzcode.io",
        "https://api.dzcode.io",
      ][e],
    },
    data: {
      port: dataPort,
      url: [
        `http://${hostname}:${dataPort}`,
        "https://data.staging.dzcode.io",
        "https://data.dzcode.io",
      ][e],
    },
    frontend: {
      port: frontendPort,
      url: [
        `http://${hostname}:${frontendPort}`,
        "https://www.staging.dzcode.io",
        "https://www.dzcode.io",
      ][e],
    },
  };
};
