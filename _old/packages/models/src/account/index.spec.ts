import { runDTOTestCases } from "src/_test";

import { AccountEntity } from ".";

runDTOTestCases(
  AccountEntity,
  {
    id: "github/20110076",
    username: "ZibanPirate",
    name: "Zakaria Mansouri",
    profileUrl: "/Account/github/20110076",
    avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
  },
  {
    repositories: [],
  },
);
