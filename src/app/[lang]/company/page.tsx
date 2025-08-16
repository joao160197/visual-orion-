import { getCompanyPage } from '@/data/loaders';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { Reveal } from '@/components/Reveal';

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

  // Company page (local data)

  try {
    const pageData = await getCompanyPage(lang);

    const { title, description, blocks = [] } = pageData;

    const renderBlock = (block: Block) => {
      if (!block) return null;

      const blockKey = `block-${block.id}-${block.__component || 'unknown'}`;

      try {
        switch (block.__component) {
          case 'blocks.hero':
            const heroImage = Array.isArray(block.image) ? block.image[0] : null;

            return (
              <section
                key={blockKey}
                className="relative bg-gray-50 rounded-xl p-8 md:p-12 my-12 text-center"
              >
                <Reveal>
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                      {block.title || 'Título não definido'}
                    </h2>
                    {block.description && (
                      <div
                        className="prose mx-auto mb-8 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: block.description }}
                      />
                    )}
                    {heroImage && (
                      <div className="mt-8">
                        <StrapiImage
                          src={heroImage.url}
                          alt={heroImage.alternativeText || block.title || 'Imagem'}
                          className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
                          width={1200}
                          height={630}
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              </section>
            );

          case 'blocks.info-block':
            const infoImage = Array.isArray(block.image) ? block.image[0] : null;

            return (
              <section
                key={blockKey}
                className={`bg-white rounded-xl shadow-md p-8 my-12 flex flex-col-reverse md:flex-row items-center gap-8 ${
                  block.reversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <Reveal>
                  <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                    {/* Imagem */}
                    <div>
                      {infoImage && (
                        <StrapiImage
                          src={infoImage.url}
                          alt={infoImage.alternativeText || block.headline || 'Imagem'}
                          className="rounded-lg shadow-lg w-full h-auto object-cover"
                          width={600}
                          height={400}
                        />
                      )}
                    </div>

                    {/* Texto */}
                    <div className="md:w-1/2 w-full text-center md:text-left">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
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
                  </div>
                </Reveal>
              </section>
            );

          default:
            return (
              <div key={blockKey} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">Bloco não suportado para exibição.</p>
                  </div>
                </div>
              </div>
            );
        }
      } catch (error) {
        console.error('Erro ao renderizar bloco:', error);
        return (
          <div key={`error-${blockKey}`} className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
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
        <div className="container mx-auto px-4 py-12">
          <header className="mb-16 text-center">
            <Reveal>
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  {title || 'Nossa Empresa'}
                </h1>
                {description && (
                  <div
                    className="prose max-w-3xl mx-auto text-gray-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </div>
            </Reveal>
          </header>

          <div className="space-y-20">
            {Array.isArray(blocks) && blocks.map(renderBlock)}

            {blocks.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Nenhum bloco de conteúdo encontrado
                </h3>
                <p className="text-gray-600">
                  Conteúdo em breve.
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
            <h1 className="text-3xl font-bold text-red-600 mb-4">Erro ao carregar a página</h1>
            <div className="bg-red-50 p-4 rounded-lg text-left mb-6">
              <p className="font-semibold text-red-800">Detalhes do erro:</p>
              <pre className="mt-2 text-sm text-red-700 overflow-auto">
                {error instanceof Error ? error.message : 'Erro desconhecido'}
              </pre>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-sm">
              <p className="font-medium mb-2">Informações adicionais:</p>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <strong>Idioma:</strong> {lang}
                </li>
                <li>
                  <strong>Ambiente:</strong> {process.env.NODE_ENV}
                </li>
                <li>
                  <strong>URL da API:</strong> /api/company
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
