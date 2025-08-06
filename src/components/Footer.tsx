'use client';

import { useEffect, useState, useMemo } from 'react';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { getFooter, FooterAttributes } from '@/lib/api';
import { getStrapiUrl } from '@/lib/utils/get-strapi-url';

// Função auxiliar para sanitizar HTML
const sanitizeHtml = (html: string): string => {
  // Remove tags potencialmente perigosas
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=\s*["'][^"']*["']/gi, '');
};

// Componente para renderizar HTML de forma segura
const SafeHtml = ({ html, className = '' }: { html: string; className?: string }) => {
  const sanitizedHtml = useMemo(() => {
    return { __html: sanitizeHtml(html) };
  }, [html]);

  return <div className={className} dangerouslySetInnerHTML={sanitizedHtml} />;
};

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterAttributes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const apiData = await getFooter();
        
        if (apiData) {
          setFooterData(apiData);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Erro desconhecido ao buscar dados do footer');
        console.error('[Footer] Erro ao buscar dados do footer:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Dados padrão
  const defaultData = useMemo(() => ({
    title1: 'United States',
    title2: 'Brazil',
    text1: `4300 Stone Station Rd,<br />
            Roebuck, SC 29376<br />
            Phone: (864) 877-8871<br />
            Fax: (864) 877-9289`,
    text2: `Condomínio Perini Business Park<br />
            Rua Dona Francisca, nº 8300<br />
            Sala 08, Bloco L<br />
            Joinville - SC, 89239-270`,
    image: {
      data: {
        attributes: {
          url: '/uploads/default_logo.png'
        }
      }
    }
  }), []);

  // Usa os dados da API ou os valores padrão
  const data = footerData || defaultData;
  
  // A API do Strapi retorna os dados em 'attributes', enquanto os dados de fallback não.
  // Esta linha seleciona o objeto correto (seja 'attributes' ou o objeto de fallback) para extrair os dados.
  const content = (data as any)?.attributes ? (data as any).attributes : data;

  const title1 = content.title1 || defaultData.title1;
  const title2 = content.title2 || defaultData.title2;
  const text1 = content.text1 || defaultData.text1;
  const text2 = content.text2 || defaultData.text2;
  const image = content.image || defaultData.image;
  
  // URL da imagem de fallback
  const fallbackImageUrl = 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fid%20visual%20%20orion%20-%20logo%20branca%201.png?alt=media&token=01fdbdca-d77a-4cc2-96bf-cd7d9fe7367a';
  
  // Obtém a URL da imagem do Strapi ou usa a de fallback
  const getImageUrl = (img: any): string => {
    // Se não houver imagem, retorna fallback
    if (!img) {
      return fallbackImageUrl;
    }
    
    // Se a imagem for uma string (URL direta)
    if (typeof img === 'string') {
      return img.startsWith('http') ? img : getStrapiUrl(img);
    }

    // Função auxiliar para extrair a URL da imagem
    const extractImageUrl = (obj: any): string | null => {
      try {
        if (!obj) {
          return null;
        }
        
        // Se for uma string, retorna a URL
        if (typeof obj === 'string') {
          return obj.startsWith('http') ? obj : getStrapiUrl(obj);
        }
        
        // Se for um array, pega o primeiro item
        if (Array.isArray(obj)) {
          return extractImageUrl(obj[0]);
        }
        
        // Se tiver uma propriedade 'url' direta
        if (obj.url) {
          const url = obj.url;
          return url.startsWith('http') ? url : getStrapiUrl(url);
        }
        
        // Se tiver uma propriedade 'data' com 'url' direta
        if (obj.data?.url) {
          const url = obj.data.url;
          return url.startsWith('http') ? url : getStrapiUrl(url);
        }
        
        // Se tiver uma propriedade 'data' com 'attributes' e 'url'
        if (obj.data?.attributes?.url) {
          const url = obj.data.attributes.url;
          return url.startsWith('http') ? url : getStrapiUrl(url);
        }
        
        // Se tiver uma propriedade 'data' que é um array
        if (Array.isArray(obj.data) && obj.data.length > 0) {
          const firstItem = obj.data[0];
          
          if (firstItem.attributes?.url) {
            const url = firstItem.attributes.url;
            return url.startsWith('http') ? url : getStrapiUrl(url);
          }
          
          if (firstItem.url) {
            const url = firstItem.url;
            return url.startsWith('http') ? url : getStrapiUrl(url);
          }
          
          // Se o primeiro item for um objeto, tenta extrair a URL dele
          if (typeof firstItem === 'object') {
            return extractImageUrl(firstItem);
          }
        }
        
        // Se tiver formatos (thumbnail, small, medium, large)
        if (obj.formats) {
          const formats = obj.formats;
          const imageUrl = formats.large?.url || 
                         formats.medium?.url || 
                         formats.small?.url || 
                         formats.thumbnail?.url;
          
          if (imageUrl) {
            return imageUrl.startsWith('http') ? imageUrl : getStrapiUrl(imageUrl);
          }
        }
        
        // Se tiver atributos diretos com URL
        if (obj.attributes?.url) {
          const url = obj.attributes.url;
          return url.startsWith('http') ? url : getStrapiUrl(url);
        }
        
        // Se tiver uma propriedade 'data' que é um objeto, tenta extrair a URL dele
        if (obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data)) {
          return extractImageUrl(obj.data);
        }
        
        // Se tiver uma propriedade 'attributes' que é um objeto, tenta extrair a URL dele
        if (obj.attributes && typeof obj.attributes === 'object') {
          return extractImageUrl(obj.attributes);
        }
        
        return null;
        
      } catch (error) {
        return null;
      }
    };
    
    try {
      // Tenta extrair a URL da imagem
      const imageUrl = extractImageUrl(img);
      
      // Se encontrou uma URL válida, retorna
      if (imageUrl) {
        return imageUrl;
      }
      
      // Se chegou aqui, tenta extrair a URL de outras maneiras
      if (img?.data) {
        const urlFromData = extractImageUrl(img.data);
        if (urlFromData) {
          return urlFromData;
        }
      }
      
      if (img?.attributes) {
        const urlFromAttributes = extractImageUrl(img.attributes);
        if (urlFromAttributes) {
          return urlFromAttributes;
        }
      }
      
      return fallbackImageUrl;
      
    } catch (error) {
      return fallbackImageUrl;
    }
  };
  
  // Processa a URL da imagem
  const imageUrl = useMemo(() => {
    try {
      return getImageUrl(image);
    } catch (error) {
      return fallbackImageUrl;
    }
  }, [image]);

  // Estado de carregamento
  if (isLoading) {
    return (
      <footer className="bg-[#1a1a1a] text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
      </footer>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <footer className="bg-[#1a1a1a] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-red-400">
          <p>Erro ao carregar o rodapé. Por favor, tente novamente mais tarde.</p>
          <p className="text-sm opacity-75 mt-2">Detalhes: {error.message}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-4 w-40">
            {imageUrl === fallbackImageUrl ? (
              // Imagem de fallback
              <img
                src={fallbackImageUrl}
                alt="Logo Orion"
                className="w-full h-auto object-contain"
              />
            ) : (
              // Imagem do Strapi
              <StrapiImage
                src={imageUrl}
                alt="Logo Orion"
                width={160}
                height={60}
                className="w-full h-auto object-contain"
                priority
              />
            )}
          </div>

          <div className="text-sm leading-relaxed">
            <h3 className="font-bold mb-2">{title1}</h3>
            <SafeHtml html={text1 || ''} />
          </div>

          <div className="text-sm leading-relaxed">
            <h3 className="font-bold mb-2">{title2}</h3>
            <SafeHtml html={text2 || ''} />
          </div>
        </div>
      </section>

      <section className="bg-blue-950 text-center text-sm font-semibold py-6">
        <p className="text-white">© {new Date().getFullYear()} Orion. All rights reserved.</p>
      </section>
    </footer>
  );
}