import { render } from "@testing-library/react-native";
import React from "react";

import { ContributeCard } from ".";

describe("ContributeCard", () => {
  it("should render", () => {
    const { container } = render(
      <ContributeCard
        commentsCount={0}
        labels={[]}
        onChipPress={() => undefined}
        onPress={() => undefined}
        subtitle={"subtitle"}
        title={"title"}
        type={"issue"}
        updatedAt={"2022-09-27T00:00:00Z"}
      />,
    );
    expect(container).toBeTruthy();
  });
});
