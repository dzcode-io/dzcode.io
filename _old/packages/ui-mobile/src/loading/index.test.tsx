import { render } from "@testing-library/react-native";

import { DZCodeLoading } from ".";

describe("DZCodeLoading", () => {
  it("should render", () => {
    const { container } = render(<DZCodeLoading />);
    expect(container).toBeTruthy();
  });
});
