import { Environment } from "../types";

const dataPort = 9090;
const frontendPort = 8080;

export const fsConfig = (env: Environment) => {
  const e = ["development", "staging", "production"].indexOf(env);
  return {
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
