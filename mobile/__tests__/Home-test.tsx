import React from "react";
import renderer from "react-test-renderer";

import Home from "../src/screens/Home/ui/HomeUI";

it("renders correctly", async () => {
  renderer.create(<Home />);
});
