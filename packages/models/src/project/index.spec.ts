import { ProjectEntity } from ".";
import { runDTOTestCases } from "../_test";

runDTOTestCases(
  ProjectEntity,
  {
    name: "Leblad",
    repositories: [
      {
        provider: "github",
        owner: "dzcode-io",
        repository: "leblad",
      },
      {
        provider: "github",
        owner: "abderrahmaneMustapha",
        repository: "leblad-py",
      },
    ],
    slug: "Leblad",
  },
  {},
);
