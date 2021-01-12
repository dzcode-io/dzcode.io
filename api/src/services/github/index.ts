import { ListContributorsResponse } from "./types";
import axios from "axios";

export const listOrganizationRepositories = async ({
  org,
}: {
  org: string;
}) => {
  try {
    const response = await axios.get(
      `https://api.github.com/orgs/${org}/repos`,
    );

    return response.data;
  } catch (error) {
    console.log("listOrganizationRepositories ERROR =>", error.response.data);
    return null;
  }
};

export const listPullRequests = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        params: {
          state: "all",
          // eslint-disable-next-line camelcase
          per_page: 10,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("listPullRequests ERROR =>", error.response.data);
    return null;
  }
};

export const listContributors = async ({
  owner,
  repo,
  path,
}: {
  owner: string;
  repo: string;
  path: string;
}) => {
  try {
    const response = await axios.get<ListContributorsResponse>(
      `https://api.github.com/repos/${owner}/${repo}/commits?path=${path}`,
      {
        // eslint-disable-next-line camelcase
        params: { state: "all", per_page: 10 },
      },
    );
    const contributors = response.data.map(
      ({ committer: { login, avatar_url, html_url, type, id } }) => ({
        id,
        login,
        avatar_url,
        html_url,
        type,
      }),
    );

    return contributors;
  } catch (error) {
    console.log("listContributors ERROR =>", error.response.data);
    return null;
  }
};

// from merouane
export const listStars = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  try {
    const response = await axios.get(
      ` https://api.github.com/repos/${owner}/${repo}`,
    );

    return response.data;
  } catch (error) {
    console.log("countOfStarsonRepo ERROR =>", error.response.data);
    return null;
  }
};

export const listStargazers = async ({
  owner,
  repo,
  page,
}: {
  owner: string;
  repo: string;
  page: number;
}) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stargazers`,
      {
        params: {
          state: "all",
          // eslint-disable-next-line camelcase
          per_page: 100,
          page: page,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("countOfStarsonRepo ERROR =>", error.response.data);
    return null;
  }
};
