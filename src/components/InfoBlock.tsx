'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { InfoBlockProps, StrapiImageAttributes } from "@/lib/utils/types/types";
import { extractImageUrl } from "./BlockRenderer";

// Tipo para a imagem que pode vir em diferentes formatos do Strapi
type ImageData = {
  id?: number;
  attributes?: StrapiImageAttributes;
  data?: {
    id?: number;
    attributes?: StrapiImageAttributes;
  };
  url?: string;
  alternativeText?: string | null;
  name?: string;
  width?: number;
  height?: number;
  formats?: any;
} | null;

interface InfoBlockComponentProps extends Omit<InfoBlockProps, "id" | "__component" | "Image"> {
  image?: ImageData | ImageData[];
}

const InfoBlock: React.FC<InfoBlockComponentProps> = ({
  reversed = false, 
  headline = '',
  content = '',
  image,
}) => {
  // Processamento da imagem - lida com diferentes formatos de imagem do Strapi
  // Processamento da imagem - lida com diferentes formatos de imagem do Strapi
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState(headline || 'Imagem do bloco');
  
  useEffect(() => {
    try {
      if (!image) {
        setImageUrl(null);
        return;
      }
      
      // Usa a função extractImageUrl para processar a imagem
      const url = extractImageUrl(image);
      setImageUrl(url);
      
          // Extrai o texto alternativo de várias possíveis localizações
      // Usa type assertion para lidar com a estrutura flexível do Strapi
      type FlexibleImage = {
        alternativeText?: string;
        AlternativeText?: string;
        attributes?: {
          alternativeText?: string;
          AlternativeText?: string;
        };
        data?: {
          attributes?: {
            alternativeText?: string;
            AlternativeText?: string;
          };
        };
      };
      
      const getAltText = (img: any): string => {
        const flexImg = img as FlexibleImage;
        return (
          flexImg?.alternativeText ||
          flexImg?.AlternativeText ||
          flexImg?.attributes?.alternativeText ||
          flexImg?.attributes?.AlternativeText ||
          flexImg?.data?.attributes?.alternativeText ||
          flexImg?.data?.attributes?.AlternativeText ||
          headline ||
          'Imagem do bloco'
        );
      };
      
      const altText = Array.isArray(image) && image[0] 
        ? getAltText(image[0])
        : getAltText(image);
      
      setImageAlt(altText);
    } catch (error) {
      setImageUrl(null);
    }
  }, [image, headline]);

  // Converte para booleano de forma robusta
  const isReversed = (
    reversed === true || 
    (typeof reversed === 'string' && (reversed === 'true' || reversed === 'TRUE' || reversed === '1' || reversed === 'on')) ||
    (typeof reversed === 'number' && reversed === 1)
  );
  
  // Define as classes CSS com base no valor de isReversed
  const flexDirection = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';
  const containerClasses = `flex flex-col items-center gap-8 ${flexDirection} py-12 px-4`;

  return (
    <div className="w-full">
      <div className={`max-w-7xl mx-auto ${containerClasses}`}>
        {/* Seção da Imagem */}
        <div className="w-full md:w-1/2 px-4">
          {imageUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Seção de Conteúdo */}
        <div className="w-full md:w-1/2 px-4 space-y-6 text-center md:text-left">
          {headline && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {headline}
            </h2>
          )}
          
          {content && (
            <div 
              className="prose prose-lg text-gray-600 max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;
