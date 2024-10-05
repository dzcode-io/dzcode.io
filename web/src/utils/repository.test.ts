import { getRepositoryURL } from "./repository";

describe("getRepositoryURL", () => {
  it("should return the repository URL", () => {
    const repository = {
      owner: "dzcode.io",
      name: "dzcode.io",
      provider: "github",
    } as const;
    expect(getRepositoryURL(repository)).toBe("https://www.github.com/dzcode.io/dzcode.io");
  });
});
