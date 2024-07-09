import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom';
import './App.css';
import { TopBar } from './components/top-bar';
import { Footer } from './components/footer';
import { Loadable } from './components/loadable';
import { getInitialLanguageCode } from './redux/slices/settings';
import { Languages } from './components/locale/languages';
import { getAppStore } from './redux/store';

let routes: Array<
  RouteProps & {
    pageName: string;
  }
> = [
  {
    pageName: 'landing',
    path: '/',
    index: true,
  },
  {
    pageName: 'learn',
    path: '/learn/:articleId?',
  },
  {
    pageName: 'projects',
    path: '/projects',
  },
  {
    pageName: 'articles',
    path: '/articles/:articleId?',
  },
  {
    pageName: 'faq',
    path: '/faq',
  },
  {
    pageName: 'contribute',
    path: '/contribute',
  },
  {
    pageName: 'team',
    path: '/team',
  },
  {
    pageName: 'not-found',
  },
];

const initialLanguageCode = getInitialLanguageCode();
if (initialLanguageCode !== Languages[0].code) {
  routes = routes.map((route) => {
    return {
      ...route,
      path: `/${initialLanguageCode}${route.path}`,
    };
  });
}

const App = () => {
  return (
    <>
      <TopBar
        version={window.bundleInfo.version}
        links={[
          { href: '/contribute', localeKey: 'navbar-section-contribute' },
          { href: '/team', localeKey: 'navbar-section-connect' },
          { href: '/learn', localeKey: 'navbar-section-learn' },
          { href: '/projects', localeKey: 'navbar-section-projects' },
          { href: '/articles', localeKey: 'navbar-section-articles' },
          { href: '/faq', localeKey: 'navbar-section-faq' },
        ]}
      />
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
      <Footer
        sections={[
          {
            localeKey: 'footer-category-title-helpful-links',
            links: [
              { localeKey: 'footer-category-link-text-home', href: '/' },
              {
                localeKey: 'footer-category-link-text-learn',
                href: '/learn',
              },
              {
                localeKey: 'footer-category-link-text-projects',
                href: '/projects',
              },
              {
                localeKey: 'footer-category-link-text-articles',
                href: '/articles',
              },
              { localeKey: 'footer-category-link-text-faq', href: '/faq' },
            ],
          },
          {
            localeKey: 'footer-category-title-social-media',
            links: [
              {
                localeKey: 'footer-category-link-text-github',
                href: 'https://www.github.com/dzcode-io',
              },
              {
                localeKey: 'footer-category-link-text-slack',
                href: 'https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ',
              },
              {
                localeKey: 'footer-category-link-text-facebook',
                href: 'https://www.facebook.com/dzcode.io',
              },
              {
                localeKey: 'footer-category-link-text-instagram',
                href: 'https://www.instagram.com/dzcode.io',
              },
              {
                localeKey: 'footer-category-link-text-youTube',
                href: 'https://www.youtube.com/channel/UC_tLjuQaYotzERtaAo8Y4SQ',
              },
              {
                localeKey: 'footer-category-link-text-twitter',
                href: 'https://twitter.com/dzcode_io',
              },
              {
                localeKey: 'footer-category-link-text-linkedIn',
                href: 'https://www.linkedin.com/groups/8924363',
              },
            ],
          },
        ]}
      />
    </>
  );
};

const AppWithProviders = () => {
  return (
    <ReduxProvider store={getAppStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default AppWithProviders;
