import { environments } from "./environment";

it("should match snapshot", () => {
  expect(environments).toMatchSnapshot();
});
