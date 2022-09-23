import { render } from "@testing-library/react-native";
import React from "react";

import { DZCodeLoading } from ".";

describe("DZCodeLoading", () => {
  it("should render", () => {
    const { container } = render(<DZCodeLoading />);
    expect(container).toBeTruthy();
  });
});
