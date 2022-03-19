import { Button } from "@mui/material";
import { render } from "@testing-library/react";

import { ThemeProvider } from "./theme-provider";

it("should render dzcode light theme", () => {
  const { container } = render(
    <ThemeProvider mode="light">
      <Button variant="contained">Button</Button>
    </ThemeProvider>,
  );

  expect(container).toMatchSnapshot();
});

it("should render dzcode dark theme", () => {
  const { container } = render(
    <ThemeProvider mode="dark">
      <Button variant="contained">Button</Button>
    </ThemeProvider>,
  );

  expect(container).toMatchSnapshot();
});

it("should render inverted theme", () => {
  const { container } = render(
    <ThemeProvider direction="rtl">
      <Button variant="contained">اضغظ هنا</Button>
    </ThemeProvider>,
  );

  expect(container).toMatchSnapshot();
});
