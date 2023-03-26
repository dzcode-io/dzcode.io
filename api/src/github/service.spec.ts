import { mock } from "jest-mock-extended";
import { githubUserMock } from "src/_test/mocks";
import { ConfigService } from "src/config/service";
import { FetchService } from "src/fetch/service";

import { GithubService } from "./service";
import { GeneralGithubQuery, ListContributorsResponse } from "./types";

describe("GithubService", () => {
  const githubQuery: GeneralGithubQuery = {
    owner: "test-owner",
    repository: "test-repo",
    path: "test/path",
  };
  const contributorsMock: ListContributorsResponse = [
    {
      author: githubUserMock,
      committer: githubUserMock,
    },
  ];

  const configService = mock<ConfigService>({
    env: () => ({
      FETCH_CACHE_PATH: "",
      NODE_ENV: "development",
      PORT: 0,
      BUNDLE_INFO: { version: "test" },
    }),
  });
  const fetchService = mock<FetchService>();

  it("should throw error when api call fails", async () => {
    fetchService.get.mockRejectedValue({ meg: "service down" });
    const githubService = new GithubService(configService, fetchService);
    let errorThrown: unknown;
    try {
      await githubService.listContributors(githubQuery);
    } catch (error) {
      errorThrown = error;
    }
    expect(errorThrown).toMatchObject({ meg: "service down" });
  });

  it("should return list of contributors when api call succeed", async () => {
    fetchService.get.mockResolvedValue(contributorsMock);
    const githubService = new GithubService(configService, fetchService);
    const contributors = await githubService.listContributors(githubQuery);

    expect(contributors).toMatchObject([githubUserMock]);
  });
});
