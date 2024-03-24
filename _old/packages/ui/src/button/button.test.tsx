import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Button } from "./index";

test("should render", async () => {
  // ARRANGE
  render(<Button variant={"v1"}>v1 button</Button>);

  // ACT
  await screen.findByText("v1 button");

  // ASSERT
  expect(screen.getByText("v1 button")).toBeInTheDocument();
});
