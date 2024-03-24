import { render } from "@testing-library/react-native";

import { Badge } from ".";

describe("Badge", () => {
  it("should render", () => {
    const { container } = render(<Badge />);
    expect(container).toBeTruthy();
  });
});
