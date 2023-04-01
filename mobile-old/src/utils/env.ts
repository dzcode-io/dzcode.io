import * as Updates from "expo-updates";

export const getEnv = () => {
  switch (Updates.releaseChannel) {
    case "production":
      return "production";
    case "stage":
      return "staging";
    default:
      return "development";
  }
};
