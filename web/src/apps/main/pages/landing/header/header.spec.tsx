import { Header } from "./index";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("header component", () => {
  test("should render header component", () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
