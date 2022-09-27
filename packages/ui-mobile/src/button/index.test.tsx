import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { Button } from ".";

describe("Button", () => {
  it("should render", () => {
    const { container } = render(
      <Button>
        <Text>Button</Text>
      </Button>,
    );
    expect(container).toBeTruthy();
  });
});
