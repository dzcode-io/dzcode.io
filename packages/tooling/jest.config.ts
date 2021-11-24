import type { Config } from "@jest/types";

export default {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  globals: { "ts-jest": { tsconfig: "<rootDir>/tsconfig.json" } },
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/src/_test"],
  testPathIgnorePatterns: ["<rootDir>/(?!src)", "<rootDir>/src/_test"],
} as Config.InitialOptions;
