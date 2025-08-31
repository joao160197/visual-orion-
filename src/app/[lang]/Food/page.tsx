import VoltarButton from "@/components/BackButton";
import { getFoodContent } from "@/services/contentService";
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function Food({ params }: PageProps) {

  const { lang } = params;
  
  try {
    // Obtém os dados estáticos
    const response = await getFoodContent(lang);

    const { data } = response;

    // Extrai os dados diretamente da nova estrutura
    const { titleFood, textFood, imageFood } = data;
    const imageUrl = imageFood?.url;
    const imageAlt = imageFood?.alternativeText || 'Imagem sobre Alimentos e Bebidas';
    
    
    return (
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <VoltarButton />
        </div>
        
        {titleFood && (
          <Reveal direction="up" distance={24} duration={0.55}>
            <h1 className="text-4xl text-[#3c4494] font-bold text-center mb-8">{titleFood}</h1>
          </Reveal>
        )}
        
        <div className="prose max-w-3xl mx-auto text-justify">
          {/* Imagem do CMS */}
          {imageUrl && (
            <Reveal direction="up" delay={0.06} distance={20} duration={0.6}>
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg relative w-full h-[400px] bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
              </div>
            </Reveal>
          )}
          
                    {textFood && (
            <div className="prose-lg text-justify prose-p:text-justify">
              {textFood.split('\n').map((paragraph: string, index: number) => (
                <Reveal key={index} delay={0.12 + index * 0.04} direction="up" distance={16} duration={0.5}>
                  <p className="mb-4">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('ERRO CAPTURADO NA PÁGINA FOOD:', error);
    return (
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <VoltarButton />
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4">
          <p>Ocorreu um erro ao carregar o conteúdo. Por favor, tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }
}