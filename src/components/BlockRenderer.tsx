import InfoBlock from "./InfoBlock";
import CarouselBlock from "./CarouselBlock";
import AboutSection from "./AboutSection";
import { Block } from "@/lib/utils/types/types";

import { getStrapiUrl } from "@/lib/utils/get-strapi-url";

// Função auxiliar para extrair a URL da imagem da estrutura do Strapi
export const extractImageUrl = (imageData: any): string | null => {
  try {
    if (!imageData) {
      console.log('Nenhum dado de imagem fornecido');
      return null;
    }
    
    console.log('=== EXTRACT IMAGE URL ===');
    console.log('Dados da imagem recebidos:', JSON.stringify(imageData, null, 2));
    
    // Se for uma string, assume que já é uma URL
    if (typeof imageData === 'string') {
      console.log('URL direta encontrada:', imageData);
      return getStrapiUrl(imageData);
    }
    
    // Se for um array, pega o primeiro item
    if (Array.isArray(imageData)) {
      console.log('Array de imagens encontrado, pegando a primeira');
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
      console.log('URL encontrada em data.attributes.url:', url);
    } else if (dataObj?.attributes?.Url) {
      url = dataObj.attributes.Url;
      console.log('URL encontrada em data.attributes.Url:', url);
    } else if (attributes?.url) {
      url = attributes.url;
      console.log('URL encontrada em attributes.url:', url);
    } else if (attributes?.Url) {
      url = attributes.Url;
      console.log('URL encontrada em attributes.Url:', url);
    } else if (imageData.url) {
      // URL direta
      url = imageData.url;
      console.log('URL direta (url):', url);
    } else if (imageData.Url) {
      // URL direta com letra maiúscula
      url = imageData.Url;
      console.log('URL direta (Url):', url);
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
        console.log('URL encontrada em formatos (url):', url);
      } else if (format?.Url) {
        url = format.Url;
        console.log('URL encontrada em formatos (Url):', url);
      }
    }
    
    if (!url) {
      console.log('Nenhuma URL de imagem encontrada nos dados');
      return null;
    }
    
    // Remove barras iniciais duplicadas
    if (url.startsWith('//')) {
      url = url.substring(1);
    }
    
    // Garante que a URL seja absoluta usando getStrapiUrl
    const fullUrl = getStrapiUrl(url);
    console.log('URL final da imagem:', fullUrl);
    return fullUrl;
    
  } catch (error) {
    console.error('Erro ao extrair URL da imagem:', error);
    console.error('Dados da imagem com erro:', JSON.stringify(imageData, null, 2));
    return null;
  }
};

