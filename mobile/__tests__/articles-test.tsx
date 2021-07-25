import Articles from "../src/screens/articles/ui/articles-ui";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Articles />);
});
