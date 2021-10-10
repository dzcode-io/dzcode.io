import { render, screen } from "@testing-library/react";
import { FaqPage } from ".";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMainStore } from "src/apps/main/redux";

describe("src/pages/landing/index.tsx", () => {
  test("Render FAQ page", async () => {
    const mainStore = createMainStore();
    const faqIndex = 0;

    const { container } = render(
      <Provider store={mainStore}>
        <Router>
          <IntlProvider locale={"en"} defaultLocale="en">
            <FaqPage />
          </IntlProvider>
        </Router>
      </Provider>,
    );

    const firstQuestionTitle = await screen.findByTestId(`faq-title-${faqIndex}`);

    expect(firstQuestionTitle.innerHTML).toBe(mainStore.getState().faqPage.faqData[faqIndex].title);
    expect(container).toMatchSnapshot();
  });
});
