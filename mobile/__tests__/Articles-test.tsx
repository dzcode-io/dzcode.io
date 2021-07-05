import React from "react";
import renderer from "react-test-renderer";

import Articles from "../src/screens/Articles/ui/ArticlesUI";

it("renders correctly", () => {
  renderer.create(<Articles />);
});
