// import interfaces
import { ContributionsResponse } from "../interfaces";

// import endpoints
import { GET_CONTRIBUTES_URL } from "../endpoints";

/**
 * @function getContributes
 * @description this function get all contributions
 * @param {string[]} projects - ids of projects
 * @param {string[]} languages - ids of languages
 * @param {string[]} labels - ids of labels
 * @returns {Promise<ContributionsResponse|undefined>} returns the json response if contrubutions are found, else it will return undefined
 * @author [Omar Belghaouti](https://github.com/Omar-Belghaouti)
 */
export const getContributes = async (
  projects: string[] = [""],
  languages: string[] = [""],
  labels: string[] = [""],
): Promise<ContributionsResponse | undefined> => {
  try {
    // define full url
    const FULL_GET_CONTRIBUTES_URL = `${GET_CONTRIBUTES_URL}projects=${projects.join(
      ",",
    )}&languages=${languages.join(",")}&labels=${labels.join(",")}&`;
    // define payload
    const payload: Record<string, string> = {
      method: "GET",
      //   headers: { accept: "text / html; charset=utf - 8" },
    };
    console.log(FULL_GET_CONTRIBUTES_URL);

    // fetching contributes
    const response = await fetch(GET_CONTRIBUTES_URL, payload);
    // getting json response
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    // if contributes were found, we return them
    if (response.status === 200) {
      return jsonResponse;
    }
    throw `${jsonResponse}`;
  } catch (error) {
    console.error(error);
  }
};
