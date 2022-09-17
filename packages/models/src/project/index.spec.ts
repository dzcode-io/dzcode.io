import { runDTOTestCases } from "src/_test";

import { ProjectEntity } from ".";

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
