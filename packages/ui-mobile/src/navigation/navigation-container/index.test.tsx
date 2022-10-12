import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { NavigationContainer } from ".";

describe("NavigationContainer", () => {
  it("should render", () => {
    const { container } = render(
      <NavigationContainer>
        <Text>Test</Text>
      </NavigationContainer>,
    );
    expect(container).toBeTruthy();
  });
});
