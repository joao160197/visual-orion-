'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

export interface CustomImageProps extends Omit<ImageProps, 'onError' | 'onLoadingComplete'> {
  fallbackSrc?: string;
  onError?: (error: any) => void;
  onLoadingComplete?: (img: HTMLImageElement) => void;
}

export function CustomImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/images/placeholder.jpg',
  onError,
  onLoadingComplete,
  ...props
}: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = (e: any) => {
    console.error('❌ [CustomImage] Erro ao carregar imagem:', {
      src: imgSrc,
      error: e,
      fallbackSrc
    });
    
    setError(e);
    
    // Tenta carregar a imagem de fallback se for diferente da atual
    if (fallbackSrc && fallbackSrc !== imgSrc) {
      console.log('🔄 [CustomImage] Tentando carregar imagem de fallback:', fallbackSrc);
      setImgSrc(fallbackSrc);
    }
    
    if (onError) {
      onError(e);
    }
  };

  const handleLoadingComplete = (img: HTMLImageElement) => {
    console.log('✅ [CustomImage] Imagem carregada com sucesso:', {
      src: imgSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    });
    
    setIsLoading(false);
    
    if (onLoadingComplete) {
      onLoadingComplete(img);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        {...props}
        src={imgSrc}
        alt={alt || 'Imagem'}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse text-gray-400">Carregando imagem...</div>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <div className="text-red-500 text-center p-4">
            <p>Não foi possível carregar a imagem</p>
            <p className="text-xs mt-2">{String(error)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomImage;
