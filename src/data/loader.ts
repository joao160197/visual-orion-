import qs from "qs";
import { fetchAPI } from "@/lib/utils/fetch-api";
import { getStrapiUrl } from "@/lib/utils/get-strapi-url";

// Dados mock para desenvolvimento quando o Strapi não estiver disponível
const mockHomePageData = {
  data: {
    id: 1,
    attributes: {
      title: 'Bem-vindo à Visual Orion',
      description: 'Soluções inovadoras para o seu negócio',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      publishedAt: '2023-01-01T00:00:00.000Z',
      locale: 'pt',
      blocks: [],
      about: {
        id: 1,
        title: 'Sobre Nós',
        about: 'Somos uma empresa focada em inovação e qualidade.',
        image: {
          data: {
            id: 1,
            attributes: {
              name: 'about-us.jpg',
              alternativeText: 'Sobre Nós',
              caption: 'Sobre Nós',
              width: 800,
              height: 600,
              formats: {
                thumbnail: {
                  name: 'thumbnail_about-us.jpg',
                  hash: 'thumbnail_about_us',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  path: null,
                  width: 245,
                  height: 184,
                  size: 12.4,
                  url: '/uploads/thumbnail_about_us_12345.jpg'
                },
                small: {
                  name: 'small_about-us.jpg',
                  hash: 'small_about_us',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  path: null,
                  width: 500,
                  height: 375,
                  size: 25.1,
                  url: '/uploads/small_about_us_12345.jpg'
                }
              },
              hash: 'about_us_12345',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 45.6,
              url: '/uploads/about_us_12345.jpg',
              previewUrl: null,
              provider: 'local',
              provider_metadata: null,
              createdAt: '2023-01-01T00:00:00.000Z',
              updatedAt: '2023-01-01T00:00:00.000Z'
            }
          }
        }
      },
      talktous: {
        data: [
          {
            id: 1,
            attributes: {
              title: 'Fale Conosco',
              text: 'Entre em contato para saber mais sobre nossas soluções.',
              link: '/contato',
              createdAt: '2023-01-01T00:00:00.000Z',
              updatedAt: '2023-01-01T00:00:00.000Z',
              publishedAt: '2023-01-01T00:00:00.000Z',
              locale: 'pt',
              image: {
                data: {
                  id: 2,
                  attributes: {
                    name: 'contact-us.jpg',
                    alternativeText: 'Entre em contato',
                    caption: 'Entre em contato',
                    width: 1200,
                    height: 800,
                    formats: {
                      thumbnail: {
                        name: 'thumbnail_contact-us.jpg',
                        hash: 'thumbnail_contact_us',
                        ext: '.jpg',
                        mime: 'image/jpeg',
                        path: null,
                        width: 245,
                        height: 163,
                        size: 10.2,
                        url: '/uploads/thumbnail_contact_us_12345.jpg'
                      },
                      small: {
                        name: 'small_contact-us.jpg',
                        hash: 'small_contact_us',
                        ext: '.jpg',
                        mime: 'image/jpeg',
                        path: null,
                        width: 500,
                        height: 333,
                        size: 20.5,
                        url: '/uploads/small_contact_us_12345.jpg'
                      },
                      medium: {
                        name: 'medium_contact-us.jpg',
                        hash: 'medium_contact_us',
                        ext: '.jpg',
                        mime: 'image/jpeg',
                        path: null,
                        width: 750,
                        height: 500,
                        size: 35.8,
                        url: '/uploads/medium_contact_us_12345.jpg'
                      }
                    },
                    hash: 'contact_us_12345',
                    ext: '.jpg',
                    mime: 'image/jpeg',
                    size: 68.9,
                    url: '/uploads/contact_us_12345.jpg',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2023-01-01T00:00:00.000Z',
                    updatedAt: '2023-01-01T00:00:00.000Z'
                  }
                }
              }
            }
          }
        ]
      }
    }
  },
  meta: {}
};

export async function getHomePage(locale: string) {
  try {
    const query = qs.stringify({
      locale,
      populate: {
        blocks: { populate: "*" },
        about: { populate: "*" },
        talktous: { populate: "*" }
      }
    });
    
    console.log(`[getHomePage] Buscando dados da home page para locale: ${locale}`);
    const response = await fetchAPI(`/api/home-page?${query}`, { 
      method: 'GET',
      next: { revalidate: 60 } 
    });
    
    if (!response || !response.data) {
      console.error('[getHomePage] Dados inválidos recebidos da API');
      return null;
    }
    
    console.log('[getHomePage] Dados da home page carregados com sucesso');
    return response;
  } catch (error) {
    console.error('[getHomePage] Erro ao buscar dados da home page:', error);
    return null;
  }
}

/**
 * Busca os dados da página Company do Strapi
 * @param locale Código do idioma (ex: 'pt', 'en')
 * @returns Dados da página Company ou null em caso de erro
 */
