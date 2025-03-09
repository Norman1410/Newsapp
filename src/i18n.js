import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importamos los archivos de traducción
import esTranslations from "./Locales/es.json";
import enTranslations from "./Locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: esTranslations },
    en: { translation: enTranslations },
  },
  lng: "es", // Idioma por defecto (puede ser "en" si prefieres)
  fallbackLng: "es", // Si no encuentra una traducción, usa español
  interpolation: {
    escapeValue: false, // Evita problemas con caracteres especiales
  },
});

export default i18n;
