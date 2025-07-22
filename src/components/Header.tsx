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

    // Log inicial para ver as props recebidas (sem tentar serializar o objeto inteiro)
    console.log("[Header.tsx] Componente renderizado. Props recebidas:", { 
      hasLogo: !!logo,
      logoType: logo ? typeof logo : 'null/undefined',
      dictionaryKeys: Object.keys(dictionary || {}) 
    });

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
          console.log(`[Header.tsx] Processando logo do Strapi. URL recebida: "${pathFromLogo}"`);
          
          const calculatedStrapiUrl = getStrapiUrl(pathFromLogo);
          console.log(`[Header.tsx] URL final do logo: "${calculatedStrapiUrl}"`);

          newUrl = calculatedStrapiUrl;
          newAlt = logo.alternativeText || logo.name || "Logo da empresa";
          
          console.log(`[Header.tsx] Logo configurado - URL: "${newUrl}", alt: "${newAlt}"`);
        } else {
          console.warn('[Header.tsx] URL do logo está vazia');
        }
      } catch (error) {
        console.error("[Header.tsx] Erro ao processar o logo do Strapi:", error);
      }
    } else {
      // Log detalhado do motivo pelo qual está usando o fallback
      if (!logo) {
        console.warn("[Header.tsx] Nenhum objeto de logo fornecido. Usando logo de fallback.");
      } else if (!logo.url) {
        console.warn("[Header.tsx] URL do logo não fornecida. Verifique os dados recebidos do Strapi.", {
          logoKeys: Object.keys(logo)
        });
      } else if (typeof logo.url !== 'string') {
        console.warn(`[Header.tsx] URL do logo não é uma string. Tipo recebido: ${typeof logo.url}`);
      } else if (logo.url.trim() === "") {
        console.warn("[Header.tsx] URL do logo é uma string vazia.");
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
                    console.error('Erro ao carregar a imagem do logo. Usando fallback.');
                    // Atualiza o estado para o fallback
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