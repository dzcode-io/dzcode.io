import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "src/redux/store";

import { t } from "../../components/t";
import { FaqPage } from ".";

describe("src/pages/landing/index.tsx", () => {
  test("Render FAQ page", async () => {
    const store = createStore();
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
