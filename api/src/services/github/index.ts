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
          // eslint-disable-next-line @typescript-eslint/camelcase, camelcase
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
