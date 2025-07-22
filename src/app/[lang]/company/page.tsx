import { getCompanyPage } from '@/data/loaders';
import { getStrapiUrl } from '@/lib/utils/get-strapi-url';

interface PageProps {
  params: {
    lang: string;
  };
}

interface Block {
  id: number;
  __component: string;
  [key: string]: any;
}

export default async function CompanyPage({ params }: PageProps) {
  const { lang } = params;
  
  console.log('=== RENDERIZANDO PÁGINA DA EMPRESA ===');
  console.log('Idioma:', lang);
  
  try {
    console.log('Iniciando busca dos dados...');
    const pageData = await getCompanyPage(lang);
    console.log('Dados recebidos na página:', JSON.stringify(pageData, null, 2));
    
    const { title, description, blocks = [] } = pageData;
    
    // Função para renderizar blocos de forma segura
    const renderBlock = (block: Block) => {
      if (!block) {
        console.warn('Bloco nulo recebido para renderização');
        return null;
      }
      
      const blockKey = `block-${block.id}-${block.__component || 'unknown'}`;
      
      try {
        // Renderização condicional baseada no tipo de bloco
        switch (block.__component) {
          case 'blocks.hero':
            // Extrai os dados da imagem de forma segura
            const heroImage = block.image?.data?.attributes;
            const heroImageUrl = heroImage?.formats?.large?.url || heroImage?.url;
            
            return (
              <section key={blockKey} className="relative bg-gray-50 rounded-xl p-8 md:p-12 my-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {block.title || 'Título não definido'}
                  </h2>
                  {block.description && (
                    <div 
                      className="prose mx-auto mb-8 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: block.description }}
                    />
                  )}
                  {heroImageUrl && (
                    <div className="mt-8">
                      <img
                        src={getStrapiUrl(heroImageUrl)}
                        alt={heroImage.alternativeText || block.title || 'Imagem'}
                        className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
                        onError={(e) => {
                          console.error('Erro ao carregar imagem:', heroImageUrl);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </section>
            );
            
          case 'blocks.info-block':
            // Extrai os dados da imagem de forma segura
            const infoImage = block.image?.data?.attributes;
            const infoImageUrl = infoImage?.formats?.large?.url || infoImage?.url;
            
            return (
              <section 
                key={blockKey} 
                className={`bg-white rounded-xl shadow-sm border p-6 md:p-8 my-8 ${block.reversed ? 'md:flex-row-reverse' : ''} flex flex-col md:flex-row items-center gap-8`}
              >
                {infoImageUrl && (
                  <div className="md:w-1/2 w-full">
                    <img
                      src={getStrapiUrl(infoImageUrl)}
                      alt={infoImage?.alternativeText || block.headline || 'Imagem'}
                      className="rounded-lg shadow-md w-full h-auto"
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', infoImageUrl);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className={`${infoImageUrl ? 'md:w-1/2' : 'w-full'}`}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {block.headline || 'Título não definido'}
                  </h3>
                  {block.content ? (
                    <div 
                      className="prose max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  ) : (
                    <p className="text-gray-500 italic">Conteúdo não disponível</p>
                  )}
                </div>
              </section>
            );
            
          default:
            console.warn(`Tipo de bloco não suportado: ${block.__component}`, block);
            return (
              <div key={blockKey} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Bloco do tipo <code className="font-mono">{block.__component}</code> não pode ser exibido.
                    </p>
                  </div>
                </div>
              </div>
            );
        }
      } catch (error) {
        console.error('Erro ao renderizar bloco:', error, block);
        return (
          <div key={`error-${blockKey}`} className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Ocorreu um erro ao renderizar este bloco. Por favor, tente novamente mais tarde.
                </p>
              </div>
            </div>
          </div>
        );
      }
    };
    
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Cabeçalho */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title || 'Nossa Empresa'}
            </h1>
            {description && (
              <div 
                className="prose max-w-3xl mx-auto text-gray-600"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </header>
          
          {/* Blocos de Conteúdo */}
          <div className="space-y-16">
            {Array.isArray(blocks) && blocks.map(renderBlock)}
            
            {blocks.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Nenhum bloco de conteúdo encontrado
                </h3>
                <p className="text-gray-600">
                  Adicione blocos de conteúdo no painel do Strapi para vê-los aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Erro ao renderizar a página da empresa:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Erro ao carregar a página
            </h1>
            <div className="bg-red-50 p-4 rounded-lg text-left mb-6">
              <p className="font-semibold text-red-800">Detalhes do erro:</p>
              <pre className="mt-2 text-sm text-red-700 overflow-auto">
                {error instanceof Error ? error.message : 'Erro desconhecido'}
              </pre>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-sm">
              <p className="font-medium mb-2">Informações adicionais:</p>
              <ul className="space-y-1 text-gray-600">
                <li><strong>URL da API:</strong> {getStrapiUrl()}/api/company</li>
                <li><strong>Idioma:</strong> {lang}</li>
                <li><strong>Ambiente:</strong> {process.env.NODE_ENV}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}