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
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/file-mock.ts",
    "^.+\\.(css|sass|scss)$": "<rootDir>/src/__mocks__/style-mock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!react-syntax-highlighter)"],
  coveragePathIgnorePatterns: ["node_modules", "dist", "src/_common"],
  modulePaths: ["<rootDir>"],
};
