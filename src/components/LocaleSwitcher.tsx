'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n, type Locale } from '../i18n-config'
import { BR, US, ES } from 'country-flag-icons/react/3x2'


const flagMap: { [key: string]: React.ReactNode } = {
  pt: <BR title="Português" className="h-full w-full" />,
  en: <US title="English" className="h-full w-full" />,
  es: <ES title="Español" className="h-full w-full" />,
}

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className="relative inline-block text-left">
      <ul className="flex space-x-2">
        {i18n.locales.map(locale => {
          return (
            <li key={locale}>
              <Link
                href={redirectedPathName(locale)}
                className="flex h-8 w-12 items-center justify-center rounded-md border-2 border-gray-200 bg-white"
              >
                {flagMap[locale]}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
