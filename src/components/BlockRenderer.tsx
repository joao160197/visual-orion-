import InfoBlock from "./InfoBlock";
import CarouselBlock from "./CarouselBlock";
import AboutSection from "./AboutSection";
import { Block } from "@/lib/utils/types/types";


// Função auxiliar para extrair a URL da imagem da estrutura do Strapi
export const extractImageUrl = (imageData: any): string | null => {
  try {
    if (!imageData) {
      return null;
    }
    
    // Se for uma string, assume que já é uma URL
    if (typeof imageData === 'string') {
      return imageData.startsWith('http') || imageData.startsWith('/')
        ? imageData
        : `/${imageData.replace(/^\/+/, '')}`;
    }
    
    // Se for um array, pega o primeiro item
    if (Array.isArray(imageData)) {
      return extractImageUrl(imageData[0]);
    }
    
    // Extrai a URL baseada na estrutura do Strapi v4
    let url: string | undefined;
    
    // 1. Tenta extrair a URL da imagem em diferentes formatos (case insensitive)
    // Verifica tanto 'data' quanto 'Data'
    const dataObj = imageData.data || imageData.Data;
    const attributes = dataObj?.attributes || dataObj?.Attributes || 
                      imageData.attributes || imageData.Attributes;
    
    // Verifica URL em diferentes níveis de aninhamento
    if (dataObj?.attributes?.url) {
      url = dataObj.attributes.url;
    } else if (dataObj?.attributes?.Url) {
      url = dataObj.attributes.Url;
    } else if (attributes?.url) {
      url = attributes.url;
    } else if (attributes?.Url) {
      url = attributes.Url;
    } else if (imageData.url) {
      // URL direta
      url = imageData.url;
    } else if (imageData.Url) {
      // URL direta com letra maiúscula
      url = imageData.Url;
    } else {
      // Tenta encontrar em algum formato disponível (case insensitive)
      const formats = imageData.formats || imageData.Formats || 
                     attributes?.formats || attributes?.Formats;
      
      // Verifica formatos em diferentes variações de case
      const format = formats?.large || formats?.Large || 
                    formats?.medium || formats?.Medium ||
                    formats?.small || formats?.Small || 
                    formats?.thumbnail || formats?.Thumbnail;
      
      if (format?.url) {
        url = format.url;
      } else if (format?.Url) {
        url = format.Url;
      }
    }
    
    if (!url) {
      return null;
    }
    
    // Remove barras iniciais duplicadas
    if (url.startsWith('//')) {
      url = url.substring(1);
    }
    
    // Normaliza para raiz se não for absoluta
    return url.startsWith('http') || url.startsWith('/') ? url : `/${url.replace(/^\/+/, '')}`;
    
  } catch (error) {
    return null;
  }
};

