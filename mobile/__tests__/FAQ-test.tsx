import React from "react";
import renderer from "react-test-renderer";

import FAQ from "../src/screens/FAQ/ui/FAQUI";

it("renders correctly", () => {
  renderer.create(<FAQ />);
});
