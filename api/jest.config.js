module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.ts"],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  transform: {
    "^.+\\.(ts)?$": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "dist",
    "src/app/index.ts",
    // temporarily until we migrate all endpoints to v2
    "src/app/controllers",
    "src/app/routes",
    "src/app/services",
    "src/app/loaders",
  ],
};
