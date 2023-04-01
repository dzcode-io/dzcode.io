import { render } from "@testing-library/react-native";

import { Markdown } from ".";

describe("Markdown", () => {
  it("should render", () => {
    const { container } = render(<Markdown content="# Test" />);
    expect(container).toBeTruthy();
  });
});
