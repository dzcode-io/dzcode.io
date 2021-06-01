import { Action } from "src/apps/main/redux";

interface Filter {
  label: string;
  name: string;
  options: Array<{
    label: string;
    name: string;
    checked: boolean;
  }>;
}

interface Contribution {
  id: string;
  title: string;
  description: string;
  projectId: string;
  url: string;
  languages: string[];
  labels: string[];
}

export interface ContributePageState {
  filters: Filter[];
  contributions?: Contribution[];
}

export const contributePage = (
  state: ContributePageState = {
    filters: [
      {
        label: "Project",
        name: "projects",
        options: [
          { checked: false, label: "leblad", name: "leblad" },
          { checked: false, label: "leblad-py", name: "leblad-py" },
          { checked: false, label: "kuliya", name: "kuliya" },
          { checked: false, label: "dzcode.io", name: "dzcode.io" },
          { checked: false, label: "phanos", name: "phanos" },
        ],
      },
      {
        label: "Type",
        name: "types",
        options: [
          { checked: false, label: "issue", name: "Issue" },
          { checked: false, label: "pr", name: "Pull/Merge Request" },
        ],
      },
      {
        label: "Label",
        name: "labels",
        options: [
          { checked: false, label: "bug", name: "bug" },
          { checked: false, label: "enhancement", name: "enhancement" },
          { checked: false, label: "ui/ux", name: "ui/ux" },
          {
            checked: false,
            label: "good first issue",
            name: "good first issue",
          },
        ],
      },
      {
        label: "Language",
        name: "languages",
        options: [
          { checked: false, label: "JavaScript", name: "JavaScript" },
          { checked: false, label: "Pug", name: "Pug" },
          { checked: false, label: "TypeScript", name: "TypeScript" },
          { checked: false, label: "SCSS", name: "SCSS" },
          { checked: false, label: "Dockerfile", name: "Dockerfile" },
          { checked: false, label: "Java", name: "Java" },
        ],
      },
    ],
    contributions: [
      {
        id: "github/dzcode-io/dzcode.io/308",
        title: "Adding projects and articles directly from website",
        description: `When I clicked on the contribute button that takes to [www.dzcode.io/Contribute](https://www.dzcode.io/Contribute) I found that this page is not implemented yet and thus it rises an idea for me and that is what if there is a way to add projects and articles directly from the website without forking and adding to json files like we always do.

Other than that, this website is one of the awesome ones and definitely I'm proud of it.

![image](https://user-images.githubusercontent.com/48713070/119314037-26e58d00-bc6c-11eb-87b7-c35850cdef9f.png)
`,
        projectId: "github/dzcode-io/dzcode.io",
        url: "https://github.com/dzcode-io/dzcode.io/issues/308",
        languages: ["TypeScript", "JavaScript", "Pug", "SCSS", "Dockerfile"],
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
        projectId: "github/dzcode-io/dzcode.io",
        url: "https://github.com/dzcode-io/dzcode.io/issues/306",
        languages: ["TypeScript", "JavaScript", "Pug", "SCSS", "Dockerfile"],
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
        projectId: "github/dzcode-io/kuliya",
        url: "https://github.com/dzcode-io/kuliya/issues/13",
        languages: ["TypeScript", "JavaScript", "Pug", "SCSS", "Dockerfile"],
        labels: ["bug", "good first issue"],
      },
      {
        id: "github/dzcode-io/dzcode.io/308",
        title: "Adding projects and articles directly from website",
        description: `When I clicked on the contribute button that takes to [www.dzcode.io/Contribute](https://www.dzcode.io/Contribute) I found that this page is not implemented yet and thus it rises an idea for me and that is what if there is a way to add projects and articles directly from the website without forking and adding to json files like we always do.

Other than that, this website is one of the awesome ones and definitely I'm proud of it.

![image](https://user-images.githubusercontent.com/48713070/119314037-26e58d00-bc6c-11eb-87b7-c35850cdef9f.png)
`,
        projectId: "github/dzcode-io/dzcode.io",
        url: "https://github.com/dzcode-io/dzcode.io/issues/308",
        languages: ["TypeScript", "JavaScript", "Pug", "SCSS", "Dockerfile"],
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
        projectId: "github/dzcode-io/dzcode.io",
        url: "https://github.com/dzcode-io/dzcode.io/issues/306",
        languages: ["TypeScript", "JavaScript", "Pug", "SCSS", "Dockerfile"],
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
        projectId: "github/dzcode-io/kuliya",
        url: "https://github.com/dzcode-io/kuliya/issues/13",
        languages: ["TypeScript", "JavaScript", "Pug", "SCSS", "Dockerfile"],
        labels: ["bug", "good first issue"],
      },
    ],
  },
  action: Action<ContributePageState>,
) => {
  switch (action.type) {
    case "UPDATE_CONTRIBUTE_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
