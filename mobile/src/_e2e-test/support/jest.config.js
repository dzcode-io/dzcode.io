/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: "../../../",
  testMatch: ["<rootDir>/src/_e2e-test/tests/**/*.test.ts"],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: "detox/runners/jest/globalSetup",
  globalTeardown: "detox/runners/jest/globalTeardown",
  reporters: ["detox/runners/jest/reporter"],
  testEnvironment: "detox/runners/jest/testEnvironment",
  verbose: true,
};