export async function getCompanyPage(locale: string) {
  console.log(`[getCompanyPage] Iniciando busca de dados para locale: ${locale}`);
  try {
    // Configura a query para buscar os dados da página Company
    const query = qs.stringify({
      locale,
      populate: {
        // Popula os blocos dinâmicos
        blocks: {
          populate: {
            // Para blocos de imagem (info-block)
            image: {
              populate: {
                data: {
                  populate: {
                    attributes: {
                      populate: ['url', 'alternativeText', 'formats', 'width', 'height']
                    }
                  }
                }
              }
            },
            // Para blocos de carrossel
            images: {
              populate: {
                data: {
                  populate: {
                    attributes: {
                      populate: ['url', 'alternativeText', 'formats', 'width', 'height']
                    }
                  }
                }
              }
            },
            // Campos comuns a vários tipos de blocos
            Image: {
              populate: {
                data: {
                  populate: {
                    attributes: {
                      populate: ['url', 'alternativeText', 'formats', 'width', 'height']
                    }
                  }
                }
              }
            },
            // Para o bloco de sobre (about-section)
            aboutImage: {
              populate: {
                data: {
                  populate: {
                    attributes: {
                      populate: ['url', 'alternativeText', 'formats', 'width', 'height']
                    }
                  }
                }
              }
            },
            // Campos de conteúdo rico
            content: true,
            description: true,
            body: true
          }
        },
        // SEO e metadados
        seo: {
          populate: ['metaTitle', 'metaDescription', 'metaImage', 'metaSocial', 'keywords']
        },
        // Imagem de capa
        coverImage: {
          populate: ['url', 'alternativeText', 'formats', 'width', 'height']
        }
      }
    }, {
      encodeValuesOnly: true // Importante para o Strapi v4+
    });
    
    console.log('Query completa:', query);
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/company?${query}`;
    console.log('URL da API:', apiUrl);
    
    // Faz a requisição para a API do Strapi
    const response = await fetch(apiUrl, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`
      },
      next: { revalidate: 60 } // Revalida a cada 60 segundos
    });
    
    if (!response.ok) {
      throw new Error(`Erro na resposta da API: ${response.status} ${response.statusText}`);
    }
    
    const responseData = await response.json();
    
    // Log detalhado da resposta da API
    console.log('[getCompanyPage] Resposta bruta da API:', JSON.stringify(responseData, null, 2));
    
    if (!responseData || !responseData.data) {
      console.error('[getCompanyPage] Dados inválidos recebidos da API');
      return {
        data: {
          attributes: {
            title: 'Sobre Nós',
            description: 'Conheça mais sobre nossa empresa',
            blocks: []
          }
        }
      };
    }
    
    // Processa os blocos para garantir a estrutura correta
    if (responseData.data.attributes?.blocks?.data) {
      const blocks = responseData.data.attributes.blocks.data.map((block: any) => ({
        id: block.id,
        ...block.attributes
      }));
      
      responseData.data.attributes.blocks = blocks;
    }
    
    console.log('[getCompanyPage] Dados processados com sucesso');
    return responseData;
  } catch (error) {
    console.error('Erro ao buscar dados da página Company:', error);
    return null;
  }
}

export async function getGlobalData(locale: string) {
  console.log(`[getGlobalData] Iniciando busca de dados globais para locale: ${locale}`);
  try {
    const query = qs.stringify({
      locale: locale,
      populate: {
        Logo: {
          populate: '*' // Popula todos os campos da mídia
        }
      }
    }, {
      encodeValuesOnly: true // Importante para o Strapi v4+
    });
    
    console.log(`[getGlobalData] Query: ${query}`);
    
    const response = await fetchAPI(`/api/global?${query}`, {
      method: 'GET',
      next: { revalidate: 60 }
    });
    
    console.log('[getGlobalData] Dados globais carregados com sucesso');
    
    // Verifica se há dados e formata o logo corretamente
    if (response && response.data) {
      const logoData = response.data.attributes?.Logo?.data?.attributes;
      
      // Se encontrou o logo, formata os dados para o formato esperado pelo componente
      if (logoData) {
        const formattedLogo = {
          id: response.data.attributes.Logo.data.id,
          url: logoData.url,
          alternativeText: logoData.alternativeText || 'Logo',
          width: logoData.width,
          height: logoData.height,
          formats: logoData.formats
        };
        
        // Atualiza o objeto de resposta com o logo formatado
        response.data.attributes.Logo = formattedLogo;
        
        console.log('[getGlobalData] Logo formatado:', formattedLogo);
      } else {
        console.warn('[getGlobalData] Nenhum dado de logo encontrado na resposta');
      }
    }
    
    return response;
  } catch (error) {
    console.error(
      `[loader.ts - getGlobalData] Erro em getGlobalData para locale ${locale}:`,
      error // O erro já deve vir formatado de fetchAPI
    );
    throw error; 
  }
}

