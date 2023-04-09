import * as Updates from "expo-updates";

export const getReleaseChannel = () => Updates.releaseChannel;

export const getEnv = () => {
  switch (getReleaseChannel()) {
    case "production":
      return "production";
    case "stage":
      return "staging";
    default:
      return "development";
  }
};
