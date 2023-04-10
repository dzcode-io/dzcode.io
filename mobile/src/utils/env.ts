export const getEnv = () => {
  switch (window.bundleInfo.channel) {
    case "production":
      return "production";
    case "stage":
      return "staging";
    default:
      return "development";
  }
};
