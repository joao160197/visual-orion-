"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiUrl } from '@/lib/utils/get-strapi-url';
import { Locale } from '@/i18n-config';

interface FaleConoscoProps {
  titulo?: string;
  texto?: string;
  textoBotao?: string;
  linkBotao?: string;
  image?: any;
  className?: string;
  lang: Locale;
  dictionary?: {
    contactPage?: {
      contactUs?: string;
      innovationText?: string;
      solutions?: {
        automotive?: {
          learnMore?: string;
        };
      };
    };
  };
}

/**
 * Componente para exibir a seção Fale Conosco
 * @param titulo Título da seção
 * @param texto Texto descritivo
 * @param textoBotao Texto do botão de ação
 * @param linkBotao URL para onde o botão deve redirecionar
 * @param image Objeto contendo os dados da imagem do Strapi
 * @param className Classes CSS adicionais
 */
export default function FaleConoscoSection({
  titulo,
  texto,
  textoBotao,
  linkBotao = '/contato',
  image,
  className = '',
  lang,
  dictionary
}: FaleConoscoProps) {
  // Valores padrão com tradução
  const defaultTitulo = dictionary?.contactPage?.contactUs || 'Fale Conosco';
  const defaultTexto = dictionary?.contactPage?.innovationText || 'Acreditamos que a inovação e a tecnologia são fundamentais para o sucesso do seu negócio.';
  const defaultTextoBotao = dictionary?.contactPage?.solutions?.automotive?.learnMore || 'Saiba mais →';
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageAlt, setImageAlt] = useState(titulo || 'Fale Conosco');

  // URL da imagem padrão
  const defaultImageUrl = 'http://localhost:1337/uploads/handsome_businessman_white_background_1368_6022_ad9b0fab86.avif';

  // Processa a imagem quando o componente é montado ou a imagem muda
  useEffect(() => {
    // Se não houver imagem, usar a imagem padrão
    if (!image) {
      setImageUrl(defaultImageUrl);
      return;
    }

    try {
      // Função para extrair a URL da imagem de diferentes formatos do Strapi
      const extractImageUrl = (imgData: any): { url: string | null, alt: string } => {
        if (!imgData) return { url: null, alt: titulo || 'Fale Conosco' };

        // Se for um array, pega o primeiro item
        if (Array.isArray(imgData)) {
          return extractImageUrl(imgData[0]);
        }
        
        // Se for o formato do Strapi v4
        if (imgData.data) {
          return extractImageUrl(imgData.data);
        }
        
        // Se for um objeto de atributos
        if (imgData.attributes) {
          return extractImageUrl(imgData.attributes);
        }
        
        // Se for um formato direto com URL
        if (imgData.url) {
          let url = imgData.url;
          // Se a URL for relativa, adiciona o domínio do Strapi
          if (url.startsWith('/')) {
            url = url.substring(1); // Remove a barra inicial
          }
          
          return { 
            url: getStrapiUrl(url),
            alt: imgData.alternativeText || imgData.caption || imgData.name || titulo || 'Fale Conosco'
          };
        }
        
        return { url: null, alt: titulo || 'Fale Conosco' };
      };
      
      // Extrai a URL e o texto alternativo
      const { url, alt } = extractImageUrl(image);
      
      if (url) {
        setImageUrl(url);
        setImageAlt(alt);
      } else {
        setImageUrl(defaultImageUrl);
        setImageAlt('Imagem padrão - Homem de negócios');
      }
    } catch (error) {
      setImageUrl(defaultImageUrl);
      setImageAlt('Imagem padrão - Homem de negócios');
    }
  }, [image, titulo]);
  
  // Usar valores traduzidos ou props, com fallback para os valores padrão
  const displayTitulo = titulo || defaultTitulo;
  const displayTexto = texto || defaultTexto;
  const displayTextoBotao = textoBotao || defaultTextoBotao;
  
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Conteúdo de texto */}
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {displayTitulo}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {displayTexto}
            </p>
            <Link 
              href={linkBotao}
              className="mt-4 px-6 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-600 hover:text-white transition"
            >
              {displayTextoBotao}
            </Link>
          </div>
          
          {/* Imagem */}
          <div className="md:w-1/2 h-64 md:h-auto relative">
            <div className="w-full h-full">
              {/* Usando uma div com background para melhor controle */}
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${imageUrl || defaultImageUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  minHeight: '400px',
                  width: '100%',
                  height: '100%',
                  transition: 'background-image 0.3s ease-in-out'
                }}
                onError={() => {
                  // Tenta carregar a imagem padrão em caso de erro
                  if (imageUrl !== defaultImageUrl) {
                    setImageUrl(defaultImageUrl);
                  }
                  setImageUrl(defaultImageUrl);
                  setImageAlt('Imagem padrão - Homem de negócios');
                }}
              >
                {/* Imagem invisível para manter o espaço e acessibilidade */}
                <img 
                  src={imageUrl || defaultImageUrl} 
                  alt={imageAlt} 
                  className="opacity-0 w-full h-full object-cover" 
                  aria-hidden="true"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Previne loops
                    target.src = defaultImageUrl;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
