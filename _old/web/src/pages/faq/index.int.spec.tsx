import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { t } from "src/components/t";
import { getStore } from "src/redux";

import { FaqPage } from ".";

describe("src/pages/landing/index.tsx", () => {
  test("Render FAQ page", async () => {
    const store = getStore();
    const faqIndex = 0;

    const { container } = render(
      <Provider store={store}>
        <Router>
          <FaqPage />
        </Router>
      </Provider>,
    );

    const firstQuestionTitle = await screen.findByText(
      t(store.getState().faqPage.faqData[0].title),
    );

    expect(firstQuestionTitle.innerHTML).toBe(t(store.getState().faqPage.faqData[faqIndex].title));
    expect(container).toMatchSnapshot();
  });
});
