import Learn from "../src/screens/Learn/ui/LearnUI";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Learn />);
});
