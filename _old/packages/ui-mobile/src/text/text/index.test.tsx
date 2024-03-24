import { render } from "@testing-library/react-native";

import { Text } from ".";

describe("Text", () => {
  it("should render", () => {
    const { container } = render(<Text>Text</Text>);
    expect(container).toBeTruthy();
  });
});
