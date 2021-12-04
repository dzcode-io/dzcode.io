import { LanguageEntity, allLanguages } from ".";
import { runDTOTestCases } from "../_test";

runDTOTestCases(
  LanguageEntity,
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
  },
  {},
);

it("should match snapshot of allLanguages", () => {
  expect(allLanguages).toMatchSnapshot("allLanguages");
});
