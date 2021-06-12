import { GeneralGithubQuery, ListContributorsResponse } from "./types";

import Axios from "axios";
import { FetchService } from "../fetch/service";
import { GithubService } from "./service";
import { githubUserMock } from "../../test/mocks";
import { mock } from "jest-mock-extended";

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

  const fetchService = mock<FetchService>();

  it("should throw error when api call fails", async () => {
    mockedAxios.get.mockRejectedValue({ meg: "service down" });
    const githubService = new GithubService(fetchService);
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
    const githubService = new GithubService(fetchService);
    const contributors = await githubService.listContributors(githubQuery);

    expect(contributors).toMatchObject([githubUserMock]);
  });
});
