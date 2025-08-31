"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LocaleLink } from './LocaleLink';
import { Locale } from '@/i18n-config';
import { Reveal } from './Reveal';

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

  // URL da imagem padrão local
  const defaultImageUrl = '/images/food-banner.jpg';

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
          const raw = String(imgData.url);
          const normalized = raw.startsWith('http') || raw.startsWith('/') ? raw : `/${raw.replace(/^\/+/, '')}`;
          return {
            url: normalized,
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
  // Garante URL absoluta para evitar prefixo de locale (ex.: /pt/...)
  const resolvedUrl = (imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/')))
    ? imageUrl
    : `/${(imageUrl || '').replace(/^\/+/, '')}`;
  
  return (
    <section className="py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card de texto */}
          <Reveal direction="left" distance={28} duration={0.6} className="flex">
            <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8 lg:p-10 w-full flex flex-col justify-center text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] leading-tight font-bold text-gray-900 mb-4">
                {displayTitulo}
              </h2>
              <p className="text-gray-700 text-base sm:text-lg mb-6">
                {displayTexto}
              </p>
              <div>
                <LocaleLink
                  href={linkBotao}
                  className="inline-block mt-2 px-6 sm:px-7 py-2.5 sm:py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-600 hover:text-white transition-colors duration-200"
                >
                  {displayTextoBotao}
                </LocaleLink>
              </div>
            </div>
          </Reveal>
          
          {/* Imagem */}
          <Reveal direction="right" distance={28} duration={0.6}>
            <div className="relative rounded-xl overflow-hidden min-h-[240px] sm:min-h-[320px] md:min-h-[380px]">
              <div className="absolute inset-0 bg-cover bg-center" 
                   style={{ backgroundImage: `url(${resolvedUrl || defaultImageUrl})` }} />
              {/* Imagem invisível para fallback/acessibilidade */}
              <img
                src={resolvedUrl || defaultImageUrl}
                alt={imageAlt}
                className="opacity-0 w-full h-full object-cover"
                aria-hidden="true"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = defaultImageUrl;
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
