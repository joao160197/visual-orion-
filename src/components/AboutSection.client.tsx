'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { extractImageUrl } from './BlockRenderer';
import i18n from '@/i18n/i18n';

type AboutSectionProps = {
  title?: string;
  about?: string; 
  image?: any;
};

const AboutSection: React.FC<AboutSectionProps> = ({ title, about, image }) => {
  // Verifica se o i18next está pronto antes de usar o useTranslation
  const { t, ready } = useTranslation();
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Garante que estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Define o texto alternativo com fallback seguro
  const safeTitle = title || 'Sobre nós';
  const [imageAlt, setImageAlt] = useState(safeTitle);
  
  // Atualiza o imageAlt quando o título ou a tradução estiverem prontos
  useEffect(() => {
    if (ready && isClient) {
      setImageAlt(title || t('about.title', safeTitle));
    } else {
      setImageAlt(safeTitle);
    }
  }, [title, ready, t, isClient, safeTitle]);

  // Processa a imagem quando o componente é montado ou a imagem muda
  useEffect(() => {
    if (!image) {
      console.log('Nenhuma imagem fornecida para o AboutSection');
      setImageUrl(null);
      return;
    }

    try {
      console.log('=== ABOUT SECTION IMAGE PROCESSING ===');
      console.log('Dados da imagem recebidos:', JSON.stringify(image, null, 2));
      
      // Extrai a URL da imagem usando a função auxiliar
      const url = extractImageUrl(image);
      setImageUrl(url);
      
      // Extrai o texto alternativo de várias possíveis localizações
      const altText = 
        image.alternativeText || 
        image.AlternativeText ||
        image.attributes?.alternativeText ||
        image.attributes?.AlternativeText ||
        image.data?.attributes?.alternativeText ||
        image.data?.attributes?.AlternativeText ||
        title || 
        t('about.title', 'Sobre nós');
      
      setImageAlt(altText);
      
      console.log('URL da imagem processada:', url);
      console.log('Texto alternativo:', altText);
    } catch (error) {
      console.error('Erro ao processar imagem do AboutSection:', error);
      setImageUrl(null);
    }
  }, [image, title, t]);

  // Anima o contador
  useEffect(() => {
    const target = 25;
    const duration = 2000; // 2 segundos
    const step = (target / duration) * 16; // 16ms para ~60fps
    
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, []);

  // Função auxiliar para tradução segura
  const safeTranslate = (key: string, defaultValue: string) => {
    if (!ready || !isClient) return defaultValue;
    return t(key, defaultValue);
  };

  // Se não estiver pronto, mostra um esqueleto de carregamento
  if (!ready || !isClient) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {title || safeTranslate('about.title', 'Sobre Nós')}
            </h2>
            
            <div 
              className="prose prose-lg text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ 
                __html: about || safeTranslate('about.description', 'Descrição sobre a empresa...')
              }} 
            />
            
            <Link 
              href="/company" 
             className="mt-4 px-6 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-600 hover:text-white transition"
            >
              {safeTranslate('about.learnMore', 'Saiba Mais')}
            </Link>
          </div>
          
          {/* Image */}
          <div className="md:w-1/2 relative">
            {imageUrl ? (
              <div className="relative h-96 overflow-hidden rounded-lg shadow-xl">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">
                  {safeTranslate('about.noImage', 'Imagem não disponível')}
                </span>
              </div>
            )}
            
            <div className="absolute bottom-[-20px] left-4 bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200">
              <p className="text-3xl font-bold text-pink-600">{count}+</p>
              <p className="text-sm text-gray-700">
                {safeTranslate('about.yearsOfExperience', 'Anos de Experiência')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
