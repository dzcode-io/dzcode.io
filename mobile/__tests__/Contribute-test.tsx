import Contribute from "../src/screens/Contribute/ui/ContributeUI";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Contribute />);
});
