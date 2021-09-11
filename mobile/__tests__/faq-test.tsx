import FAQ from "../src/screens/faq/ui/faq-screen";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<FAQ />);
});
