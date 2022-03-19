import { render } from "@testing-library/react";

import { Grid } from ".";

it("should render Grid component", () => {
  const { container } = render(<Grid />);
  expect(container).toMatchSnapshot();
});
