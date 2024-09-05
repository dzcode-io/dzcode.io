import { runDTOTestCases } from "src/_test";

import { ProjectReferenceEntity } from ".";

runDTOTestCases(
  ProjectReferenceEntity,
  {
    name: "Leblad",
    repositories: [
      {
        provider: "github",
        owner: "dzcode-io",
        name: "leblad",
      },
      {
        provider: "github",
        owner: "abderrahmaneMustapha",
        name: "leblad-py",
      },
    ],
    slug: "Leblad",
  },
  {},
);
