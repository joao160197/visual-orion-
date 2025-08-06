'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { extractImageUrl } from './BlockRenderer';

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
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {title || dictionary.title}
            </h2>
            
            <div 
              className="prose prose-lg text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ 
                __html: about || dictionary.description
              }} 
            />
            
            <Link 
              href="/company" 
             className="mt-4 px-6 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-600 hover:text-white transition"
            >
              {dictionary.learnMore}
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
                  {dictionary.noImage}
                </span>
              </div>
            )}
            
            <div className="absolute bottom-[-20px] left-4 bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200">
              <p className="text-3xl font-bold text-pink-600">{count}+</p>
              <p className="text-sm text-gray-700">
                {dictionary.yearsOfExperience}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
