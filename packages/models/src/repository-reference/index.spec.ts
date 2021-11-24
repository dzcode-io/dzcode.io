import { RepositoryReferenceEntity } from ".";
import { runDTOTestCases } from "../_test";

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
  }
);
