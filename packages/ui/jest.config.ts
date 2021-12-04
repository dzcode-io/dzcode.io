import type { Config } from "@jest/types";
import sharedConfigs from "@dzcode.io/tooling/jest.config";

export default {
  ...sharedConfigs,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
} as Config.InitialOptions;
