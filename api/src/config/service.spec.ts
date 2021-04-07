import { ConfigService } from "./service";
import dotenv from "dotenv";

jest.mock("dotenv");
const mockedDotenv = dotenv as jest.Mocked<typeof dotenv>;

describe("ConfigService", () => {
  it("should throw error when .env has invalid key value pair", async () => {
    mockedDotenv.config.mockReturnValue({ parsed: { ENV: "testing" } });

    expect(() => new ConfigService()).toThrowError(
      `⚠️  Errors in .env file in the following keys:\nENV : {\"matches\":\"ENV must match (development)|(staging)|(production) regular expression\"}`,
    );
  });

  it("should return default envs when .env is empty or doesn't exists", async () => {
    mockedDotenv.config.mockReturnValue({ error: new Error("test-error") });

    const configService = new ConfigService();
    expect(configService).toBeInstanceOf(ConfigService);
    expect(configService.env()).toMatchObject({ ENV: "development" });
  });
});
