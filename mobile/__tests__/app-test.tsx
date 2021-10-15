jest.useFakeTimers();

import { App } from "../src/entry";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
