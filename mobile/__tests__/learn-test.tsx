import Learn from "../src/screens/learn/ui/learn-screen";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Learn />);
});
