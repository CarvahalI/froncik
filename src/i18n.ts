import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationPL from './locales/pl.json';
import translationENG from './locales/eng.json';
import { initReactI18next } from 'react-i18next';

const resources = {
    eng: {
        translation: translationENG,
    },
    pl: {
        translation: translationPL,
    },
};

i18n.use(LanguageDetector).use(initReactI18next).init({fallbackLng: 'eng', resources,});

// Zmiana języka na angielski
// i18n.changeLanguage('eng');

// Z powrotem na polski (nie chciało wrócić po zmianie na ang)
i18n.changeLanguage('pl');

export default i18n;