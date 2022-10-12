import { render } from "@testing-library/react-native";
import React from "react";

import { Filters } from ".";

describe("Filters", () => {
  it("should render", () => {
    const { container } = render(<Filters filters={[]} onCheckboxPress={() => undefined} />);
    expect(container).toBeTruthy();
  });
});
