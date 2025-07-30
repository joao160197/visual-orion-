// src/components/StrapiImage.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface StrapiImageProps {
  image: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string | null;
        caption?: string | null;
        width?: number | null;
        height?: number | null;
        formats?: any;
        hash?: string;
        ext?: string;
        mime?: string;
        size?: number;
        previewUrl?: string | null;
        provider?: string;
        provider_metadata?: any;
        createdAt?: string;
        updatedAt?: string;
      };
    } | null;
  } | null;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function StrapiImage({ 
  image, 
  alt, 
  className = '',
  priority = false
}: StrapiImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Efeito para construir a URL da imagem
  useEffect(() => {
    if (!image?.data?.attributes?.url) {
      console.warn('🖼️ [StrapiImage] Nenhuma URL de imagem fornecida');
      setHasError(true);
      return;
    }

    // Constrói a URL completa da imagem
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    let url = image.data.attributes.url;
    
    // Remove barras iniciais duplicadas
    url = url.replace(/^\/+/, '');
    
    // Adiciona a URL base se necessário
    if (!url.startsWith('http') && !url.startsWith('//')) {
      // Garante que a baseUrl não termine com / e a url não comece com /
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const cleanUrl = url.startsWith('/') ? url : `/${url}`;
      url = `${cleanBaseUrl}${cleanUrl}`;
    }

    console.log('🖼️ [StrapiImage] URL da imagem construída:', url);
    setImageUrl(url);
    setIsLoading(true);
    setHasError(false);
  }, [image]);

  // Se não houver URL ou ocorrer um erro, não renderiza nada
  if (!imageUrl || hasError) {
    console.warn(`🖼️ [StrapiImage] Não foi possível carregar a imagem: ${alt || 'sem texto alternativo'}`);
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">Imagem não disponível</span>
      </div>
    );
  }

  // Extrai as dimensões da imagem
  const width = image?.data?.attributes?.width || 800;
  const height = image?.data?.attributes?.height || 600;
  const altText = alt || image?.data?.attributes?.alternativeText || 'Imagem';

  return (
    <div className={`relative ${className} ${isLoading ? 'bg-gray-100 animate-pulse' : ''}`}>
      <Image
        src={imageUrl}
        alt={altText}
        width={width}
        height={height}
        className={`w-full h-auto object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        onLoadStart={() => {
          console.log('🖼️ [StrapiImage] Iniciando carregamento da imagem:', imageUrl);
          setIsLoading(true);
        }}
        onLoadingComplete={() => {
          console.log('✅ [StrapiImage] Imagem carregada com sucesso:', imageUrl);
          setIsLoading(false);
        }}
        onError={(e) => {
          console.error('❌ [StrapiImage] Erro ao carregar a imagem:', {
            url: imageUrl,
            alt: altText,
            error: e
          });
          setHasError(true);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
      
      {/* Placeholder de carregamento */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}