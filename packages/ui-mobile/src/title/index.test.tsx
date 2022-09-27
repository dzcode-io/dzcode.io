import { render } from "@testing-library/react-native";
import React from "react";

import { Title } from ".";

describe("Title", () => {
  it("should render", () => {
    const { container } = render(<Title>Text</Title>);
    expect(container).toBeTruthy();
  });
});
