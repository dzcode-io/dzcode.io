import { render } from "@testing-library/react";

import { Typography } from ".";

it("should render Typography component", () => {
  const { container } = render(<Typography />);
  expect(container).toMatchSnapshot();
});
