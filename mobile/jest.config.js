module.exports = {
  ...require("@dzcode.io/tooling/jest.config"),
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|react-native-screens|react-native-reanimated|react-clone-referenced-element|expo(nent)?|@unimodules/.*|jest-expo/.*|@expo(nent)?/.*|react-navigation|@sentry|@react-navigation/.*|sentry-expo|native-base))",
  ],
};
