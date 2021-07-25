import Learn from "../src/screens/learn/ui/learn-ui";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Learn />);
});
