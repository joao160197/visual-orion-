const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

type MediaData = {
  data: {
    attributes: {
      url: string;
    };
  } | null;
} | null;

export function getStrapiMedia(media: MediaData): string | null {
  try {
    // Se não houver dados de mídia, retorne null
    if (!media?.data?.attributes) {
      console.warn('No media data provided');
      return null;
    }
    
    const { url } = media.data.attributes;
    
    // Se não houver URL, retorne null
    if (!url) {
      console.warn('No URL found in media data');
      return null;
    }
    
    // Se a URL já for uma URL completa, retorne-a
    if (url.startsWith('http') || url.startsWith('//')) {
      return url;
    }
    
    // Caso contrário, adicione a URL base do Strapi
    const fullUrl = `${STRAPI_URL}${url}`;
    console.log('Generated media URL:', fullUrl);
    return fullUrl;
  } catch (error) {
    console.error('Error getting Strapi media URL:', error);
    return null;
  }
}
