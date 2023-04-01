import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { List } from ".";

describe("List", () => {
  it("should render", () => {
    const { container } = render(
      <List.AccordionGroup>
        <Text>List</Text>
      </List.AccordionGroup>,
    );
    expect(container).toBeTruthy();
  });
});
