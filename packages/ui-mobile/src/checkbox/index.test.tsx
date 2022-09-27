import { render } from "@testing-library/react-native";
import React from "react";

import { Checkbox } from ".";

describe("Checkbox", () => {
  it("should render", () => {
    const { container } = render(<Checkbox status="checked" />);
    expect(container).toBeTruthy();
  });
});
