import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { BottomSheet } from ".";

describe("BottomSheet", () => {
  it("should render", () => {
    const { container } = render(
      <BottomSheet>
        <Text>Test</Text>
      </BottomSheet>,
    );
    expect(container).toBeTruthy();
  });
});
