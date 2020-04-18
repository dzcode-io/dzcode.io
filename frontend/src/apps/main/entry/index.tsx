import React from "react";
import { render } from "react-dom";
import "./style";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { LazyComponent } from "src/components/lazy-component";
import { Loading } from "src/components/loading";

export const App: React.SFC<{}> = () => {
  return (
    <BrowserRouter>
      <div>Navbar</div>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => (
            <LazyComponent
              import={() =>
                import(/* webpackChunkName: "landing" */ "../scenes/landing")
              }
              placeholder={Loading}
            />
          )}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
      <div>Footer</div>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("app-container"));
