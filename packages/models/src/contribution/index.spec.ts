import { ContributionEntity } from ".";
import { runDTOTestCases } from "../_test";

runDTOTestCases(
  ContributionEntity,
  {
    commentsCount: 0,
    id: "71",
    labels: ["discussion", "good first issue"],
    languages: ["JavaScript", "Shell"],
    project: {
      name: "Leblad",
      slug: "Leblad",
    },
    title: "Update the data set",
    type: "issue",
    createdAt: "2020-02-02T20:22:02.000Z",
    updatedAt: "2020-02-02T20:22:02.000Z",
    url: "https://github.com/dzcode-io/leblad/issues/71",
  },
  {}
);
