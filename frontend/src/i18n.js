import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationVI from './locales/vi/translation.json';
// the translations

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

export { changeLanguage };

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: '.', // separator child element

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
