import { Environment } from "../types";

const apiPort = 7070;
const dataPort = 9090;
const frontendPort = 8080;

export const fsConfig = (env: Environment) => {
  const e = ["development", "staging", "production"].indexOf(env);
  return {
    api: {
      port: apiPort,
      url: [
        `http://localhost:${apiPort}`,
        "https://api.staging.dzcode.io",
        "https://api.dzcode.io",
      ][e],
    },
    data: {
      port: dataPort,
      url: [
        `http://localhost:${dataPort}`,
        "https://data.staging.dzcode.io",
        "https://data.dzcode.io",
      ][e],
    },
    frontend: {
      port: frontendPort,
      url: [
        `http://localhost:${frontendPort}`,
        "https://www.staging.dzcode.io",
        "https://www.dzcode.io",
      ][e],
    },
  };
};
