module.exports = {
  preset: "jest-expo",
  setupFiles: ["./src/_test/setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)|@react-navigation|@sentry/)",
  ],
};
