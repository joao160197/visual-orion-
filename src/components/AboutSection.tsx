"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { extractImageUrl } from './BlockRenderer';

type AboutSectionProps = {
  title?: string;
  about?: string; 
  image?: any;
};

const AboutSection: React.FC<AboutSectionProps> = ({ title, about, image }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState(title || "Sobre nós");

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
        'Sobre nós';
      
      setImageAlt(altText);
      
      console.log('URL da imagem processada:', url);
      console.log('Texto alternativo definido:', altText);
    } catch (error) {
      console.error('Erro ao processar imagem do AboutSection:', error);
      console.error('Dados da imagem com erro:', JSON.stringify(image, null, 2));
      setImageUrl(null);
    }
  }, [image, title]);

  // Animação da contagem de 0 até 19
  useEffect(() => {
    let start = 0;
    const end = 19;
    const duration = 1500;
    const incrementTime = 30;
    const step = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Texto dinâmico do Strapi */}
        <div className="w-full lg:w-1/2 space-y-6">
          {title && (
            <h2 className="text-4xl font-bold text-[#004B6E]">
              {title}
            </h2>
          )}

          {about && (
            <div
              className="text-gray-700 text-lg space-y-4"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          )}

          <Link href="/company">
            <button className="mt-4 px-6 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-600 hover:text-white transition">
              {t('about.learnMore', 'Conheça mais sobre nós')}
            </button>
          </Link>
        </div>

        {/* Imagem + contagem animada */}
        <div className="w-full lg:w-1/2 relative">
          {imageUrl ? (
            <div className="relative aspect-video rounded-lg shadow-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  console.error('Erro ao carregar imagem:', imageUrl);
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

          <div className="absolute bottom-[-20px] left-4 bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200">
            <p className="text-3xl font-bold text-pink-600">{count}+</p>
            <p className="text-sm text-gray-700">
              {t('about.yearsOfExperience', 'Anos de Experiência')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
