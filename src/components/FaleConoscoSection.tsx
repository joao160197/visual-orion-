"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiUrl } from '@/lib/utils/get-strapi-url';
import { Locale } from '@/i18n-config';

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

  // URL da imagem padrão
  const defaultImageUrl = 'http://localhost:1337/uploads/handsome_businessman_white_background_1368_6022_ad9b0fab86.avif';

  // Processa a imagem quando o componente é montado ou a imagem muda
  useEffect(() => {
    console.log('Dados da imagem recebidos no FaleConoscoSection:', JSON.stringify(image, null, 2));
    
    // Se não houver imagem, usar a imagem padrão
    if (!image) {
      console.log('Nenhuma imagem fornecida ao componente, usando imagem padrão');
      setImageUrl(defaultImageUrl);
      return;
    }

    try {
      // Tenta extrair a URL da imagem de diferentes maneiras
      let url: string | null = null;
      let altText = titulo || 'Fale Conosco';
      
      // Extrai a URL da imagem de diferentes estruturas de dados
      const extractUrl = (obj: any): { url: string | null, alt: string } => {
        if (!obj) return { url: null, alt: altText };
        
        // Se for um array, pega o primeiro item
        if (Array.isArray(obj)) {
          return extractUrl(obj[0]);
        }
        
        // Se tiver o formato do Strapi v4
        if (obj.data) {
          return extractUrl(obj.data);
        }
        
        // Se for um objeto de atributos
        if (obj.attributes) {
          return extractUrl(obj.attributes);
        }
        
        // Se tiver a URL diretamente
        if (obj.url) {
          return { 
            url: obj.url, 
            alt: obj.alternativeText || obj.caption || obj.name || altText 
          };
        }
        
        // Se for um objeto com formato { formats: { ... } }
        if (obj.formats) {
          const format = obj.formats.large || obj.formats.medium || obj.formats.small || obj.formats.thumbnail;
          if (format?.url) {
            return { 
              url: format.url, 
              alt: obj.alternativeText || obj.caption || obj.name || altText 
            };
          }
        }
        
        return { url: null, alt: altText };
      };
      
      // Extrai a URL e o texto alternativo
      const { url: extractedUrl, alt: extractedAlt } = extractUrl(image);
      url = extractedUrl;
      altText = extractedAlt || altText;
      
      // Se encontrou uma URL, atualiza o estado
      if (url) {
        // Garante que a URL é absoluta
        let finalUrl = url;
        if (!url.startsWith('http') && !url.startsWith('//') && !url.startsWith('data:')) {
          // Remove barras iniciais duplicadas e adiciona o domínio do Strapi
          const cleanUrl = url.startsWith('uploads/') ? url : `uploads/${url}`;
          finalUrl = getStrapiUrl(cleanUrl);
        }
        
        console.log('URL da imagem processada:', finalUrl);
        
        // Verifica se a URL é acessível
        const img = new window.Image();
        img.onload = () => {
          console.log('Imagem carregada com sucesso:', finalUrl);
          // Usar a URL diretamente, pois já foi validada
          setImageUrl(finalUrl);
          setImageAlt(altText);
        };
        img.onerror = () => {
          console.error('Erro ao carregar a imagem, usando imagem padrão');
          setImageUrl(defaultImageUrl);
          setImageAlt('Imagem padrão - Homem de negócios');
        };
        
        // Define a fonte da imagem após configurar os manipuladores de eventos
        img.src = finalUrl;
      } else {
        console.warn('Não foi possível extrair a URL da imagem, usando imagem padrão');
        setImageUrl(defaultImageUrl);
        setImageAlt('Imagem padrão - Homem de negócios');
      }
    } catch (error) {
      console.error('Erro ao processar a imagem, usando imagem padrão:', error);
      setImageUrl(defaultImageUrl);
      setImageAlt('Imagem padrão - Homem de negócios');
    }
  }, [image, titulo]);
  
  // Usar valores traduzidos ou props, com fallback para os valores padrão
  const displayTitulo = titulo || defaultTitulo;
  const displayTexto = texto || defaultTexto;
  const displayTextoBotao = textoBotao || defaultTextoBotao;
  
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Conteúdo de texto */}
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {displayTitulo}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {displayTexto}
            </p>
            <Link 
              href={linkBotao}
              className="mt-4 px-6 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-600 hover:text-white transition"
            >
              {displayTextoBotao}
            </Link>
          </div>
          
          {/* Imagem */}
          <div className="md:w-1/2 h-64 md:h-auto relative">
            <div className="w-full h-full">
              {/* Usando uma div com background para melhor controle */}
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${imageUrl || defaultImageUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  minHeight: '400px',
                  width: '100%',
                  height: '100%'
                }}
                onLoad={() => console.log('Imagem de fundo carregada com sucesso:', imageUrl || defaultImageUrl)}
                onError={() => {
                  console.error('Erro ao carregar imagem de fundo, usando imagem padrão');
                  setImageUrl(defaultImageUrl);
                  setImageAlt('Imagem padrão - Homem de negócios');
                }}
              >
                {/* Imagem invisível para manter o espaço e acessibilidade */}
                <img 
                  src={imageUrl || defaultImageUrl} 
                  alt={imageAlt} 
                  className="opacity-0 w-full h-full object-cover" 
                  aria-hidden="true"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Previne loops
                    target.src = defaultImageUrl;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
