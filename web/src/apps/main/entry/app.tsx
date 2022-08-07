import "./style.scss";

import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import Container from "@material-ui/core/Container";
import { ComponentType, FC, lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouteProps, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { Footer } from "src/apps/main/components/footer";
import { Navbar } from "src/apps/main/components/navbar";
import { t } from "src/apps/main/components/t";
import { Theme } from "src/apps/main/components/theme";
import { getEnv } from "src/common/utils";
import { urlLanguageRegEx } from "src/common/utils/language";
import { Loading } from "src/components/loading";

import { Dispatch, StateInterface } from "../redux";
import { SettingsState } from "../redux/reducers/settings";

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
    import: import("src/apps/main/pages/contribute"),
    path: "/Contribute",
  },
  {
    import: import("src/apps/main/pages/team"),
    path: "/Team",
  },
  {
    import: import("src/apps/main/pages/not-found"),
  },
];

export const App: FC = () => {
  const location = useLocation();
  const match = useRouteMatch<{ lang?: LanguageEntity["code"] }>(urlLanguageRegEx);
  const { language } = useSelector<StateInterface, SettingsState>((state) => state.settings);
  const dispatch = useDispatch<Dispatch<SettingsState>>();

  useEffect(() => {
    if (getEnv() !== "development") {
      if (window.ga) {
        window.ga("set", "page", location.pathname);
        window.ga("send", "pageview");
        window.fbq("track", "PageView");
      }
    }

    const urlLanguage =
      allLanguages.find(({ code }) => code === match?.params.lang) || allLanguages[0];
    if (urlLanguage.code !== language.code) {
      dispatch({
        type: "UPDATE_SETTINGS",
        payload: { language: urlLanguage },
      });
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
