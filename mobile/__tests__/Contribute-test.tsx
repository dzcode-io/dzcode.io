import React from "react";
import renderer from "react-test-renderer";

import Contribute from "../src/screens/Contribute/ui/ContributeUI";

it("renders correctly", async () => {
  renderer.create(<Contribute />);
});
