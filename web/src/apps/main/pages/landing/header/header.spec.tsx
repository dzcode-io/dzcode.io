import { Header } from "./index";
import { render } from "@testing-library/react";

describe("header component", () => {
  test("should render header component", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
