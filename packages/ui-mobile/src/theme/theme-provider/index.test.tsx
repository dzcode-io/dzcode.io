import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { ThemeProvider } from ".";

describe("ThemeProvider", () => {
  it("should render", () => {
    const { container } = render(
      <ThemeProvider>
        <Text>Hello</Text>
      </ThemeProvider>,
    );
    expect(container).toBeTruthy();
  });
});
