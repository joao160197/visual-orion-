'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LocaleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LocaleLink({ href, children, className, ...props }: LocaleLinkProps) {
  const pathname = usePathname();
  
  // Extrai o idioma atual da URL (primeiro segmento)
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0];
  
  // Se o href já começa com uma barra, remove-a para evitar duplicação
  const cleanHref = href.startsWith('/') ? href.slice(1) : href;
  
  // Constrói a URL mantendo o idioma atual
  const localizedHref = `/${currentLocale}/${cleanHref}`.replace(/\/+/g, '/');
  
  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
