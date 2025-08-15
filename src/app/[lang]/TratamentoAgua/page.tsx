import VoltarButton from "@/components/BackButton";
import { getWaterTreatmentContent } from "@/services/contentService";
import Image from 'next/image';

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function TratamentoAguaPage({ params }: PageProps) {
  const { lang } = params;
  
  try {
    // Obtém os dados estáticos
    const response = await getWaterTreatmentContent(lang);
    const { titleWater, textWater, imageWater } = response.data;
    const imageUrl = imageWater?.url || '/images/placeholder.svg';
    const imageAlt = imageWater?.alternativeText || 'Tratamento de Água';
    
    return (
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <VoltarButton />
        </div>
        
        <h1 className="text-4xl font-bold text-[#004a6d] text-center mb-8">
          {titleWater}
        </h1>
        
        <div className="prose max-w-3xl mx-auto text-justify">
          {/* Imagem */}
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
          
          <div className="prose-lg">
            {textWater.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Erro ao carregar a página de Tratamento de Água:', error);
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
