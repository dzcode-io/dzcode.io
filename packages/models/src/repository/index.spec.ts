import { RepositoryEntity } from ".";
import { runDTOTestCases } from "../_test";

runDTOTestCases(
  RepositoryEntity,
  {
    provider: "github",
    owner: "dzcode-io",
    repository: "leblad",
  },
  {
    contributions: [],
    contributors: [],
  },
);
