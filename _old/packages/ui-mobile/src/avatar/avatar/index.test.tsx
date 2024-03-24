import { render } from "@testing-library/react-native";

import { Avatar } from ".";

describe("Avatar", () => {
  it("should render", () => {
    const { container } = render(
      <Avatar.Image
        source={{
          uri: "https://avatars.githubusercontent.com/u/63493121?s=200&v=4",
        }}
      />,
    );
    expect(container).toBeTruthy();
  });
});
