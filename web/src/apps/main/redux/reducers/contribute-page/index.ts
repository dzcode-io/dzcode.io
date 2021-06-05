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

export interface Contribution {
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
  contributions: Contribution[] | null;
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
    contributions: null,
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
