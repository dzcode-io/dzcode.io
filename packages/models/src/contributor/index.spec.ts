import { runDTOTestCases } from "src/_test";

import { ContributorEntity } from ".";

runDTOTestCases(
  ContributorEntity,
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
    id: "20110076",
    username: "ZibanPirate",
  },
  {
    repositories: [],
  },
);
