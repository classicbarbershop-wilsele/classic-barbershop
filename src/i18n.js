import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import nl from "./locales/nl";
import en from "./locales/en";
import fr from "./locales/fr";
import de from "./locales/de";
import ar from "./locales/ar";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      nl: {
        translation: nl,
      },
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      de: {
        translation: de,
      },
      ar: {
        translation: ar,
      },
    },

    fallbackLng: "nl",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;