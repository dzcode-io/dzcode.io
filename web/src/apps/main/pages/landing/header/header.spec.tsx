import { Header } from "./index";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("header component", () => {
  test("should render header component", () => {
    const { container } = render(
      <MemoryRouter>
        <IntlProvider locale={"en"} defaultLocale="en">
          <Header />
        </IntlProvider>
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
