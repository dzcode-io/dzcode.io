import Home from "../src/screens/Home/ui/HomeUI";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Home />);
});
