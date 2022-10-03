import "./style.scss";

import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";
import { Flex, MAX_CONTAINER_WIDTH } from "@dzcode.io/ui/dist/v2/flex";
import { Navbar } from "@dzcode.io/ui/dist/v2/navbar";
import { Stack } from "@dzcode.io/ui/dist/v2/stack";
import { ComponentType, FC, lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Route, RouteProps, Switch, useLocation, useRouteMatch } from "react-router-dom";
import logo from "src/assets/svg/logo-wide.svg";
import { Footer } from "src/components/footer";
import { Loading } from "src/components/loading";
import { t } from "src/components/t";
import { actions } from "src/redux";
import { useSliceSelector } from "src/redux/selectors";
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
  {
    import: import("src/pages/learn"),
    path: "/Learn",
  },
  {
    import: import("src/pages/projects"),
    path: "/Projects",
  },
  {
    import: import("src/pages/articles"),
    path: "/Articles",
  },
  {
    import: import("src/pages/faq"),
    path: "/FAQ",
  },
  {
    import: import("src/pages/contribute"),
    path: "/Contribute",
  },
  {
    import: import("src/pages/team"),
    path: "/Team",
  },
  {
    import: import("src/pages/not-found"),
  },
];

export const App: FC = () => {
  const location = useLocation();
  const match = useRouteMatch<{ lang?: LanguageEntity["code"] }>(urlLanguageRegEx);
  const { language, themeName } = useSliceSelector("settings");
  const { links } = useSliceSelector("navbarComponent");

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
      actions.settings.set({ language: urlLanguage });
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{t("landing-title")}</title>
      </Helmet>
      <Stack direction="vertical">
        <Navbar
          version={window.bundleInfo.version}
          selectedLanguageCode={language.code}
          themeName={themeName}
          logo={logo}
          links={links}
          onLanguageChanged={(selectedLanguageCode) => {
            actions.settings.set({
              language: allLanguages.find(({ code }) => code === selectedLanguageCode),
            });
          }}
          onThemeChanged={(selectedThemeName) => {
            actions.settings.set({ themeName: selectedThemeName });
          }}
        />
        <Flex max={{ width: MAX_CONTAINER_WIDTH }}>
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
        </Flex>
        <Footer />
      </Stack>
    </>
  );
};
