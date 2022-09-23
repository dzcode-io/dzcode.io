import { render } from "@testing-library/react-native";
import React from "react";

import { TryAgain } from ".";

describe("TryAgain", () => {
  it("should render", () => {
    const { container } = render(
      <TryAgain
        error="Ops, an error occurred while loading the contribution cards, please try again..."
        action="Try Again"
        onClick={() => console.log("do something")}
      />,
    );
    expect(container).toBeTruthy();
  });
});
