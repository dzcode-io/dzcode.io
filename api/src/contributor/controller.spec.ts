import {
  githubUserMock,
  githubUserMock2,
  githubUserMock3,
} from "../../test/mocks";

import { ContributorController } from "./controller";
import { GetContributorsResponseDto } from "./types";
import { GithubService } from "../github/service";
import { mock } from "jest-mock-extended";

describe("ContributorController", () => {
  const mockedGithubServiceInstance = mock<GithubService>();
  const contributorsMock = [githubUserMock2, githubUserMock, githubUserMock3];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when GithubService fails", async () => {
    mockedGithubServiceInstance.listContributors.mockRejectedValue({
      meg: "service down",
    });

    const contributorController = new ContributorController(
      mockedGithubServiceInstance,
    );
    let errorThrown = false;
    try {
      await contributorController.getContributor("/");
    } catch (error) {
      errorThrown = error;
    }
    expect(errorThrown).toMatchObject({ meg: "service down" });
  });

  it("should return list of contributors when GithubService succeed", async () => {
    mockedGithubServiceInstance.listContributors.mockResolvedValue(
      contributorsMock,
    );

    const contributorController = new ContributorController(
      mockedGithubServiceInstance,
    );

    const contributors = await contributorController.getContributor("/");

    expect(contributors).toMatchObject<GetContributorsResponseDto>({
      contributors: contributorsMock,
    });
  });
});
