import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { BottomSheetScrollView } from ".";

describe("BottomSheetScrollView", () => {
  it("should render", () => {
    const { container } = render(
      <BottomSheetScrollView>
        <Text>Test</Text>
      </BottomSheetScrollView>,
    );
    expect(container).toBeTruthy();
  });
});
