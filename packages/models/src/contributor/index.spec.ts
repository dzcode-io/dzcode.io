import { ContributorEntity } from ".";
import { runDTOTestCases } from "../_test";

runDTOTestCases(
  ContributorEntity,
  {
    avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
    id: "20110076",
    username: "ZibanPirate",
  },
  {
    repositories: [],
  }
);
