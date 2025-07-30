import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Configuração base para o i18next
const getI18nConfig = () => ({
  // Idioma padrão
  lng: 'pt-BR',
  // Idiomas suportados
  supportedLngs: ['pt-BR', 'pt', 'en', 'es'],
  // Idioma de fallback
  fallbackLng: 'pt-BR',
  // Debug apenas em desenvolvimento
  debug: process.env.NODE_ENV === 'development',
  // Namespaces
  ns: ['common', 'food'],
  defaultNS: 'common',
  // Interpolação
  interpolation: {
    escapeValue: false, // Não é necessário para React
  },
  // Configuração do backend
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  // Detecção de idioma (configurada apenas no cliente)
  detection: {
    order: ['path', 'cookie', 'htmlTag', 'navigator'],
    caches: ['cookie'],
    lookupCookie: 'i18next',
    cookieMinutes: 10,
    // Configuração segura para SSR
    htmlTag: typeof document !== 'undefined' ? document.documentElement : undefined,
    checkWhitelist: true,
  },
  // Ignora erros de estrutura JSON
  ignoreJSONStructure: true,
  // Configuração do React
  react: {
    useSuspense: true,
  },
});

export function initializeI18n() {
  // Se estiver no lado do cliente
  if (typeof window !== 'undefined') {
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        ...getI18nConfig(),
        detection: {
          ...getI18nConfig().detection,
          // Garante que a detecção só ocorra no cliente
          caches: ['cookie'],
          order: ['path', 'cookie', 'htmlTag', 'navigator'],
        }
      });
  } else {
    // Configuração para SSR
    const { detection, ...ssrConfig } = getI18nConfig();
    
    i18n.use(initReactI18next).init({
      ...ssrConfig,
      lng: 'pt-BR',
      fallbackLng: 'pt-BR',
      initImmediate: false,
    });
  }

  return i18n;
}

// Inicializa o i18next
export const i18nInstance = initializeI18n();

export default i18nInstance;
