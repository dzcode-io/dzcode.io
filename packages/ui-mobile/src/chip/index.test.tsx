import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { Chip } from ".";

describe("Chip", () => {
  it("should render", () => {
    const { container } = render(
      <Chip>
        <Text>Chip</Text>
      </Chip>,
    );
    expect(container).toBeTruthy();
  });
});
