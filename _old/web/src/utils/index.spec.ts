import { getEnv } from ".";

describe("Mock test", () => {
  test("expect 1+1 to be 2", () => {
    const env = getEnv();
    expect(env).toBe("development");
  });
});
