// src/lib/types.ts
export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// Types for Strapi response format
type StrapiResponseFormat<T> = {
  data: {
    id: number;
    attributes: T;
  } | null;
} | null;

type StrapiImageFormat = {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
};

type BaseLogoData = {
  id: number;
  name?: string;
  alternativeText: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: StrapiImageFormat;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: any;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

type StrapiLogoData = StrapiResponseFormat<BaseLogoData>;

type DirectLogoData = BaseLogoData;

export type LogoData = DirectLogoData | StrapiLogoData;

// Adicione quaisquer outros tipos que você possa ter neste arquivo
// Por exemplo, se você tinha ImageProps antes, pode mantê-lo ou ajustá-lo:
export interface StrapiImageAttributes {
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string; // O caminho relativo da imagem, ex: /uploads/image.png
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMedia {
  data: {
    id: number;
    attributes: StrapiImageAttributes;
  } | null;
}

export interface ImageProps { // Se você ainda precisar de um tipo genérico ImageProps
  id: number;
  url: string;
  alternativeText?: string | null;
  // Adicione outros campos se necessário, como width, height, formats, etc.
  // Baseado no seu uso anterior, pode ser que 'LogoData' já cubra suas necessidades.
}

export interface InfoBlockProps {
  id: number;
  __component: "blocks.info-block";
  reversed: boolean;
  headline: string;  // Campo de título
  description?: string; // Campo de descrição (obsoleto)
  content: string;    // Campo de conteúdo (rich text - markdown)
  Image?: {           // Campo de imagem singular 
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText: string | null;
        // Outros atributos relevantes
        name?: string;
        width?: number;
        height?: number;
        formats?: {
          thumbnail?: ImageFormat;
          small?: ImageFormat;
          medium?: ImageFormat;
          large?: ImageFormat;
        };
      };
    } | null;
  };
}

// Base interface for all blocks
export interface BaseBlock {
  id: number;
  __component?: string;
  attributes?: any; // Using any for now, can be made more specific later
  [key: string]: any; // Allow other properties
}

export type Block = InfoBlockProps & BaseBlock;
