import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMainStore } from "src/redux";

import { t } from "../../components/t";
import { FaqPage } from ".";

describe("src/pages/landing/index.tsx", () => {
  test("Render FAQ page", async () => {
    const mainStore = createMainStore();
    const faqIndex = 0;

    const { container } = render(
      <Provider store={mainStore}>
        <Router>
          <FaqPage />
        </Router>
      </Provider>,
    );

    const firstQuestionTitle = await screen.findByText(
      t(mainStore.getState().faqPage.faqData[0].title),
    );

    expect(firstQuestionTitle.innerHTML).toBe(
      t(mainStore.getState().faqPage.faqData[faqIndex].title),
    );
    expect(container).toMatchSnapshot();
  });
});
