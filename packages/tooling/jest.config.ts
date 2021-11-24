import type { Config } from "@jest/types";

export default {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  globals: { "ts-jest": { tsconfig: "<rootDir>/tsconfig.json" } },
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  testPathIgnorePatterns: ["<rootDir>/(?!src)"],
} as Config.InitialOptions;
