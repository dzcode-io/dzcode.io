import Contribute from "../src/screens/contribute/ui/contribute-ui";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Contribute />);
});
