import { Button } from "@mui/material";
import { ThemeProvider } from "./theme-provider";
import { render } from "@testing-library/react";

it("should render dzcode light theme", () => {
  const { container } = render(
    <ThemeProvider mode="light">
      <Button variant="contained">Button</Button>
    </ThemeProvider>
  );

  expect(container).toMatchSnapshot();
});

it("should render dzcode dark theme", () => {
  const { container } = render(
    <ThemeProvider mode="dark">
      <Button variant="contained">Button</Button>
    </ThemeProvider>
  );

  expect(container).toMatchSnapshot();
});

it("should render inverted theme", () => {
  const { container } = render(
    <ThemeProvider direction="rtl">
      <Button variant="contained">اضغظ هنا</Button>
    </ThemeProvider>
  );

  expect(container).toMatchSnapshot();
});
