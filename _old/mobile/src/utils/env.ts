export const getEnv = () => {
  switch (window.bundleInfo.environment) {
    case "production":
      return "production";
    case "stage":
      return "staging";
    default:
      return "development";
  }
};
