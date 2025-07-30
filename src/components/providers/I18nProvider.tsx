'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/i18n';
import { useEffect } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
  lang: string;
}

export function I18nProvider({ children, lang }: I18nProviderProps) {
  // Atualiza o idioma do i18n quando o parâmetro muda
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