// Normaliza o bloco vindo do Strapi
const normalizeBlock = (block: any) => {
  if (!block) {
    return null;
  }
  
  // Se for um objeto com atributos (formato Strapi v4+)
  if (block.attributes) {
    const normalized = {
      id: block.id,
      ...block.attributes,
      __component: block.attributes.__component || block.__component
    };
    
    // Se houver dados aninhados (como imagens), extrai-os
    if (block.attributes.image?.data) {
      normalized.image = block.attributes.image;
    }
    if (block.attributes.Image?.data) {
      normalized.Image = block.attributes.Image;
    }
    
    return normalized;
  }
  
  // Se já estiver no formato esperado
  const normalized = {
    id: block.id || `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...block
  };
  
  return normalized;
};

// Processa imagens do carrossel
const processCarouselImages = (imagesData: any) => {
  if (!imagesData) return [];

  if (Array.isArray(imagesData)) {
    return imagesData.map((img: any) => {
      const attrs = img?.data?.attributes || img.attributes || img;
      const url = extractImageUrl(attrs);
      return {
        url: url || '',
        name: attrs.name || 'Imagem do carrossel',
        alternativeText: attrs.alternativeText || 'Imagem do carrossel',
        ...(attrs.formats && { formats: attrs.formats })
      };
    });
  }

  if (imagesData.data) {
    const data = Array.isArray(imagesData.data) ? imagesData.data : [imagesData.data];
    return data
      .filter((item: any) => item?.attributes)
      .map((item: any) => {
        const attrs = item.attributes;
        const url = extractImageUrl(attrs);
        return {
          url: url || '',
          name: attrs.name || 'Imagem do carrossel',
          alternativeText: attrs.alternativeText || 'Imagem do carrossel',
          ...(attrs.formats && { formats: attrs.formats })
        };
      });
  }

  return [];
};

// Função auxiliar para extrair dados de imagem de diferentes formatos do Strapi
const extractImageData = (imageData: any) => {
  if (!imageData) return null;
  
  // Se for um array, pega o primeiro item
  if (Array.isArray(imageData)) {
    return extractImageData(imageData[0]);
  }
  
  // Se for um objeto com atributos (Strapi v4+)
  if (imageData.data) {
    if (Array.isArray(imageData.data)) {
      return imageData.data.map((item: any) => extractImageData(item));
    }
    return {
      ...imageData,
      url: imageData.data.attributes?.url || imageData.url,
      alternativeText: imageData.data.attributes?.alternativeText || imageData.alternativeText,
      formats: imageData.data.attributes?.formats || imageData.formats
    };
  }
  
  // Se for um objeto com atributos diretos
  if (imageData.attributes) {
    return {
      ...imageData,
      url: imageData.attributes.url || imageData.url,
      alternativeText: imageData.attributes.alternativeText || imageData.alternativeText,
      formats: imageData.attributes.formats || imageData.formats
    };
  }
  
  // Já está no formato esperado
  return imageData;
};

// Função principal para renderizar blocos
export const renderBlocks = (blocks: any[], dictionary: any, locale?: string) => {
  try {
    if (!blocks || (Array.isArray(blocks) && blocks.length === 0)) {
      return null;
    }

    // Normaliza os blocos para um array
    const blocksArray = Array.isArray(blocks) ? blocks : [blocks];
    
    // Filtra e processa cada bloco
    const processedBlocks = blocksArray
      .map(block => {
        try {
          // Se for um bloco do Strapi v4+ com estrutura { id, attributes }
          if (block && typeof block === 'object' && block.attributes) {
            const normalized = {
              id: block.id,
              ...block.attributes,
              __component: block.attributes.__component || block.__component
            };
            
            // Extrai imagens aninhadas
            if (block.attributes.image?.data) {
              normalized.image = extractImageData(block.attributes.image);
            }
            if (block.attributes.images?.data) {
              normalized.images = extractImageData(block.attributes.images);
            }
            
            return normalized;
          }
          
          // Se já estiver no formato esperado
          return block;
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);
    
    if (processedBlocks.length === 0) {
      return null;
    }

    return (
      <div className="space-y-12">
        {processedBlocks.map((block, index) => {
          if (!block) {
            return null;
          }
          
          const blockId = block.id || `block-${index}`;
          const componentType = block.__component || block.type;

          // Renderiza o bloco com base no tipo
          switch (componentType) {
            case 'blocks.carousel':
            case 'blocks.carousel-block':
            case 'shared.carousel':
              console.log('Renderizando bloco do carrossel:', block);
              return (
                <CarouselBlock
                  key={blockId}
                  title={block.title}
                  images={block.images || []}
                />
              );
            case 'blocks.info':
            case 'shared.info':
              return (
                <InfoBlock
                  key={blockId}
                  headline={block.headline || block.title}
                  content={block.content}
                  image={block.Image?.data || block.image}
                  reversed={block.reversed}
                />
              );
            case 'blocks.about':
            case 'shared.about':
              return (
                <AboutSection
                  key={blockId}
                  title={block.title}
                  about={block.about}
                  image={block.image}
                  dictionary={dictionary}
                />
              );
            default:
              if (process.env.NODE_ENV === 'development') {
                return (
                  <div key={blockId} className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                    <h3 className="font-bold">Bloco não reconhecido</h3>
                    <p>Tipo: {componentType || 'não especificado'}</p>
                    <details className="mt-2 text-sm">
                      <summary>Detalhes do bloco</summary>
                      <pre className="whitespace-pre-wrap mt-1 p-2 bg-yellow-50 rounded">
                        {JSON.stringify(block, null, 2)}
                      </pre>
                    </details>
                  </div>
                );
              }
              return null;
          }
        })}
      </div>
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Erro ao renderizar blocos</h3>
          <p>{error instanceof Error ? error.message : 'Erro desconhecido'}</p>
          <details className="mt-2 text-sm">
            <summary>Detalhes do erro</summary>
            <pre className="whitespace-pre-wrap mt-1 p-2 bg-red-50 rounded">
              {JSON.stringify(blocks, null, 2)}
            </pre>
          </details>
        </div>
      );
    }

    return null;
  }
}
