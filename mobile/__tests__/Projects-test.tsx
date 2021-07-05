import React from "react";
import renderer from "react-test-renderer";

import Projects from "../src/screens/Projects/ui/ProjectsUI";

it("renders correctly", () => {
  renderer.create(<Projects />);
});
