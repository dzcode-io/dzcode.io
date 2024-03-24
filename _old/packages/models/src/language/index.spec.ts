import { runDTOTestCases } from "src/_test";

import { allLanguages, LanguageEntity } from ".";

runDTOTestCases(
  LanguageEntity,
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
    direction: "ltr",
  },
  {},
);

it("should match snapshot of allLanguages", () => {
  expect(allLanguages).toMatchSnapshot("allLanguages");
});
