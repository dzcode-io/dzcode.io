import { ProjectsScreen } from "../src/screens/projects";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<ProjectsScreen />);
});
