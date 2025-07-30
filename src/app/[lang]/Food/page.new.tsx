import VoltarButton from "@/components/BackButton";
import { getFoodContent } from "@/services/contentService";
import StrapiImage from "@/components/StrapiImage";

interface PageProps {
  params: {
    lang: string;
  };
}

// src/app/[lang]/Food/page.tsx
export default async function AlimentosBebidasPage({ params }: PageProps) {
  const { lang } = params;
  
  try {
    console.log('🌐 [Food Page] Iniciando carregamento da página para o idioma:', lang);
    
    // Força a revalidação a cada 5 minutos (300 segundos)
    const response = await getFoodContent(lang);
    
    console.log('📦 [Food Page] Dados recebidos do serviço:', {
      hasData: !!response?.data,
      hasAttributes: !!response?.data?.attributes,
      hasImage: !!response?.data?.attributes?.imageFood?.data?.attributes?.url,
      hasText: !!response?.data?.attributes?.textFood
    });
    
    if (!response?.data?.attributes) {
      console.error('❌ [Food Page] Nenhum dado de atributo encontrado na resposta');
      return (
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <VoltarButton />
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p className="font-medium">Conteúdo não disponível</p>
            <p className="text-sm mt-1">Não foi possível carregar o conteúdo desta página. Por favor, tente novamente mais tarde.</p>
          </div>
        </section>
      );
    }

    const { titleFood, textFood, imageFood } = response.data.attributes;
    
    // Log detalhado do conteúdo recebido
    console.log('📝 [Food Page] Conteúdo extraído:', { 
      titleLength: titleFood?.length || 0,
      textLength: textFood?.length || 0,
      hasImage: !!imageFood?.data?.attributes?.url,
      imageUrl: imageFood?.data?.attributes?.url || 'Nenhuma URL de imagem'
    });

    return (
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <VoltarButton />
        </div>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {titleFood || 'Alimentos e Bebidas'}
            </h1>
          </div>
          
          {/* Imagem */}
          {imageFood?.data?.attributes?.url ? (
            <div className="w-full h-64 md:h-96 relative overflow-hidden">
              <StrapiImage
                image={imageFood}
                alt={titleFood || 'Imagem de alimentos e bebidas'}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
          
          {/* Conteúdo de texto */}
          <div className="p-6 md:p-8">
            {textFood ? (
              <div className="prose max-w-none text-gray-700">
                {textFood.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 leading-relaxed">
                    {paragraph || <br />}
                  </p>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
                <p>Conteúdo em desenvolvimento. Por favor, volte em breve.</p>
              </div>
            )}
          </div>
        </article>
      </section>
    );
  } catch (error) {
    console.error('❌ [Food Page] Erro ao carregar a página:', error);
    
    return (
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <VoltarButton />
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded">
          <h2 className="text-xl font-bold mb-2">Erro ao carregar o conteúdo</h2>
          <p className="mb-4">Ocorreu um erro ao carregar o conteúdo desta página. Por favor, tente novamente mais tarde.</p>
          <details className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
            <summary className="font-medium cursor-pointer">Detalhes do erro</summary>
            <pre className="mt-2 p-2 bg-white rounded overflow-auto max-h-40">
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </pre>
          </details>
        </div>
      </section>
    );
  }
}
