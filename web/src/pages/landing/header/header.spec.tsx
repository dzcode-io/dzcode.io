import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "src/redux";

import { Header } from "./index";

describe("header component", () => {
  test("should render header component", () => {
    const mainStore = createStore();

    const { container } = render(
      <Provider store={mainStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
