import Projects from "../src/screens/Projects/ui/ProjectsUI";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Projects />);
});
