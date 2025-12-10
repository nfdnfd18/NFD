// i18n initialization that imports per-locale JSON files
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import esES from "./locales/es-ES/translation.json";
import ptBR from "./locales/pt-BR/translation.json";
import zhCN from "./locales/zh-CN/translation.json";
import ru from "./locales/ru/translation.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";
import arMA from "./locales/ar-MA/translation.json";
import de from "./locales/de/translation.json";

// Refactored language JSON imports for NFDRequireNormalUSERAuth
import rn_en from "./localesRequireNormalUSERAuth/en/RequireNormalUSERAuth.json";
import rn_fr from "./localesRequireNormalUSERAuth/fr/RequireNormalUSERAuth.json";
import rn_esES from "./localesRequireNormalUSERAuth/es-ES/RequireNormalUSERAuth.json";
import rn_ptBR from "./localesRequireNormalUSERAuth/pt-BR/RequireNormalUSERAuth.json";
import rn_zhCN from "./localesRequireNormalUSERAuth/zh-CN/RequireNormalUSERAuth.json";
import rn_ru from "./localesRequireNormalUSERAuth/ru/RequireNormalUSERAuth.json";
import rn_ja from "./localesRequireNormalUSERAuth/ja/RequireNormalUSERAuth.json";
import rn_ko from "./localesRequireNormalUSERAuth/ko/RequireNormalUSERAuth.json";
import rn_arMA from "./localesRequireNormalUSERAuth/ar-MA/RequireNormalUSERAuth.json";
import rn_de from "./localesRequireNormalUSERAuth/de/RequireNormalUSERAuth.json";

// Merging with existing resources
const resources = {
  en: { translation: en, RequireNormalUSERAuth: rn_en },
  fr: { translation: fr, RequireNormalUSERAuth: rn_fr },
  "es-ES": { translation: esES, RequireNormalUSERAuth: rn_esES },
  "pt-BR": { translation: ptBR, RequireNormalUSERAuth: rn_ptBR },
  "zh-CN": { translation: zhCN, RequireNormalUSERAuth: rn_zhCN },
  ru: { translation: ru, RequireNormalUSERAuth: rn_ru },
  ja: { translation: ja, RequireNormalUSERAuth: rn_ja },
  ko: { translation: ko, RequireNormalUSERAuth: rn_ko },
  "ar-MA": { translation: arMA, RequireNormalUSERAuth: rn_arMA },
  de: { translation: de, RequireNormalUSERAuth: rn_de },
};

// Do NOT merge RequireNormalUSERAuth into the default translation namespace.
// Keep the 'translation' and 'RequireNormalUSERAuth' namespaces separate so
// NFDhome uses the default 'translation' namespace and RequireNormalUSERAuth
// uses its own 'RequireNormalUSERAuth' namespace.

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    ns: ["translation", "RequireNormalUSERAuth"],
    defaultNS: "translation",
    interpolation: { escapeValue: false }
  });

export default i18n;
