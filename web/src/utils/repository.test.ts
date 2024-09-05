import { getRepositoryName, getRepositoryURL } from "./repository";

describe("getRepositoryName", () => {
  it("should return the repository name", () => {
    const repository = {
      owner: "dzcode.io",
      name: "dzcode.io",
    } as const;
    expect(getRepositoryName(repository)).toBe("dzcode.io/dzcode.io");
  });
});

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
