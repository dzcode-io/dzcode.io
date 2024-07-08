import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { TopBar } from './components/top-bar';
import { ReduxProvider } from './redux/provider';

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
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
