"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Importação dinâmica do componente do cliente para carregamento otimizado
const AboutSectionClient = dynamic(
  () => import('./AboutSection.client'),
  { 
    ssr: false, // Desativa a renderização do lado do servidor para este componente
    loading: () => (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4">ddd</div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
);

type AboutSectionProps = {
  title?: string;
  about?: string; 
  image?: any;
};

// Este é apenas um componente de wrapper que renderiza o componente do cliente
const AboutSection: React.FC<AboutSectionProps> = (props) => {
  return <AboutSectionClient {...props} />;
};

export default AboutSection;
