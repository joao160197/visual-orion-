// src/components/Header.tsx
"use client"; 

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { getStrapiUrl } from "@/lib/utils/get-strapi-url";
import LocaleSwitcher from "./LocaleSwitcher";
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
  const [imageSrc, setImageSrc] = useState("/imgs/logo.png");
  const [imageAlt, setImageAlt] = useState("Visual Orion Logo");

  // Efeito para processar o logo quando o componente montar ou o logo mudar
  useEffect(() => {
    let newUrl = "/imgs/logo.png";
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
          const calculatedStrapiUrl = getStrapiUrl(pathFromLogo);
          newUrl = calculatedStrapiUrl;
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
            <Link href="/" className="flex items-center">
              <div className="relative" style={{ width: '200px', height: '50px' }}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={200}
                  height={50}
                  className="object-contain object-left"
                  priority
                  onError={() => {
                    // Atualiza o estado para o fallback em caso de erro
                    setImageSrc('/imgs/logo.png');
                    setImageAlt('Visual Orion Logo');
                  }}
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-[#3c4494]">{dictionary.home}</Link>
            <Link href="/features" className="text-gray-600 hover:text-[#3c4494]">{dictionary.features}</Link>
            <Link href="/company" className="text-gray-600 hover:text-[#3c4494]">{dictionary.company}</Link>
            <Link href="/contact" className="text-gray-600 hover:text-[#3c4494]">{dictionary.contact}</Link>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;