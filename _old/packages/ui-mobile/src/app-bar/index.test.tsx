import { render } from "@testing-library/react-native";

import { AppBar } from ".";

describe("AppBar", () => {
  it("should render", () => {
    const { container } = render(
      <AppBar title="Hello" openDrawer={() => console.log("open drawer")} />,
    );
    expect(container).toBeTruthy();
  });
});
