import { runDTOTestCases } from "src/_test";

import { ContributionEntity } from ".";

runDTOTestCases(
  ContributionEntity,
  {
    activityCount: 0,
    title: "Update the data set",
    type: "ISSUE",
    updatedAt: "2020-02-02T20:22:02.000Z",
    url: "https://github.com/dzcode-io/leblad/issues/71",
    id: 0,
    runId: "test-run-id",
  },
  {},
);
