import "./style";
import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Loading } from "src/components/loading";
import { Navbar } from "t9/apps/main/components/navbar";
import { Footer } from "t9/apps/main/components/footer";
import { mainStore } from "t9/apps/main/redux";
import { Provider } from "react-redux";

const Landing = lazy(() => import("t9/apps/main/scenes/landing"));
const Articles = lazy(() => import("t9/apps/main/scenes/articles"));
const Learn = lazy(() => import("t9/apps/main/scenes/learn"));

// Temp data: Todo: replace with props from the store

const navItems = [
  { id: 1, to: "/Learn/Getting_Started", name: "Learn" },
  { id: 2, to: "/", name: "Contribute" },
  { id: 3, to: "/", name: "Projects" },
  { id: 4, to: "/articles", name: "Articles" },
];

export const App: React.SFC<{}> = () => {
  return (
    <BrowserRouter>
      <Navbar navItems={navItems} />
      <Suspense fallback={Loading}>
        <Switch>
          <Route path="/" exact={true} component={Landing} />
          <Route path="/Learn" component={Learn} />
          <Route path="/Articles" component={Articles} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

render(
  <Provider store={mainStore}>
    <App />
  </Provider>,
  document.getElementById("app-container"),
);
