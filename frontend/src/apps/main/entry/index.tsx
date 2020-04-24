import React from "react";
import { render } from "react-dom";
import "./style";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { LazyComponent } from "src/components/lazy-component";
import { Loading } from "src/components/loading";
import { Navbar } from "t9/apps/main/components/navbar";
import { Footer } from "t9/apps/main/components/footer";

export const App: React.SFC<{}> = () => {
  return (
    <BrowserRouter>
      <Navbar />
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
        <Route
          path="/Learn"
          render={() => (
            <LazyComponent
              import={() =>
                import(/* webpackChunkName: "learn" */ "../scenes/learn")
              }
              placeholder={Loading}
            />
          )}
        />
        <Route
          path="/Blogs"
          render={() => (
            <LazyComponent
              import={() =>
                import(/* webpackChunkName: "blogs" */ "../scenes/blogs")
              }
              placeholder={Loading}
            />
          )}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("app-container"));
