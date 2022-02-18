import { runDTOTestCases } from "../_test";
import { RepositoryEntity } from ".";

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
