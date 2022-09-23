import { render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";

import { ErrorBoundary } from ".";

describe("ErrorBoundary", () => {
  it("should render", () => {
    const { container } = render(
      <ErrorBoundary>
        <View />
      </ErrorBoundary>,
    );
    expect(container).toBeTruthy();
  });
});
