import { render } from "@testing-library/react-native";

import { ContributeCard } from ".";

describe("ContributeCard", () => {
  it("should render", () => {
    const { container } = render(
      <ContributeCard
        onChipPress={() => undefined}
        onPress={() => undefined}
        item={{
          title: "test",
          project: {
            name: "test",
            slug: "test",
          },
          type: "issue",
          labels: [],
          commentsCount: 0,
          createdAt: "",
          updatedAt: "",
          id: "",
          languages: [],
          url: "",
        }}
      />,
    );
    expect(container).toBeTruthy();
  });
});
