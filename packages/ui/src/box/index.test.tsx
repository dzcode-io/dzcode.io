import { Box } from ".";
import { render } from "@testing-library/react";

it("should render Box component", () => {
  const { container } = render(<Box />);
  expect(container).toMatchSnapshot();
});
