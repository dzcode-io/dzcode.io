import "./style.scss";

import { ComponentType, FC, Suspense, lazy, useEffect } from "react";
import { Route, RouteProps, Switch, useLocation } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { Footer } from "src/apps/main/components/footer";
import { Loading } from "src/components/loading";
import { Navbar } from "src/apps/main/components/navbar";
import { Theme } from "src/apps/main/components/theme";
import { getEnv } from "src/common/utils";

interface RouteInterface extends RouteProps {
  import: Promise<{ default: ComponentType }>;
}

const routes: RouteInterface[] = [
  {
    import: import("src/apps/main/pages/landing"),
    path: "/",
    exact: true,
  },
  {
    import: import("src/apps/main/pages/learn"),
    path: "/Learn",
  },
  {
    import: import("src/apps/main/pages/projects"),
    path: "/Projects",
  },
  {
    import: import("src/apps/main/pages/articles"),
    path: "/Articles",
  },
  {
    import: import("src/apps/main/pages/faq"),
    path: "/FAQ",
  },
  {
    import: import("src/apps/main/pages/not-found"),
  },
];

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
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Container maxWidth="lg" style={{ paddingTop: "130px" }}>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  {...route}
                  key={`route-${index}`}
                  component={lazy(() => route.import)}
                />
              ))}
            </Switch>
          </Suspense>
        </Container>
        <Footer />
      </div>
    </Theme>
  );
};
