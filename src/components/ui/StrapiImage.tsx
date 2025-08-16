'use client';

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
  placeholderBlur?: boolean;
  blurDataURL?: string;
}

export function StrapiImage({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
  placeholderBlur = true,
  blurDataURL,
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

  // Se a URL for absoluta (http) ou root-relative (/images/..), usa direto
  const fullUrl = imageSrc.startsWith('http') || imageSrc.startsWith('/')
    ? imageSrc
    : `/${imageSrc.replace(/^\\+/,'').replace(/^\/+/, '')}`;

  // Blur placeholder padrão (cinza claro)
  const defaultBlur =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9"><rect width="16" height="9" fill="#e5e7eb"/></svg>`
    );

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
        placeholder={placeholderBlur ? 'blur' : 'empty'}
        blurDataURL={placeholderBlur ? (blurDataURL || defaultBlur) : undefined}
      />
    </div>
  );
}
