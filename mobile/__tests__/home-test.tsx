import { HomeScreen } from "../src/screens/home";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<HomeScreen />);
});
