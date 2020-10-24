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
