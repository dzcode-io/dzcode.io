import { Footer } from ".";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { mainStore } from "src/apps/main/redux";
import { render } from "@testing-library/react";

describe("components/footer/footer.spec.tsx", () => {
  test("should render properly", () => {
    const { container } = render(
      <Provider store={mainStore}>
        <Router>
          <Footer />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
