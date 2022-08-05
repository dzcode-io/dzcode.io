import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createMainStore } from "src/apps/main/redux";

import { Header } from "./index";

describe("header component", () => {
  test("should render header component", () => {
    const mainStore = createMainStore();

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
