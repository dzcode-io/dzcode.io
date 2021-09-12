import { LearnScreen } from "../src/screens/learn";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<LearnScreen />);
});
