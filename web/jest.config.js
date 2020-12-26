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
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["node_modules", "dist"],
};
