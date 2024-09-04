import { runDTOTestCases } from "src/_test";

import { RepositoryEntity } from ".";

runDTOTestCases(
  RepositoryEntity,
  {
    provider: "github",
    owner: "dzcode-io",
    name: "leblad",
    id: 0,
    runId: "initial-run-id",
  },
  {
    contributions: [],
    contributors: [],
  },
);
