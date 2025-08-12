'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/i18n-config';

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children, initialLocale = 'pt' }: { children: React.ReactNode; initialLocale?: string }) {
  const [locale, setLocaleState] = useState(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  // Atualiza o cookie e o estado quando o locale muda
  const setLocale = (newLocale: string) => {
    if (i18n.locales.includes(newLocale as any)) {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      setLocaleState(newLocale);
    }
  };

  // Sincroniza o estado com a URL
  useEffect(() => {
    const pathLocale = i18n.locales.find(
      (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
    );
    
    if (pathLocale && pathLocale !== locale) {
      setLocaleState(pathLocale);
    }
  }, [pathname, locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
