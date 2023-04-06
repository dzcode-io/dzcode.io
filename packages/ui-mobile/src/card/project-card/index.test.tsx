import { render } from "@testing-library/react-native";
import { View } from "react-native";

import { ProjectCard } from ".";

describe("ProjectCard", () => {
  it("should render", () => {
    const { container } = render(<View />);
    expect(container).toBeTruthy();
  });
});
