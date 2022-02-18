import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";

import { Header } from "./index";

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
