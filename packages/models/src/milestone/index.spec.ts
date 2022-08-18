import { runDTOTestCases } from "../_test";
import { MilestoneEntity } from ".";

runDTOTestCases(
  MilestoneEntity,
  {
    id: "8320713",
    title: "Localization (web)",
    description: "Adding an Arabic version of  dzcode.io",
    url: "https://github.com/dzcode-io/dzcode.io/milestone/9",
    status: "open",
    closedIssuesCount: 2,
    openIssuesCount: 4,
    createdAt: "2022-08-18T09:55:46Z",
  },
  {
    closedAt: "2022-08-30T09:55:46Z",
    dueAt: "2022-08-30T09:55:46Z",
  },
);
