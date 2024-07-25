export const getEnv = () => {
  switch (location.hostname) {
    case "www.dzcode.io":
    case "dzcode.io":
      return "production";
    case "stage.dzcode.io":
      return "staging";
    default:
      return "development";
  }
};
