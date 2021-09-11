import Home from "../src/screens/home/ui/home-screen";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Home />);
});
