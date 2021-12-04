import { Typography } from ".";
import { render } from "@testing-library/react";

it("should render Typography component", () => {
  const { container } = render(<Typography />);
  expect(container).toMatchSnapshot();
});
