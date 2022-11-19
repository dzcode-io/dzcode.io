import { runDTOTestCases } from "src/_test";

import { AccountEntity } from ".";

runDTOTestCases(
  AccountEntity,
  {
    link: "https://github.com/ZibanPirate",
    id: "20110076",
    name: "Zakaria Mansouri",
    image: "https://api.github.com/users/ZibanPirate.png",
  },
  {},
);