// Normaliza o bloco vindo do Strapi
const normalizeBlock = (block: any) => {
  console.log('=== NORMALIZANDO BLOCO ===');
  console.log('Bloco original:', JSON.stringify(block, null, 2));
  
  if (!block) {
    console.log('Bloco é nulo ou indefinido');
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
    
    console.log('Bloco normalizado (com atributos):', JSON.stringify(normalized, null, 2));
    return normalized;
  }
  
  // Se já estiver no formato esperado
  const normalized = {
    id: block.id || `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...block
  };
  
  console.log('Bloco normalizado (sem atributos):', JSON.stringify(normalized, null, 2));
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
export function renderBlocks(blocks: any[], locale?: string) {
  try {
    console.log('=== RENDERIZANDO BLOCOS ===');
    console.log('Blocos recebidos:', JSON.stringify(blocks, null, 2));
    
    if (!blocks || (Array.isArray(blocks) && blocks.length === 0)) {
      console.log('Nenhum bloco para renderizar');
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
          console.error('Erro ao processar bloco:', error);
          return null;
        }
      })
      .filter(Boolean);
    
    console.log('Blocos processados:', JSON.stringify(processedBlocks, null, 2));
    
    if (processedBlocks.length === 0) {
      console.log('Nenhum bloco válido para renderizar após o processamento');
      return null;
    }

    return (
      <div className="space-y-12">
        {processedBlocks.map((block, index) => {
          if (!block) {
            console.warn(`Bloco ${index} é nulo ou indefinido`);
            return null;
          }
          
          const blockId = block.id || `block-${index}`;
          const componentType = block.__component || block.type;
          
          console.log(`\n=== PROCESSANDO BLOCO ${index + 1} ===`);
          console.log('ID:', blockId);
          console.log('Tipo:', componentType);
          console.log('Conteúdo do bloco:', JSON.stringify(block, null, 2));

          // --- INFO BLOCK ---
          if (componentType === 'blocks.info-block' || componentType === 'info-block') {
            console.log('=== PROCESSANDO INFO BLOCK ===');
            
            // Extrai os dados do bloco
            const headline = block.headline || block.title || '';
            const content = block.content || block.description || block.body || '';
            
            // Processa o campo reversed (suporta 'reversed' e 'revarsed' com variações de case)
            const reversedValue = (
              block.revased === true || block.revased === 'true' || block.revased === 'TRUE' ||
              block.reversed === true || block.reversed === 'true' || block.reversed === 'TRUE' ||
              block.revased === 1 || block.reversed === 1 ||
              block.revased === '1' || block.reversed === '1'
            );
            
            console.log(`[InfoBlock] Cabeçalho: ${headline}`);
            console.log(`[InfoBlock] Conteúdo: ${content.substring(0, 50)}...`);
            console.log(`[InfoBlock] Reverso: ${reversedValue}`);

            // Obtém a imagem independentemente de ser 'image' ou 'Image' e mantém a estrutura original
            let imageItem = 
              block.image !== undefined ? block.image : 
              block.Image !== undefined ? block.Image :
              null;
              
            console.log('[InfoBlock] Dados da imagem bruta:', JSON.stringify(imageItem, null, 2));
            
            // Se for um array, pega o primeiro item
            if (Array.isArray(imageItem)) {
              imageItem = imageItem[0] || null;
            }
            
            // Não transformamos mais a estrutura, mantemos como está vindo do Strapi
            // A função extractImageUrl já sabe lidar com diferentes formatos
            
            console.log('[InfoBlock] Dados da imagem processados:', imageItem);

            return (
              <div key={blockId} className="w-full">
                <InfoBlock
                  headline={headline}
                  content={content}
                  image={imageItem}
                  reversed={reversedValue}
                />
              </div>
            );
          }

          // --- CAROUSEL BLOCK ---
          if (componentType === 'blocks.carousel-block' || componentType === 'blocks.carousel_block') {
            let carouselImages = processCarouselImages(block.images || block.Images || block.image || block.Image);

            if (carouselImages.length === 0) {
              carouselImages = [
                {
                  url: "/uploads/sunset_vista_homem_1024x683_97b996126d.jpg",
                  name: "Pôr do sol com vista para o mar",
                  alternativeText: "Pôr do sol com vista para o mar"
                },
                {
                  url: "/uploads/boys_helping_climb_1024x628_ad3d35491a.jpg",
                  name: "Jovens escalando uma montanha",
                  alternativeText: "Jovens escalando uma montanha"
                }
              ];
            }

            return (
              <CarouselBlock
                key={`carousel-${blockId}`}
                title={block.title}
                images={carouselImages}
              />
            );
          }

          // --- ABOUT SECTION ---
          if (componentType === 'blocks.about-section' || componentType === 'blocks.aboutSection') {
            const image = block.image?.data?.attributes || block.image || block.Image?.data?.attributes || block.Image;
            return (
              <AboutSection
                key={`about-section-${blockId}`}
                title={block.title}
                about={block.about}
                image={image}
              />
            );
          }

          // --- BLOCO DESCONHECIDO ---
          console.warn(`[BlockRenderer] Tipo de bloco desconhecido: ${componentType}`);
          return null;
        })}
      </div>
    );
  } catch (error) {
    console.error('[BlockRenderer] Erro ao renderizar blocos:', error);

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
