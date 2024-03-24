import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { Card } from ".";

describe("Card", () => {
  it("should render", () => {
    const { container } = render(
      <Card>
        <Text>Card</Text>
      </Card>,
    );
    expect(container).toBeTruthy();
  });
});
