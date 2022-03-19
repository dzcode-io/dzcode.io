import { render } from "@testing-library/react";

import { Box } from ".";

it("should render Box component", () => {
  const { container } = render(<Box />);
  expect(container).toMatchSnapshot();
});
