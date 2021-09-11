import Articles from "../src/screens/articles/articles-list/ui/articles-list-screen";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Articles />);
});
