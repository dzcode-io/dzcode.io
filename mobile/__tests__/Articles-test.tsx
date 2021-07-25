import Articles from "../src/screens/Articles/ui/ArticlesUI";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<Articles />);
});
