import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMainStore } from "src/apps/main/redux";

import { Footer } from ".";

describe("components/footer/footer.spec.tsx", () => {
  test("should render properly", () => {
    Date.now = jest.fn(() => 1586563200000); // 2020-04-11
    const mainStore = createMainStore();
    const { container } = render(
      <Provider store={mainStore}>
        <Router>
          <IntlProvider locale={"en"} defaultLocale="en">
            <Footer />
          </IntlProvider>
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
