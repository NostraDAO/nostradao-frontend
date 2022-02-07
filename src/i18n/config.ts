import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    lng: "en",
    resources: {
        en: {
            translations: require("./locales/en/translations.json"),
        },
        es: {
            translations: require("./locales/es/translations.json"),
        },

        pt: {
            translations: require("./locales/pt/translations.json"),
        },

        ch: {
            translations: require("./locales/ch/translations.json"),
        },

        ft: {
            translations: require("./locales/fr/translations.json"),
        },
    },
    ns: ["translations"],
    defaultNS: "translations",
});

i18n.languages = ["en", "es", "pt", "ch", "fr"];

export default i18n;