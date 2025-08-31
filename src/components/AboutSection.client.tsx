'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LocaleLink } from './LocaleLink';
import { extractImageUrl } from './BlockRenderer';
import { Reveal } from './Reveal';

interface AboutDictionary {
  title: string;
  description: string;
  learnMore: string;
  yearsOfExperience: string;
  noImage: string;
}

type AboutSectionProps = {
  title?: string;
  about?: string; 
  image?: any;
  dictionary: AboutDictionary;
};

const AboutSection: React.FC<AboutSectionProps> = ({ title, about, image, dictionary }) => {
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState(title || dictionary.title);

  // Processa a imagem quando o componente é montado ou a imagem muda 
  useEffect(() => {
    if (image) {
      const url = extractImageUrl(image);
      setImageUrl(url);
      
      // Define o texto alternativo com base nos dados da imagem ou no título
      const altText = 
        image.alternativeText || 
        image.AlternativeText ||
        image.attributes?.alternativeText ||
        image.attributes?.AlternativeText ||
        image.data?.attributes?.alternativeText ||
        image.data?.attributes?.AlternativeText ||
        title || 
        dictionary.title;
      
      setImageAlt(altText);
      
    } else {
      // Se não houver imagem, define a URL como nula e usa o texto de fallback
      setImageUrl(null);
      setImageAlt(dictionary.noImage);
    }
  }, [image, title, dictionary.title, dictionary.noImage]);

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



  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <Reveal direction="up" distance={24} duration={0.55}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {title || dictionary.title}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.06} distance={20} duration={0.55}>
              <div 
                className="prose prose-lg text-gray-600 mb-8 text-justify prose-p:text-justify"
                dangerouslySetInnerHTML={{ 
                  __html: about || dictionary.description
                }} 
              />
            </Reveal>
            <Reveal direction="up" delay={0.12} distance={16} duration={0.5}>
              <LocaleLink 
                href="/company" 
                className="mt-4 px-6 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-600 hover:text-white transition"
              >
                {dictionary.learnMore}
              </LocaleLink>
            </Reveal>
          </div>
          
          {/* Image */}
          <div className="md:w-1/2 relative mt-8 md:mt-0 w-full">
            {imageUrl ? (
              <>
                {/* Mobile: full-bleed (remove container padding), 4:3 */}
                <Reveal direction="right" distance={28} duration={0.6}>
                  <div
                    className="relative block md:hidden -mx-4 w-[calc(100%+2rem)] overflow-hidden rounded-none shadow-md"
                    style={{ aspectRatio: '4 / 3' }}
                  >
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                      priority
                      placeholder="blur"
                      blurDataURL={'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9"><rect width="16" height="9" fill="#e5e7eb"/></svg>')}
                    />
                  </div>
                </Reveal>

                {/* Desktop/Tablet: contained, 16:9 */}
                <Reveal direction="right" distance={28} duration={0.6}>
                  <div
                    className="relative hidden md:block w-full max-w-[720px] overflow-hidden rounded-xl shadow-2xl mx-auto"
                    style={{ aspectRatio: '16 / 9' }}
                  >
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 80vw, 50vw"
                      priority
                      placeholder="blur"
                      blurDataURL={'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9"><rect width="16" height="9" fill="#e5e7eb"/></svg>')}
                    />
                  </div>
                </Reveal>
              </>
            ) : (
              <>
                <Reveal direction="right" distance={28} duration={0.6}>
                  <div
                    className="bg-gray-200 md:hidden -mx-4 w-[calc(100%+2rem)] rounded-none flex items-center justify-center"
                    style={{ aspectRatio: '4 / 3' }}
                  >
                    <span className="text-gray-500">{dictionary.noImage}</span>
                  </div>
                </Reveal>
                <Reveal direction="right" distance={28} duration={0.6}>
                  <div
                    className="bg-gray-200 hidden md:flex w-full max-w-[720px] rounded-xl items-center justify-center mx-auto"
                    style={{ aspectRatio: '16 / 9' }}
                  >
                    <span className="text-gray-500">{dictionary.noImage}</span>
                  </div>
                </Reveal>
              </>
            )}

            {/* Experience badge: below on mobile, floating on desktop */}
            <Reveal direction="up" delay={0.1} distance={18} duration={0.5}>
              <div className="relative md:absolute mt-4 md:mt-0 md:-bottom-5 md:left-4 z-10 bg-white/95 backdrop-blur px-6 py-4 rounded-lg shadow-lg border border-gray-200 w-max mx-auto md:mx-0">
                <p className="text-3xl font-bold text-pink-600">{count}+</p>
                <p className="text-sm text-gray-700">{dictionary.yearsOfExperience}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
