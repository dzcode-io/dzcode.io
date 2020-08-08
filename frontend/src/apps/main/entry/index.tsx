import "./style";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Footer } from "t9/apps/main/components/footer";
import { Loading } from "src/components/loading";
import { Navbar } from "t9/apps/main/components/navbar";
import { Provider } from "react-redux";
import { Theme } from "t9/apps/main/components/theme";
import { ToastContainer } from "react-toastify";
import { mainStore } from "t9/apps/main/redux";
import { render } from "react-dom";

const Landing = lazy(() => import("t9/apps/main/scenes/landing"));
const Articles = lazy(() => import("t9/apps/main/scenes/articles"));
const Projects = lazy(() => import("t9/apps/main/scenes/projects"));
const Learn = lazy(() => import("t9/apps/main/scenes/learn"));
const Contact = lazy(() => import("t9/apps/main/scenes/contact"));

// Temp data:

// TODO: replace with props from the store

const navItems = [
  { id: 1, to: "/Learn/Getting_Started", name: "Learn" },
  { id: 2, to: "/contribute", name: "Contribute" },
  { id: 3, to: "/projects", name: "Projects" },
  { id: 4, to: "/articles", name: "Articles" },
  { id: 5, to: "/Contact-Us", name: "Contact" },
];

// Temp Footer Data
const data = [
  {
    title: "Recent Articles",
    links: [
      {
        href: "https://staging.dzcode.io/Articles/Welcome_to_dzCode",
        text: "Welcome To dzCode.io",
      },
      {
        href: "https://staging.dzcode.io/Learn/Getting_Started",
        text: "Getting Started dzCode.io",
      },
    ],
  },
  {
    title: "Recent Projects",
    links: [
      {
        href: "https://staging.dzcode.io/",
        text: "Algerian Education Hierarchy",
      },
      {
        href: "https://staging.dzcode.io/",
        text: "Algerian Users",
      },
      {
        href: "https://staging.dzcode.io/",
        text: "Algerian Wilaya",
      },
    ],
  },
  {
    title: "Social Media",
    links: [
      {
        href: "www.facebook.com/dzcode.io",
        text: "Facebook",
      },
      {
        href:
          "https://www.youtube.com/channel/UCqWze7IcHI-_2mvByYeGTJg?view_as=subscriber",
        text: "Youtube",
      },
    ],
  },
];

export const App = () => {
  return (
    <Theme>
      <CssBaseline />
      <Container maxWidth="lg">
        <BrowserRouter>
          <Navbar navItems={navItems} />
          <ToastContainer />
          <Suspense fallback={Loading}>
            <Switch>
              <Route path="/" exact={true} component={Landing} />
              <Route path="/Learn" component={Learn} />
              <Route path="/Articles" component={Articles} />
              <Route path="/Projects" component={Projects} />
              <Route path="/Contact-Us" component={Contact} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Suspense>
          <Footer data={data} />
        </BrowserRouter>
      </Container>
    </Theme>
  );
};

render(
  <Provider store={mainStore}>
    <App />
  </Provider>,
  document.getElementById("app-container"),
);
