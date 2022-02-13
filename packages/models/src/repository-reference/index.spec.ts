import { runDTOTestCases } from "../_test";
import { RepositoryReferenceEntity } from ".";

runDTOTestCases(
  RepositoryReferenceEntity,
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
