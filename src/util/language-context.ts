import React from 'react';

export const LanguageContext = React.createContext<{
  language: string;
  setLanguage: (lang: string) => void;
}>({
  language: 'en',
  setLanguage: () => {},
});
