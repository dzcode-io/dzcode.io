import { render } from "@testing-library/react-native";

import { Paragraph } from ".";

describe("Paragraph", () => {
  it("should render", () => {
    const { container } = render(<Paragraph>Text</Paragraph>);
    expect(container).toBeTruthy();
  });
});
