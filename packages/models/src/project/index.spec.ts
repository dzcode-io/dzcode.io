import { runDTOTestCases } from "src/_test";

import { ProjectEntity } from ".";

runDTOTestCases(
  ProjectEntity,
  {
    id: 0,
    runId: "initial-run-id",
    name: "Leblad",
    repositories: [
      {
        provider: "github",
        owner: "dzcode-io",
        name: "leblad",
        id: 0,
        runId: "initial-run-id",
      },
      {
        provider: "github",
        owner: "abderrahmaneMustapha",
        name: "leblad-py",
        id: 0,
        runId: "initial-run-id",
      },
    ],
    slug: "Leblad",
  },
  {},
);
