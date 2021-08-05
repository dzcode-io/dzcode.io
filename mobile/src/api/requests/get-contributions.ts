// import endpoints
import { GET_CONTRIBUTES_URL } from "../endpoints";

/**
 * @function getContributes
 * @description this function get all contributions
 * @param {Array<string>} projects - ids of projects
 * @param {Array<string>} languages - ids of languages
 * @param {Array<string>} labels - ids of labels
 * @returns {object} returns the json response if contrubutions are found, else it will return undefined
 * @author [Omar Belghaouti](https://github.com/Omar-Belghaouti)
 */
export const getContributes = async (
  projects: Array<string> = [""],
  languages: Array<string> = [""],
  labels: Array<string> = [""],
) => {
  try {
    // define full url
    const FULL_GET_CONTRIBUTES_URL = `${GET_CONTRIBUTES_URL}projects=${projects.join(
      ",",
    )}&languages=${languages.join(",")}&labels=${labels.join(",")}&`;
    // define payload
    const payload = {
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
