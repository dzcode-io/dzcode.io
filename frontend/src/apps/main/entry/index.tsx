import "./style";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, lazy } from "react";
import { Route, Router, Switch, useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Footer } from "t9/apps/main/components/footer";
import { Loading } from "src/components/loading";
import { Navbar } from "t9/apps/main/components/navbar";
import { Provider } from "react-redux";
import { Theme } from "t9/apps/main/components/theme";
import { ToastContainer } from "react-toastify";
import { getEnv } from "src/common/utils";
import { history } from "src/common/utils/history";
import { mainStore } from "t9/apps/main/redux";
import { makeStyles } from "@material-ui/core/styles";
import { render } from "react-dom";

const Landing = lazy(() => import("t9/apps/main/pages/landing"));
const Articles = lazy(() => import("t9/apps/main/pages/articles"));
const Projects = lazy(() => import("t9/apps/main/pages/projects"));
const Learn = lazy(() => import("t9/apps/main/pages/learn"));
const Faq = lazy(() => import("t9/apps/main/pages/faq"));
const Contact = lazy(() => import("t9/apps/main/pages/contact"));
const NotFound = lazy(() => import("t9/apps/main/pages/not_found"));

const env = getEnv();

const useStyles = makeStyles({
  main: {
    paddingTop: "130px",
  },
});

const Main = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Container maxWidth="lg">
        <ToastContainer />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/Learn" component={Learn} />
            <Route path="/Articles" component={Articles} />
            <Route path="/Projects" component={Projects} />
            <Route path="/Contact-Us" component={Contact} />
            <Route path="/FAQ" component={Faq} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Container>
    </main>
  );
};

export const App = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (env !== "development") {
      window.ga("set", "page", location.pathname);
      window.ga("send", "pageview");
      window.fbq("track", "PageView");
    }
  }, [location]);

  return (
    <Theme>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Main />
        <Footer />
        <CssBaseline />
      </div>
    </Theme>
  );
};

render(
  <Provider store={mainStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app-container"),
);
