import { render } from "@testing-library/react-native";
import React from "react";

import { Badge } from ".";

describe("Badge", () => {
  it("should render", () => {
    const { container } = render(<Badge />);
    expect(container).toBeTruthy();
  });
});
