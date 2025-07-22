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
  // Debug
  console.log("===== INFO BLOCK RENDERIZANDO =====");
  console.log(`Headline: ${headline}`);
  console.log(`Content: ${content?.substring(0, 20)}...`);
  console.log(`Reversed: ${reversed} (tipo: ${typeof reversed})`);
  
  // Processamento da imagem - lida com diferentes formatos de imagem do Strapi
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState(headline || 'Imagem do bloco');
  
  useEffect(() => {
    try {
      console.log('=== INFO BLOCK - PROCESSAMENTO DE IMAGEM ===');
      console.log('Dados da imagem recebidos:', JSON.stringify(image, null, 2));
      
      if (!image) {
        console.log('Nenhuma imagem fornecida para o InfoBlock');
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
      
      console.log('URL da imagem processada:', url);
      console.log('Texto alternativo definido:', altText);
    } catch (error) {
      console.error('Erro ao processar imagem no InfoBlock:', error);
      console.error('Dados da imagem com erro:', JSON.stringify(image, null, 2));
      setImageUrl(null);
    }
  }, [image, headline]);

  // Processa a propriedade reversed
  console.log('=== PROCESSAMENTO DE REVERSED ===');
  console.log('Valor bruto de reversed:', reversed);
  console.log('Tipo de reversed:', typeof reversed);
  
  // Converte para booleano de forma robusta
  const isReversed = (
    reversed === true || 
    (typeof reversed === 'string' && (reversed === 'true' || reversed === 'TRUE' || reversed === '1' || reversed === 'on')) ||
    (typeof reversed === 'number' && reversed === 1)
  );
  
  console.log('Valor final de isReversed:', isReversed);
  
  // Define as classes CSS com base no valor de isReversed
  const flexDirection = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';
  const containerClasses = `flex flex-col items-center gap-8 ${flexDirection} py-12 px-4`;
  
  console.log('Classes de container finais:', containerClasses);

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
                  console.error('Erro ao carregar imagem:', e);
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
        <div className="w-full md:w-1/2 px-4 space-y-6">
          {headline && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
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
