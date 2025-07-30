'use client';

import { getStrapiUrl } from '@/lib/utils/get-strapi-url';
import Image from 'next/image';
import { useState } from 'react';

interface StrapiImageProps {
  src: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

export function StrapiImage({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
}: StrapiImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(src);
  const [hasError, setHasError] = useState(false);

  if (!imageSrc || hasError) {
    // Retornar uma div com mensagem de erro visível apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="relative bg-gray-100 border border-red-200 rounded p-4">
          <p className="text-red-500 text-sm">
            {!imageSrc ? 'Imagem não fornecida' : 'Erro ao carregar a imagem'}
          </p>
        </div>
      );
    }
    return null; // Em produção, não renderiza nada
  }

  const fullUrl = imageSrc.startsWith('http') ? imageSrc : getStrapiUrl(imageSrc);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={fullUrl}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`object-contain ${fill ? 'w-full h-full' : ''}`}
        onError={() => setHasError(true)}
        priority={priority}
        unoptimized={process.env.NODE_ENV !== 'production'}
      />
    </div>
  );
}
