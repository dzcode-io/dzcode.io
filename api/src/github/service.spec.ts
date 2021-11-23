import { GeneralGithubQuery, ListContributorsResponse } from "./types";

import { FetchService } from "../fetch/service";
import { GithubService } from "./service";
import { mock } from "jest-mock-extended";
import { githubUserMock } from "../test/mocks";

describe("GithubService", () => {
  const githubQuery: GeneralGithubQuery = {
    owner: "test-owner",
    repo: "test-repo",
    path: "test/path",
  };
  const contributorsMock: ListContributorsResponse = [
    {
      author: githubUserMock,
      committer: githubUserMock,
    },
  ];

  const fetchService = mock<FetchService>();

  it("should throw error when api call fails", async () => {
    fetchService.get.mockRejectedValue({ meg: "service down" });
    const githubService = new GithubService(fetchService);
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
    const githubService = new GithubService(fetchService);
    const contributors = await githubService.listContributors(githubQuery);

    expect(contributors).toMatchObject([githubUserMock]);
  });
});
