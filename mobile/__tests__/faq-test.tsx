import { FAQScreen } from "../src/screens/faq";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<FAQScreen />);
});
