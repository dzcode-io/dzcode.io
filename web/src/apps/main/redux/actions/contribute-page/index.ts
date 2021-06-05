import {
  ContributePageState,
  Contribution,
} from "src/apps/main/redux/reducers/contribute-page";
import { ThunkResult } from "src/apps/main/redux";
import debounce from "@material-ui/core/utils/debounce";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;

/**
 * fetchContributions fetch an array from api and pass it to the store
 */
export const fetchContributions = (): ThunkResult<ContributePageState> => async (
  dispatch,
) => {
  dispatch({
    type: "UPDATE_CONTRIBUTE_PAGE",
    payload: { contributions: null },
  });
  try {
    const contributions = await new Promise<Contribution[]>((res) =>
      setTimeout(
        () =>
          res([
            {
              id: "github/dzcode-io/dzcode.io/308",
              title: "Adding projects and articles directly from website",
              description: `When I clicked on the contribute button that takes to [www.dzcode.io/Contribute](https://www.dzcode.io/Contribute) I found that this page is not implemented yet and thus it rises an idea for me and that is what if there is a way to add projects and articles directly from the website without forking and adding to json files like we always do.

  Other than that, this website is one of the awesome ones and definitely I'm proud of it.

  ![image](https://user-images.githubusercontent.com/48713070/119314037-26e58d00-bc6c-11eb-87b7-c35850cdef9f.png)
  `,
              project: {
                id: "github/dzcode-io/dzcode.io",
                name: "dzcode-io/dzcode.io",
              },
              url: "https://github.com/dzcode-io/dzcode.io/issues/308",
              languages: [
                "TypeScript",
                "JavaScript",
                "Pug",
                "SCSS",
                "Dockerfile",
              ],
              labels: ["enhancement", "ui/ux"],
            },
            {
              id: "github/dzcode-io/dzcode.io/306",
              title: "Perf: Improve initial page load experience",
              description: `**Describe the bug**

  As a user/crawler, I should see minimal content when pages are loading. And ideally, the page loads faster for me.


  **To Reproduce**
  Steps to reproduce the behavior:

  1. Empty cache and access to any page

  **Expected behavior**

  - See "something" while the page is loading.
  - Load the main/important content at first, instead of none or everything

  **Screenshots**

  Google lighthouse score might also confirm this issue:

  ![image](https://user-images.githubusercontent.com/9090674/119261989-ee956e80-bbd9-11eb-9582-23896d14a4eb.png)

  **Possible solutions**

  - Prioritize content loading over unnecessary assets that can be lazy-loaded (for example article content over GH contributors)
  - Dynamically render components
  - Cache Backend-to-data source requests/queries
  - Consider SSR
  - Do more work on the backend (for example fetching contributors lists and returning their avatars).`,
              project: {
                id: "github/dzcode-io/dzcode.io",
                name: "dzcode-io/dzcode.io",
              },
              url: "https://github.com/dzcode-io/dzcode.io/issues/306",
              languages: [
                "TypeScript",
                "JavaScript",
                "Pug",
                "SCSS",
                "Dockerfile",
              ],
              labels: ["bug", "good first issue"],
            },
            {
              id: "github/dzcode-io/kuliya/13",
              title: "add Java support",
              description: `**Is your feature request related to a problem? Please describe.**
  we need java package for kuliya

  **Describe the solution you'd like**
  a package under \`./java \` folder

  **Resources/Links**
  - http://maven.apache.org/plugin-developers/index.html
  `,
              project: {
                id: "github/dzcode-io/kuliya",
                name: "dzcode-io/kuliya",
              },
              url: "https://github.com/dzcode-io/kuliya/issues/13",
              languages: [
                "TypeScript",
                "JavaScript",
                "Pug",
                "SCSS",
                "Dockerfile",
              ],
              labels: ["bug", "good first issue"],
            },
            {
              id: "github/dzcode-io/dzcode.io/308",
              title: "Adding projects and articles directly from website",
              description: `When I clicked on the contribute button that takes to [www.dzcode.io/Contribute](https://www.dzcode.io/Contribute) I found that this page is not implemented yet and thus it rises an idea for me and that is what if there is a way to add projects and articles directly from the website without forking and adding to json files like we always do.

  Other than that, this website is one of the awesome ones and definitely I'm proud of it.

  ![image](https://user-images.githubusercontent.com/48713070/119314037-26e58d00-bc6c-11eb-87b7-c35850cdef9f.png)
  `,
              project: {
                id: "github/dzcode-io/dzcode.io",
                name: "dzcode-io/dzcode.io",
              },
              url: "https://github.com/dzcode-io/dzcode.io/issues/308",
              languages: [
                "TypeScript",
                "JavaScript",
                "Pug",
                "SCSS",
                "Dockerfile",
              ],
              labels: ["enhancement", "ui/ux"],
            },
            {
              id: "github/dzcode-io/dzcode.io/306",
              title: "Perf: Improve initial page load experience",
              description: `**Describe the bug**

  As a user/crawler, I should see minimal content when pages are loading. And ideally, the page loads faster for me.


  **To Reproduce**
  Steps to reproduce the behavior:

  1. Empty cache and access to any page

  **Expected behavior**

  - See "something" while the page is loading.
  - Load the main/important content at first, instead of none or everything

  **Screenshots**

  Google lighthouse score might also confirm this issue:

  ![image](https://user-images.githubusercontent.com/9090674/119261989-ee956e80-bbd9-11eb-9582-23896d14a4eb.png)

  **Possible solutions**

  - Prioritize content loading over unnecessary assets that can be lazy-loaded (for example article content over GH contributors)
  - Dynamically render components
  - Cache Backend-to-data source requests/queries
  - Consider SSR
  - Do more work on the backend (for example fetching contributors lists and returning their avatars).`,
              project: {
                id: "github/dzcode-io/dzcode.io",
                name: "dzcode-io/dzcode.io",
              },
              url: "https://github.com/dzcode-io/dzcode.io/issues/306",
              languages: [
                "TypeScript",
                "JavaScript",
                "Pug",
                "SCSS",
                "Dockerfile",
              ],
              labels: ["bug", "good first issue"],
            },
            {
              id: "github/dzcode-io/kuliya/13",
              title: "add Java support",
              description: `**Is your feature request related to a problem? Please describe.**
  we need java package for kuliya

  **Describe the solution you'd like**
  a package under \`./java \` folder

  **Resources/Links**
  - http://maven.apache.org/plugin-developers/index.html
  `,
              project: {
                id: "github/dzcode-io/kuliya",
                name: "dzcode-io/kuliya",
              },
              url: "https://github.com/dzcode-io/kuliya/issues/13",
              languages: [
                "TypeScript",
                "JavaScript",
                "Pug",
                "SCSS",
                "Dockerfile",
              ],
              labels: ["bug", "good first issue"],
            },
          ]),
        500,
      ),
    );
    dispatch({
      type: "UPDATE_CONTRIBUTE_PAGE",
      payload: { contributions },
    });
  } catch (error) {
    console.error(error);
  }
};

const debouncedFetchContributions = debounce(fetchContributions(), 500);

/**
 * updateFilters update filters state and trigger a debounced fetchContributions action
 */
export const updateFilterValue = (
  filterName: string,
  optionName: string,
  value: boolean,
  updateImmediately = false,
): ThunkResult<ContributePageState> => async (dispatch, getState) => {
  const { filters } = getState().contributePage;
  const newFilters = filters.map((filter) => {
    if (filter.name !== filterName) {
      return filter;
    } else {
      return {
        ...filter,
        options: filter.options.map((option) => {
          if (option.name !== optionName) {
            return option;
          } else {
            return { ...option, checked: value };
          }
        }),
      };
    }
  });
  dispatch({
    type: "UPDATE_CONTRIBUTE_PAGE",
    payload: { filters: newFilters },
  });
  if (!updateImmediately) {
    dispatch(debouncedFetchContributions);
  } else {
    dispatch(fetchContributions());
  }
};
