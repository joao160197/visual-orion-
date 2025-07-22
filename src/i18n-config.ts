export const i18n = {
  defaultLocale: 'pt', // Definindo português como padrão
  locales: ['pt', 'en', 'es'], // Idiomas suportados
} as const;

export type Locale = (typeof i18n)['locales'][number];
