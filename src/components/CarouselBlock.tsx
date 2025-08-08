"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getStrapiUrl } from "@/lib/utils/get-strapi-url";

type ImageFormat = {
  url: string;
  width: number;
  height: number;
};

type ImageFormats = {
  large?: ImageFormat;
  medium?: ImageFormat;
  small?: ImageFormat;
  thumbnail?: ImageFormat;
  Large?: ImageFormat;
  Medium?: ImageFormat;
  Small?: ImageFormat;
  Thumbnail?: ImageFormat;
  [key: string]: any; // Para outros formatos personalizados
};

type ImageAttributes = {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: ImageFormats;
  [key: string]: any; // Para outros atributos personalizados
};

type ImageData = {
  id?: number;
  attributes?: ImageAttributes;
  data?: {
    id?: number;
    attributes?: ImageAttributes;
  };
  url?: string;
  alternativeText?: string;
  AlternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: ImageFormats;
  [key: string]: any; // Para outras propriedades personalizadas
};

type CarouselBlockProps = {
  title?: string;
  order?: number;
  images?: (ImageData | null)[];
};

// Função auxiliar para extrair URL de imagem que pode ser usada em vários lugares
const extractCarouselImageUrl = (image: ImageData | null | undefined): string | null => {
  if (!image) {
    return null;
  }
  
  try {
    // console.log('=== PROCESSANDO IMAGEM DO CARROSSEL ===');
    
    // Se for uma string, assume que já é uma URL
    if (typeof image === 'string') {
      return getStrapiUrl(image);
    }
    
    // Função auxiliar para buscar em objetos com case insensitive
    const getCaseInsensitive = (obj: any, ...keys: string[]): any => {
      if (!obj) return undefined;
      
      const lowerObj = Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
      );
      
      for (const key of keys) {
        const lowerKey = key.toLowerCase();
        if (lowerKey in lowerObj) {
          return lowerObj[lowerKey];
        }
      }
      return undefined;
    };
    
    // Extrai a URL baseada na estrutura do Strapi
    let url: string | undefined;
    
    // Tenta encontrar a URL em diferentes níveis da estrutura
    const dataObj = image.data || (image as any).Data;
    const attributes = dataObj?.attributes || dataObj?.Attributes || 
                      image.attributes || (image as any).Attributes;
    
    // 1. Tenta encontrar URL direta
    url = getCaseInsensitive(image, 'url');
    
    // 2. Tenta encontrar em attributes
    if (!url && attributes) {
      url = getCaseInsensitive(attributes, 'url');
    }
    
    // 3. Tenta encontrar em data.attributes
    if (!url && dataObj?.attributes) {
      url = getCaseInsensitive(dataObj.attributes, 'url');
    }
    
    // 4. Tenta encontrar em formatos (large, medium, small, thumbnail)
    if (!url) {
      const formats = getCaseInsensitive(image, 'formats') || 
                     (attributes && getCaseInsensitive(attributes, 'formats')) ||
                     (dataObj?.attributes && getCaseInsensitive(dataObj.attributes, 'formats'));
      
      if (formats) {
        // Tenta encontrar o maior formato disponível
        const format = formats.large || formats.medium || formats.small || formats.thumbnail ||
                      formats.Large || formats.Medium || formats.Small || formats.Thumbnail;
        
        if (format) {
          url = format.url || format.Url;
        }
      }
    }
    
    if (!url) {
      return null;
    }
    
    // Remove barras iniciais duplicadas
    url = url.replace(/^\/\//, '/');
    
    // Garante que a URL seja absoluta usando getStrapiUrl
    return getStrapiUrl(url);
    
  } catch (error) {
    return null;
  }
};

// Função para extrair o texto alternativo da imagem
const getImageAlt = (image: ImageData | null | undefined, index: number): string => {
  if (!image) return `Imagem ${index + 1}`;
  
  return (
    image.alternativeText ||
    (image as any).AlternativeText ||
    image.attributes?.alternativeText ||
    image.attributes?.AlternativeText ||
    image.data?.attributes?.alternativeText ||
    image.data?.attributes?.AlternativeText ||
    image.caption ||
    image.attributes?.caption ||
    image.data?.attributes?.caption ||
    `Imagem ${index + 1}`
  );
};

const CarouselBlock: React.FC<CarouselBlockProps> = ({ title, images = [] }) => {
  // Estado para controlar qual slide está ativo
  const [currentSlide, setCurrentSlide] = useState(0);
  // Estado para controlar o modo automático
  const [autoplay, setAutoplay] = useState(true);
  
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  // Função para avançar para o próximo slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(current => (current + 1) % images.length);
  }, [images.length]);

  // Função para voltar ao slide anterior
  const prevSlide = () => {
    setCurrentSlide(current => (current - 1 + images.length) % images.length);
  };

  // Navegar para um slide específico
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Efeito para autoplay
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoplay) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000); // Troca a cada 5 segundos
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoplay, nextSlide]);

  // Filtra imagens nulas ou indefinidas
  const validImages = (images || []).filter(img => img !== null && img !== undefined);
  
  // Log para depuração
  console.log('Imagens do carrossel:', validImages);
  
  // Se não houver imagens válidas, não renderiza o componente
  if (validImages.length === 0) {
    console.warn('Nenhuma imagem válida encontrada para o carrossel');
    return null;
  }

  return (
    <section className="py-12 relative">
      {title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{title}</h2>}

      {/* Container do slider */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg shadow-2xl">
        {/* Slides */}
        <div className="relative h-[500px] w-full">
          {validImages.map((img, index) => {
            const imageUrl = extractCarouselImageUrl(img);
            const altText = getImageAlt(img, index);
            
            if (!imageUrl) {
              return null;
            }
            
            return (
              <div 
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    priority={index === 0} // Prioriza o carregamento da primeira imagem
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de navegação */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 z-20 shadow-md"
          aria-label="Slide anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 z-20 shadow-md"
          aria-label="Próximo slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores de posição */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 w-3 hover:bg-white/75'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={currentSlide === index}
              />
            ))}
          </div>
        )}

        {/* Controle de autoplay - só mostra se houver mais de uma imagem */}
        {validImages.length > 1 && (
          <button 
            onClick={() => setAutoplay(!autoplay)}
            className={`absolute top-4 right-4 rounded-full p-2 z-20 shadow-md transition-colors ${
              autoplay 
                ? 'bg-white/70 hover:bg-white/90' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={autoplay ? 'Pausar slideshow' : 'Reproduzir slideshow'}
            title={autoplay ? 'Pausar slideshow' : 'Reproduzir slideshow'}
          >
            {autoplay ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m-9-6h14" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default CarouselBlock;
