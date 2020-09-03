import "./style";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Footer } from "t9/apps/main/components/footer";
import { Loading } from "src/components/loading";
import { Navbar } from "t9/apps/main/components/navbar";
import { Provider } from "react-redux";
import { Theme } from "t9/apps/main/components/theme";
import { ToastContainer } from "react-toastify";
import { getEnv } from "src/common/utils";
import { mainStore } from "t9/apps/main/redux";
import { render } from "react-dom";

const Landing = lazy(() => import("t9/apps/main/scenes/landing"));
const Articles = lazy(() => import("t9/apps/main/scenes/articles"));
const Projects = lazy(() => import("t9/apps/main/scenes/projects"));
const Learn = lazy(() => import("t9/apps/main/scenes/learn"));
const Faq = lazy(() => import("t9/apps/main/scenes/faq"));
const Contact = lazy(() => import("t9/apps/main/scenes/contact"));

const env = getEnv();

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
      <Navbar />
      <Container maxWidth="lg">
        <ToastContainer />
        <Suspense fallback={Loading}>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/Learn" component={Learn} />
            <Route path="/Articles" component={Articles} />
            <Route path="/Projects" component={Projects} />
            <Route path="/Contact-Us" component={Contact} />
            <Route path="/FAQ" component={Faq} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Suspense>
      </Container>
      <Footer />
      <CssBaseline />
    </Theme>
  );
};

render(
  <Provider store={mainStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app-container"),
);
