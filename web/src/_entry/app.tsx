import "./style.css";

import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, RouteProps } from "react-router-dom";
import { Footer, FooterProps } from "src/components/footer";
import { Loadable } from "src/components/loadable";
import { TopBar, TopBarProps } from "src/components/top-bar";
import { StoreProvider } from "src/redux/store";
import { getInitialLanguageCode } from "src/utils/website-language";
import React from "react";
import { Search } from "src/components/search";
import { DEFAULT_LANGUAGE } from "@dzcode.io/models/dist/language";
import { Routes } from "src/components/instrumented-routes";

let routes: Array<
  RouteProps & {
    pageName: string;
  }
> = [
  {
    pageName: "landing",
    path: "/",
    index: true,
  },
  {
    pageName: "projects",
    path: "/projects",
  },
  {
    pageName: "projects/project",
    path: "/projects/:projectId",
  },
  {
    pageName: "faq",
    path: "/faq",
  },
  {
    pageName: "contribute",
    path: "/contribute",
  },
  {
    pageName: "contribute/contribution",
    path: "/contribute/*",
  },
  {
    pageName: "team",
    path: "/team",
  },
  {
    pageName: "team/contributor",
    path: "/team/:contributorId",
  },
  {
    pageName: "not-found",
    path: "*",
  },
];

const initialLanguageCode = getInitialLanguageCode();
if (initialLanguageCode !== DEFAULT_LANGUAGE.code) {
  routes = routes.map((route) => {
    return {
      ...route,
      path: `/${initialLanguageCode}${route.path}`,
    };
  });
}

const footerSections: FooterProps["sections"] = [
  {
    localeKey: "footer-category-title-helpful-links",
    links: [
      { localeKey: "footer-category-link-text-home", href: "/" },
      {
        localeKey: "footer-category-link-text-projects",
        href: "/projects",
      },
      { localeKey: "footer-category-link-text-faq", href: "/faq" },
    ],
  },
  {
    localeKey: "footer-category-title-social-media",
    links: [
      {
        localeKey: "footer-category-link-text-github",
        href: "https://www.github.com/dzcode-io",
      },
      {
        localeKey: "footer-category-link-text-discord",
        href: "https://discord.gg/TGbPsSMJC2",
      },
      {
        localeKey: "footer-category-link-text-facebook",
        href: "https://www.facebook.com/dzcode.io",
      },
      {
        localeKey: "footer-category-link-text-instagram",
        href: "https://www.instagram.com/dzcode.io",
      },
      {
        localeKey: "footer-category-link-text-youTube",
        href: "https://www.youtube.com/channel/UC_tLjuQaYotzERtaAo8Y4SQ",
      },
      {
        localeKey: "footer-category-link-text-twitter",
        href: "https://twitter.com/dzcode_io",
      },
      {
        localeKey: "footer-category-link-text-linkedIn",
        href: "https://www.linkedin.com/groups/8924363",
      },
    ],
  },
];

const topBarLinks: TopBarProps["links"] = [
  { href: "/contribute", localeKey: "navbar-section-contribute" },
  { href: "/team", localeKey: "navbar-section-connect" },
  { href: "/projects", localeKey: "navbar-section-projects" },
  { href: "/faq", localeKey: "navbar-section-faq" },
];

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Search />
        <TopBar version={window.bundleInfo.version} links={topBarLinks} />
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.pageName}
                path={route.path}
                element={<Loadable page={route.pageName} />}
              />
            );
          })}
        </Routes>
      </div>
      <Footer sections={footerSections} />
    </>
  );
};

export function AppWithProviders() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </StoreProvider>
  );
}
