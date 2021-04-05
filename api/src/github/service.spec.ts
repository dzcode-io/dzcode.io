import { GeneralGithubQuery, ListContributorsResponse } from "./types";

import Axios from "axios";
import { GithubService } from "./service";
import { GithubUser } from "@dzcode.io/common/dist/types";

jest.mock("axios");
const mockedAxios = Axios as jest.Mocked<typeof Axios>;

describe("GithubService", () => {
  const githubQuery: GeneralGithubQuery = {
    owner: "test-owner",
    repo: "test-repo",
    path: "test/path",
  };
  const githubUserMock: GithubUser = {
    avatar_url: "avatar_url", // eslint-disable-line camelcase
    html_url: "html_url", // eslint-disable-line camelcase
    id: "id",
    login: "login",
    type: "type",
  };
  const contributorsMock: ListContributorsResponse = [
    {
      author: githubUserMock,
      committer: githubUserMock,
    },
  ];

  it("should throw error when api call fails", async () => {
    mockedAxios.get.mockRejectedValue({});
    const githubService = new GithubService();
    let errorThrown = false;
    try {
      await githubService.listContributors(githubQuery);
    } catch (error) {
      errorThrown = true;
    }
    expect(errorThrown).toBe(true);
    expect(mockedAxios.get).toBeCalled();
  });

  it("should return list of contributors when api call succeed", async () => {
    mockedAxios.get.mockResolvedValue({ data: contributorsMock });
    const githubService = new GithubService();
    const contributors = await githubService.listContributors(githubQuery);

    expect(contributors).toMatchObject([githubUserMock]);
  });
});
