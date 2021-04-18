module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!react-syntax-highlighter)"],
  coveragePathIgnorePatterns: ["node_modules", "dist"],
  modulePaths: ["<rootDir>"],
};
