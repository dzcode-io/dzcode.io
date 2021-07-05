import React from "react";
import renderer from "react-test-renderer";

import Learn from "../src/screens/Learn/ui/LearnUI";

it("renders correctly", () => {
  renderer.create(<Learn />);
});
