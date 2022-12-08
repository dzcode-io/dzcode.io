import "./style.scss";

import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";
import { Flex, MAX_CONTAINER_WIDTH } from "@dzcode.io/ui/dist/v2/flex";
import { Footer } from "@dzcode.io/ui/dist/v2/footer";
import { Navbar } from "@dzcode.io/ui/dist/v2/navbar";
import { Stack } from "@dzcode.io/ui/dist/v2/stack";
import { FC, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Route, RouteProps, Switch, useLocation, useRouteMatch } from "react-router-dom";
import logo from "src/assets/svg/logo-wide.svg";
import logoExtended from "src/assets/svg/logo-wide-extended.svg";
import { L } from "src/components/l";
import { Loading } from "src/components/loading";
import { t } from "src/components/t";
import { actions } from "src/redux";
import { useSliceSelector } from "src/redux/selectors";
import { getEnv } from "src/utils";
import { urlLanguageRegEx } from "src/utils/language";

interface RouteInterface extends RouteProps {
  pageName: string;
}

const routes: RouteInterface[] = [
  {
    pageName: "landing",
    path: "/",
    exact: true,
  },
  {
    pageName: "learn",
    path: "/Learn/:articleId*",
  },
  {
    pageName: "projects",
    path: "/Projects",
  },
  {
    pageName: "articles",
    path: "/Articles/:articleId*",
  },
  {
    pageName: "faq",
    path: "/FAQ",
  },
  {
    pageName: "contribute",
    path: "/Contribute",
  },
  {
    pageName: "team",
    path: "/Team",
  },
  {
    pageName: "not-found",
  },
];

export const App: FC = () => {
  const location = useLocation();
  const match = useRouteMatch<{ lang?: LanguageEntity["code"] }>(urlLanguageRegEx);
  const landingPageMatch = useRouteMatch<{ lang?: LanguageEntity["code"] }>(`${urlLanguageRegEx}/`);
  const { language, themeName } = useSliceSelector("settings");
  const { links } = useSliceSelector("navbarComponent");
  const { sections } = useSliceSelector("footerComponent");

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
      <Stack direction="vertical" min={{ height: "100vh" }}>
        <Navbar
          version={window.bundleInfo.version}
          selectedLanguageCode={language.code}
          themeName={themeName}
          logo={logo}
          logoExtended={logoExtended}
          links={links}
          onLanguageChanged={(selectedLanguageCode) => {
            actions.settings.set({
              language: allLanguages.find(({ code }) => code === selectedLanguageCode),
            });
          }}
          onThemeChanged={(selectedThemeName) => {
            actions.settings.set({ themeName: selectedThemeName });
          }}
          fixed={!!landingPageMatch?.isExact}
        />
        <Flex max={{ width: MAX_CONTAINER_WIDTH }} grow={1} display="flex">
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map(({ pageName, path, ...route }, index) => (
                <Route
                  {...route}
                  path={path ? `${urlLanguageRegEx}${path}` : undefined}
                  key={`route-${index}`}
                  render={() => <L page={pageName} />}
                />
              ))}
            </Switch>
          </Suspense>
        </Flex>
        <Footer sections={sections} bottomText="footer-bottom-text" />
      </Stack>
    </>
  );
};
