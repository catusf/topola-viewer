import 'canvas-toBlob';
import {detect} from 'detect-browser';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import {HashRouter as Router} from 'react-router';
import 'semantic-ui-css/semantic.min.css';
import {App} from './app';
import './index.css';
import messages_bg from './translations/bg.json';
import messages_cs from './translations/cs.json';
import messages_de from './translations/de.json';
import messages_fr from './translations/fr.json';
import messages_it from './translations/it.json';
import messages_pl from './translations/pl.json';
import messages_ru from './translations/ru.json';
import messages_vi from './translations/vi.json';
import {LanguageContext} from './util/language-context';
import {MediaContextProvider, mediaStyles} from './util/media';

const messages: {[language: string]: {[message_id: string]: string}} = {
  bg: messages_bg,
  cs: messages_cs,
  de: messages_de,
  fr: messages_fr,
  it: messages_it,
  pl: messages_pl,
  ru: messages_ru,
  vi: messages_vi,
};

function Root() {
  const defaultLang =
    navigator.language && navigator.language.split(/[-_]/)[0]
      ? navigator.language.split(/[-_]/)[0]
      : 'en';
  const [language, setLanguage] = React.useState<string>(
    localStorage.getItem('topola_language') ?? defaultLang,
  );

  const handleSetLanguage = (lang: string) => {
    localStorage.setItem('topola_language', lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{language, setLanguage: handleSetLanguage}}>
      <IntlProvider locale={language} messages={messages[language]}>
        <MediaContextProvider>
          <style>{mediaStyles}</style>
          <Router>
            <App />
          </Router>
        </MediaContextProvider>
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

const browser = detect();

const container = document.getElementById('root');
const root = createRoot(container!);

if (browser && browser.name === 'ie') {
  root.render(
    <p>
      Topola Genealogy Viewer does not support Internet Explorer. Please try a
      different (modern) browser.
    </p>,
  );
} else {
  root.render(<Root />);
}
