import { Environment } from "./environment";

const apiPort = 7070;
const dataPort = 9090;
const frontendPort = 8080;
const mobilePort = 19002;

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
    data: {
      port: dataPort,
      url: [
        `http://${hostname}:${dataPort}`,
        "https://data.stage.dzcode.io",
        "https://data.dzcode.io",
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
    mobile: {
      port: mobilePort,
      ios: {
        url: [
          `http://${hostname}:${mobilePort}`,
          "https://testflight.apple.com/join/XDcfIqdJ",
          "https://testflight.apple.com/join/XDcfIqdJ",
        ][e],
      },
      android: {
        url: [
          `http://${hostname}:${mobilePort}`,
          "https://play.google.com/store/apps/details?id=io.dzcode.mobile",
          "https://play.google.com/store/apps/details?id=io.dzcode.mobile",
        ][e],
      },
      expo: {
        url: [
          `http://${hostname}:${mobilePort}`,
          "https://expo.dev/@zakman.dev/dzcode?release-channel=stage",
          "https://expo.dev/@zakman.dev/dzcode?release-channel=production",
        ][e],
      },
    },
  };
};
