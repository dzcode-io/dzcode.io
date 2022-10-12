import { render } from "@testing-library/react-native";
import React from "react";

import { Paragraph } from ".";

describe("Paragraph", () => {
  it("should render", () => {
    const { container } = render(<Paragraph>Text</Paragraph>);
    expect(container).toBeTruthy();
  });
});
