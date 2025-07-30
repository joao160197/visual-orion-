const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Função genérica para fazer requisições para a API do Strapi
export async function fetchAPI<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    
    // Configuração padrão dos headers
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Adiciona o token de autorização se existir
    if (apiToken) {
      defaultHeaders['Authorization'] = `Bearer ${apiToken}`;
    }
    
    // Faz a requisição
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
      // Garante que não usamos cache para pegar sempre a versão mais recente
      cache: 'no-store',
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(`HTTP error! status: ${response.status}`) as Error & {
        status?: number;
        response?: any;
      };
      error.status = response.status;
      error.response = errorData;
      throw error;
    }

    // Retorna os dados da resposta
    return await response.json() as T;
  } catch (error) {
    throw error;
  }
}

interface StrapiErrorResponse {
  status?: number;
  statusText?: string;
  data?: any;
}

interface StrapiResponse<T> {
  data: T | T[];
  meta?: any;
}

export interface FooterAttributes {
  title1?: string;
  title2?: string;
  text1?: string;
  text2?: string;
  image?: {
    data?: {
      id?: number;
      attributes?: {
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: any;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any | null;
        createdAt: string;
        updatedAt: string;
      };
    } | null;
  } | null;
  // Para suportar estruturas aninhadas do Strapi
  attributes?: {
    title1?: string;
    title2?: string;
    text1?: string;
    text2?: string;
    image?: any;
  };
}

// Função específica para buscar o footer
export async function getFooter() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    // Atualizado para incluir o componente footer e suas relações
    const endpoint = '/api/home-page?populate[footer][populate][0]=image';
    const fullUrl = `${apiUrl}${endpoint}`;
    
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.NEXT_PUBLIC_STRAPI_API_TOKEN && {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        })
      },
      next: { revalidate: 60 } // Revalidar a cada minuto
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao buscar dados do footer: ${response.status} ${response.statusText}`);
    }
    
    const responseData = await response.json();
    
    // Extrair os dados da página
    const pageData = responseData.data?.attributes || responseData.data || responseData;
    
    if (!pageData) {
      throw new Error('Dados da página não encontrados');
    }
    
    // Extrair os dados do footer
    let footerData = pageData.footer?.data?.attributes || pageData.footer || pageData;
    
    // Se for um array, pegar o primeiro item (caso repeatable=true)
    if (Array.isArray(footerData)) {
      footerData = footerData[0];
    }
    
    // Se não encontrar o footer nos locais esperados, retornar null
    if (!footerData) {
      return null;
    }
    
    // Processar a imagem do footer
    let imageData = null;
    
    if (footerData.image) {
      
      // Função auxiliar para garantir que a URL seja absoluta
      const ensureAbsoluteUrl = (url: string): string => {
        if (!url) return url;
        if (url.startsWith('http')) return url;
        
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        const separator = url.startsWith('/') ? '' : '/';
        return `${baseUrl}${separator}${url}`;
      };
      
      try {
        // Se a imagem já estiver no formato esperado
        if (footerData.image.data) {
          // Se for um array de imagens, pegar a primeira
          const imageArray = Array.isArray(footerData.image.data) 
            ? footerData.image.data 
            : [footerData.image.data];
          
          if (imageArray.length > 0) {
            // Verificar se a imagem tem atributos diretos ou se está no formato de atributos
            const imageItem = imageArray[0];
            const imageAttributes = imageItem.attributes || imageItem;
            
            // Garantir que a URL da imagem está correta
            if (imageAttributes.url) {
              imageAttributes.url = ensureAbsoluteUrl(imageAttributes.url);
              
              // Se houver formatos, garantir que as URLs estejam corretas
              if (imageAttributes.formats) {
                Object.keys(imageAttributes.formats).forEach(key => {
                  if (imageAttributes.formats[key]?.url) {
                    imageAttributes.formats[key].url = ensureAbsoluteUrl(imageAttributes.formats[key].url);
                  }
                });
              }
              
              imageData = imageAttributes;
            }
          }
        } 
        // Se a imagem tiver uma URL direta
        else if (footerData.image.url) {
          // Criar um objeto de imagem com a URL absoluta
          imageData = {
            ...footerData.image,
            url: ensureAbsoluteUrl(footerData.image.url)
          };
        } 
        // Se a imagem estiver em um formato não esperado, tentar extrair a URL de outras maneiras
        else {
          // Tentar extrair a URL de propriedades comuns
          const possibleUrlPaths = [
            'data.attributes.url',
            'data.url',
            'attributes.url',
            'data.0.url',
            'data.0.attributes.url'
          ];
          
          for (const path of possibleUrlPaths) {
            try {
              const url = path.split('.').reduce((obj, key) => {
                if (obj && typeof obj === 'object' && key in obj) {
                  return obj[key];
                }
                return undefined;
              }, footerData.image);
              
              if (url && typeof url === 'string') {
                imageData = {
                  url: ensureAbsoluteUrl(url),
                  alternativeText: footerData.image.alternativeText || 'Footer logo',
                  caption: footerData.image.caption || ''
                };
                break;
              }
            } catch (e) {
              // Ignorar erros e continuar para o próximo caminho
              continue;
            }
          }
        }
      } catch (error) {
        // Em caso de erro, imageData permanece null
      }
    }
    
    // Preparar o resultado final
    return {
      title1: footerData.title1 || '',
      title2: footerData.title2 || '',
      text1: footerData.text1 || '',
      text2: footerData.text2 || '',
      image: imageData
    };
    
  } catch (error) {
    // Retornar null em caso de erro para usar os valores padrão
    return null;
  }
}