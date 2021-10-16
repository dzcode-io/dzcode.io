import { ConfigService } from "./service";
import dotenv from "dotenv";

jest.mock("dotenv");
const mockedDotenv = dotenv as jest.Mocked<typeof dotenv>;

let OLD_ENV: NodeJS.ProcessEnv;
describe("ConfigService", () => {
  beforeAll(() => {
    OLD_ENV = Object.assign({}, process.env);
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should throw error when .env has invalid key value pair", async () => {
    mockedDotenv.config.mockReturnValue({ parsed: { NODE_ENV: "testing" } });

    expect(() => new ConfigService()).toThrowError(
      `⚠️  Errors in .env file in the following keys:\nNODE_ENV : ${JSON.stringify({
        matches: "NODE_ENV must match (development)|(staging)|(production) regular expression",
      })}`,
    );
  });

  it("should return default envs when .env is empty or doesn't exists", async () => {
    mockedDotenv.config.mockReturnValue({ error: new Error("test-error") });
    process.env = { NODE_ENV: "development" };

    const configService = new ConfigService();
    expect(configService).toBeInstanceOf(ConfigService);
    expect(configService.env()).toMatchObject({ NODE_ENV: "development" });
  });
});
