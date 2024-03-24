import { render } from "@testing-library/react-native";

import { Checkbox } from ".";

describe("Checkbox", () => {
  it("should render", () => {
    const { container } = render(<Checkbox status="checked" />);
    expect(container).toBeTruthy();
  });
});
