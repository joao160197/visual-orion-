import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import resources from './index';

// Configuração base para o i18next
const i18nConfig = {
  // Idioma padrão
  lng: 'pt-BR',
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
  // Carrega as traduções diretamente
  // resources,
  // // Configuração do React
  // react: {
  //   useSuspense: true,
  //   // Retorna a chave se a tradução não for encontrada
  //   transEmptyNodeValue: '',
  // },
  // Retorna a chave se o valor for nulo
  returnNull: false,
  // Retorna uma string vazia para chaves não encontradas
  returnEmptyString: false,
};

// Inicializa o i18next
i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
