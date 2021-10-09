import "./style.scss";

import { ComponentType, FC, Suspense, lazy, useEffect } from "react";
import { Route, RouteProps, Switch, useLocation } from "react-router-dom";
import { defineMessages, useIntl } from "react-intl";
import Container from "@material-ui/core/Container";
import { Footer } from "src/apps/main/components/footer";
import { Loading } from "src/components/loading";
import Localization from "src/localization";
import { Navbar } from "src/apps/main/components/navbar";
import { Theme } from "src/apps/main/components/theme";
import { getEnv } from "src/common/utils";

interface RouteInterface extends RouteProps {
  import: Promise<{ default: ComponentType }>;
}

const messages = defineMessages({
  learn: {
    id: "learn.path",
    defaultMessage: "Learn",
    description: "Learn page route",
  },
  projects: {
    id: "projects.path",
    defaultMessage: "Projects",
    description: "Projects page route",
  },
  articles: {
    id: "articles.path",
    defaultMessage: "Articles",
    description: "Articles page route",
  },
  faq: {
    id: "faq.path",
    defaultMessage: "FAQ",
    description: "FAQ page route",
  },
  contribute: {
    id: "contribute.path",
    defaultMessage: "Contribute",
    description: "Contribute page route",
  },
  team: {
    id: "team.path",
    defaultMessage: "Team",
    description: "Team page route",
  },
});

const routes: any[] = [
  {
    import: import("src/apps/main/pages/landing"),
    path: "/",
    exact: true,
  },
  {
    import: import("src/apps/main/pages/learn"),
    path: messages.learn,
    translate: true,
  },
  {
    import: import("src/apps/main/pages/projects"),
    path: messages.projects,
    translate: true,
  },
  {
    import: import("src/apps/main/pages/articles"),
    path: messages.articles,
    translate: true,
  },
  {
    import: import("src/apps/main/pages/faq"),
    path: messages.faq,
    translate: true,
  },
  {
    import: import("src/apps/main/pages/contribute"),
    path: messages.contribute,
    translate: true,
  },
  {
    import: import("src/apps/main/pages/team"),
    path: messages.team,
    translate: true,
  },
  {
    import: import("src/apps/main/pages/not-found"),
  },
];
const Routes: FC = () => {
  const intl = useIntl();
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          exact={route.exact ? route.exact : undefined}
          path={
            route.translate
              ? `/${intl.formatMessage(route.path)}`
              : typeof route.path === "string"
              ? "/"
              : undefined
          }
          key={`route-${index}`}
          component={lazy(() => route.import)}
        />
      ))}{" "}
    </Switch>
  );
};

export const App: FC = () => {
  if (getEnv() !== "development") {
    const location = useLocation();

    useEffect(() => {
      if (window.ga) {
        window.ga("set", "page", location.pathname);
        window.ga("send", "pageview");
        window.fbq("track", "PageView");
      }
    }, [location]);
  }

  return (
    <Theme>
      <Localization>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <Container maxWidth="lg" style={{ paddingTop: "130px" }}>
            <Suspense fallback={<Loading />}>
              <Routes></Routes>
            </Suspense>
          </Container>
          <Footer />
        </div>
      </Localization>
    </Theme>
  );
};
