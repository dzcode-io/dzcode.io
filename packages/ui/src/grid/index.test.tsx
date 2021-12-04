import { Grid } from ".";
import { render } from "@testing-library/react";

it("should render Grid component", () => {
  const { container } = render(<Grid />);
  expect(container).toMatchSnapshot();
});
