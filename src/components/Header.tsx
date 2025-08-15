// src/components/Header.tsx
"use client"; 

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import { LocaleLink } from "./LocaleLink";
import { LogoData } from "@/lib/utils/types/types"; 

interface HeaderProps {
  logo: LogoData | null; 
  dictionary: {
    home: string;
    features: string;
    contact: string;
    company: string;
  };
}

const Header = ({ logo, dictionary }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("/img/logo.png");
  const [imageAlt, setImageAlt] = useState("Visual Orion Logo");

  // Efeito para processar o logo quando o componente montar ou o logo mudar
  useEffect(() => {
    let newUrl = "/img/logo.png";
    let newAlt = "Visual Orion Logo";

    // Verifica se o logo existe e tem uma URL válida
    if (logo?.url) {
      try {
        // Obtém a URL da imagem, priorizando formatos menores se disponíveis
        const imageUrl = 
          logo.formats?.thumbnail?.url || 
          logo.formats?.small?.url || 
          logo.formats?.medium?.url || 
          logo.url;
        
        const pathFromLogo = typeof imageUrl === 'string' ? imageUrl.trim() : '';
        
        if (pathFromLogo) {
          // Accept absolute (http...) or root-relative (/...) or convert bare paths to root-relative
          newUrl = pathFromLogo.startsWith('http') || pathFromLogo.startsWith('/')
            ? pathFromLogo
            : `/${pathFromLogo.replace(/^\/+/, '')}`;
          newAlt = logo.alternativeText || logo.name || "Logo da empresa";
        }

      } catch (error) {
        // Em caso de erro, usa os valores padrão já definidos
      }
    }

    setImageSrc(newUrl);
    setImageAlt(newAlt);
  }, [logo, dictionary]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <LocaleLink href="/" className="flex items-center">
              <div className="relative" style={{ width: '200px', height: '50px' }}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={200}
                  height={50}
                  className="object-contain object-left"
                  priority
                  unoptimized
                  onError={() => {
                    // Atualiza o estado para o fallback em caso de erro
                    setImageSrc('/img/logo.png');
                    setImageAlt('Visual Orion Logo');
                  }}
                />
              </div>
            </LocaleLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <LocaleLink href="/" className="text-gray-600 hover:text-[#3c4494]">{dictionary.home}</LocaleLink>
            <LocaleLink href="/features" className="text-gray-600 hover:text-[#3c4494]">{dictionary.features}</LocaleLink>
            <LocaleLink href="/company" className="text-gray-600 hover:text-[#3c4494]">{dictionary.company}</LocaleLink>
            <LocaleLink href="/contact" className="text-gray-600 hover:text-[#3c4494]">{dictionary.contact}</LocaleLink>
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#3c4494] focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <LocaleLink href="/" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.home}</LocaleLink>
            <LocaleLink href="/features" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.features}</LocaleLink>
            <LocaleLink href="/company" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.company}</LocaleLink>
            <LocaleLink href="/contact" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.contact}</LocaleLink>
            <div className="mt-2">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;