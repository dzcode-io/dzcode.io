import "./style.scss";

import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import Container from "@material-ui/core/Container";
import { ComponentType, FC, lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Route, RouteProps, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { Footer } from "src/components/footer";
import { Loading } from "src/components/loading";
import { Navbar } from "src/components/navbar";
import { t } from "src/components/t";
import { Theme } from "src/components/theme";
import { slices } from "src/redux/store";
import { useSliceSelector } from "src/redux/store/selectors";
import { getEnv } from "src/utils";
import { urlLanguageRegEx } from "src/utils/language";

interface RouteInterface extends RouteProps {
  import: Promise<{ default: ComponentType }>;
}

const routes: RouteInterface[] = [
  {
    import: import("src/pages/landing"),
    path: "/",
    exact: true,
  },
  // {
  //   import: import("src/pages/learn"),
  //   path: "/Learn",
  // },
  {
    import: import("src/pages/projects"),
    path: "/Projects",
  },
  // {
  //   import: import("src/pages/articles"),
  //   path: "/Articles",
  // },
  {
    import: import("src/pages/faq"),
    path: "/FAQ",
  },
  // {
  //   import: import("src/pages/contribute"),
  //   path: "/Contribute",
  // },
  // {
  //   import: import("src/pages/team"),
  //   path: "/Team",
  // },
  {
    import: import("src/pages/not-found"),
  },
];

export const App: FC = () => {
  const location = useLocation();
  const match = useRouteMatch<{ lang?: LanguageEntity["code"] }>(urlLanguageRegEx);
  const { language } = useSliceSelector("settings");
  const dispatch = useDispatch();

  useEffect(() => {
    if (getEnv() !== "development") {
      if (window.ga) {
        window.ga("set", "page", location.pathname);
        window.ga("send", "pageview");
      }
    }

    const urlLanguage =
      allLanguages.find(({ code }) => code === match?.params.lang) || allLanguages[0];
    if (urlLanguage.code !== language.code) {
      dispatch(slices.settings.actions.set({ language: urlLanguage }));
    }
  }, [location]);

  return (
    <Theme>
      <ErrorBoundary>
        <Helmet>
          <title>{t("landing-title")}</title>
        </Helmet>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <Container maxWidth="lg" style={{ paddingTop: "130px" }}>
            <Suspense fallback={<Loading />}>
              <Switch>
                {routes.map(({ import: im, path, ...route }, index) => (
                  <Route
                    {...route}
                    path={path ? `${urlLanguageRegEx}${path}` : undefined}
                    key={`route-${index}`}
                    component={lazy(() => im)}
                  />
                ))}
              </Switch>
            </Suspense>
          </Container>
          <Footer />
        </div>
      </ErrorBoundary>
    </Theme>
  );
};
