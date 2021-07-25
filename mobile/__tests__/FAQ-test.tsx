import FAQ from "../src/screens/FAQ/ui/FAQUI";
import React from "react";
import renderer from "react-test-renderer";

it("renders correctly", async () => {
  renderer.create(<FAQ />);
});
