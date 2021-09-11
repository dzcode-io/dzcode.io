import Projects from "../src/screens/projects/ui/projects-screen";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Projects />);
});
