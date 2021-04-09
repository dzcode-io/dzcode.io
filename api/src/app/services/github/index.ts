import { ListContributorsResponse } from "../../../github/types";
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
    console.log("listStars ERROR =>", error.response.data);
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
    console.log("listStargazers ERROR =>", error.response.data);
    return null;
  }
};

export const listBranches = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  try {
    const response = await axios.get(
      `  https://api.github.com/repos/${owner}/${repo}/branches`,
    );
    return response.data;
  } catch (error) {
    console.log("listBranches ERROR =>", error.response.data);
    return null;
  }
};
export const listCommits = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  try {
    const response = await axios.get(
      `  https://api.github.com/repos/${owner}/${repo}/commits`,
    );
    return response.data;
  } catch (error) {
    console.log("listCommits ERROR =>", error.response.data);
    return null;
  }
};

export const listForks = async ({
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
    console.log("listForks =>", error.response.data);
    return null;
  }
};
export const listIssues = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
    );
    return response.data;
  } catch (error) {
    console.log("listIssues =>", error.response.data);
    return null;
  }
};
export const listWatchers = async ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
    );
    return response.data;
  } catch (error) {
    console.log("listWatchers =>", error.response.data);
    return null;
  }
};

export const getUser = async ({ username }: { username: string }) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    return response.data;
  } catch (error) {
    console.log("getUser =>", error.response.data);
    return null;
  }
};
