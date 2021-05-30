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

export interface ContributePageState {
  filters: Filter[];
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
          { checked: false, label: "bug", name: "Bug" },
          { checked: false, label: "feature", name: "Feature" },
        ],
      },
      {
        label: "Language",
        name: "languages",
        options: [
          { checked: false, label: "javascript", name: "javascript" },
          { checked: false, label: "php", name: "php" },
          { checked: false, label: "python", name: "python" },
          { checked: false, label: "rust", name: "rust" },
          { checked: false, label: "c++", name: "c++" },
          { checked: false, label: "c#", name: "c#" },
          { checked: false, label: "java", name: "java" },
        ],
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
