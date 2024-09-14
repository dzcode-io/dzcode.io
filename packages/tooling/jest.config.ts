import type { Config } from "@jest/types";

export default {
  passWithNoTests: true,
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transform: { "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }] },
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/src/_test", "<rootDir>/src/_e2e-test"],
  testPathIgnorePatterns: ["<rootDir>/(?!src)", "<rootDir>/src/_test", "<rootDir>/src/_e2e-test"],
  modulePathIgnorePatterns: ["<rootDir>/(?!src)", "<rootDir>/src/_test", "<rootDir>/src/_e2e-test"],
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/file-mock.ts",
    "^.+\\.(css|sass|scss)$": "<rootDir>/src/__mocks__/style-mock.ts",
    "^src/(.*)": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/src/_test/setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/_test/pre-test.ts"],
} as Config.InitialOptions;
