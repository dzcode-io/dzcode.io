import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { TopBar } from './components/top-bar';
import { ReduxProvider } from './redux/provider';
import { Footer } from './components/footer';

const App = () => {
  return (
    <ReduxProvider>
      <BrowserRouter>
        <TopBar
          version={'publicRuntimeConfig.version'}
          links={[
            { href: '/contribute', localeKey: 'navbar-section-contribute' },
            { href: '/team', localeKey: 'navbar-section-connect' },
            { href: '/learn', localeKey: 'navbar-section-learn' },
            { href: '/projects', localeKey: 'navbar-section-projects' },
            { href: '/articles', localeKey: 'navbar-section-articles' },
            { href: '/faq', localeKey: 'navbar-section-faq' },
          ]}
        />
        <h1>Rsbuild with React</h1>
        <p>Start building amazing things with Rsbuild.</p>

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
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
