import { GeneralGithubQuery, ListContributorsResponse } from "./types";

import Axios from "axios";
import { GithubService } from "./service";
import { githubUserMock } from "../../test/mocks";

jest.mock("axios");
const mockedAxios = Axios as jest.Mocked<typeof Axios>;

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

  it("should throw error when api call fails", async () => {
    mockedAxios.get.mockRejectedValue({ meg: "service down" });
    const githubService = new GithubService();
    let errorThrown = false;
    try {
      await githubService.listContributors(githubQuery);
    } catch (error) {
      errorThrown = error;
    }
    expect(errorThrown).toMatchObject({ meg: "service down" });
  });

  it("should return list of contributors when api call succeed", async () => {
    mockedAxios.get.mockResolvedValue({ data: contributorsMock });
    const githubService = new GithubService();
    const contributors = await githubService.listContributors(githubQuery);

    expect(contributors).toMatchObject([githubUserMock]);
  });
});
