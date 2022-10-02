import { render } from "@testing-library/react-native";
import React from "react";

import { Divider } from ".";

describe("Divider", () => {
  it("should render", () => {
    const { container } = render(<Divider />);
    expect(container).toBeTruthy();
  });
});
