import { fetchApi } from '@/lib/api/fetch';

interface MediaFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
  size: number;
}

interface Media {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail?: MediaFormat;
        small?: MediaFormat;
        medium?: MediaFormat;
        large?: MediaFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

// Interface para a página Automotive
export interface AutomotiveContent {
  data: {
    id: string;
    attributes: {
      titleAuto: string;
      textAuto: string;
      imageAuto: {
        data: {
          attributes: {
            url: string;
            alternativeText?: string;
            caption?: string;
            width: number;
            height: number;
            formats: {
              thumbnail?: MediaFormat;
              small?: MediaFormat;
              medium?: MediaFormat;
              large?: MediaFormat;
            };
          };
        } | null;
      };
      locale: string;
      localizations: {
        data: Array<{
          id: number;
          attributes: {
            locale: string;
          };
        }>;
      };
    };
  };
  meta?: any;
}

// Interface para a página Tratamento de Água
export interface WaterTreatmentContent {
  data: {
    id: string;
    attributes: {
      titleWater: string;
      textWater: string;
      imageWater: {
        data: {
          attributes: {
            url: string;
            alternativeText?: string;
            caption?: string;
            width: number;
            height: number;
            formats: {
              thumbnail?: MediaFormat;
              small?: MediaFormat;
              medium?: MediaFormat;
              large?: MediaFormat;
            };
          };
        } | null;
      };
      locale: string;
      localizations: {
        data: Array<{
          id: number;
          attributes: {
            locale: string;
          };
        }>;
      };
    };
  };
  meta?: any;
}

// Interface para a página Logístico
export interface LogisticContent {
  data: {
    id: string;
    attributes: {
      titleLogistic: string;
      textLogistic: string;
      imageLogistic: {
        data: {
          attributes: {
            url: string;
            alternativeText?: string;
            caption?: string;
            width: number;
            height: number;
            formats: {
              thumbnail?: MediaFormat;
              small?: MediaFormat;
              medium?: MediaFormat;
              large?: MediaFormat;
            };
          };
        } | null;
      };
      locale: string;
      localizations: {
        data: Array<{
          id: number;
          attributes: {
            locale: string;
          };
        }>;
      };
    };
  };
  meta?: any;
}

// Interface para a página Food
export interface FoodContent {
  data: {
    id: string;
    attributes: {
      titleFood: string;
      textFood: string;
      imageFood: {
        data: {
          attributes: {
            url: string;
            alternativeText?: string;
            caption?: string;
            width: number;
            height: number;
            formats: {
              thumbnail?: MediaFormat;
              small?: MediaFormat;
              medium?: MediaFormat;
              large?: MediaFormat;
            };
          };
        } | null;
      };
      locale: string;
      localizations: {
        data: Array<{
          id: number;
          attributes: {
            locale: string;
          };
        }>;
      };
    };
  };
  meta?: any;
}

// Função para buscar os dados da página Automotive
export async function getAutomotiveContent(locale: string = 'pt-BR'): Promise<AutomotiveContent> {
  try {
    const query = new URLSearchParams({
      'populate': '*',
      'locale': locale
    });

    const response = await fetchApi<AutomotiveContent>(`/api/automative-page?${query.toString()}`);
    
    if (!response?.data) {
      throw new Error('Dados não encontrados');
    }

    return response;
  } catch (error) {
    console.error('Erro ao buscar conteúdo do Strapi:', error);
    
    // Fallback em caso de erro
    return {
      data: {
        id: '1',
        attributes: {
          titleAuto: 'Setor Automotivo',
          textAuto: 'Atuamos no desenvolvimento de soluções voltadas para a automação de processos no setor automotivo, desde linhas de montagem até testes de qualidade. Com foco em eficiência e rastreabilidade, nossas tecnologias ajudam a otimizar tempo e reduzir falhas humanas em ambientes industriais altamente exigentes.',
          imageAuto: {
            data: null
          },
          locale: locale,
          localizations: {
            data: []
          }
        }
      },
      meta: {}
    };
  }
}

// Função para buscar os dados da página de Tratamento de Água
export async function getWaterTreatmentContent(locale: string = 'pt-BR'): Promise<WaterTreatmentContent> {
  try {
    const query = new URLSearchParams({
      'populate': '*',
      'locale': locale
    });

    const response = await fetchApi<WaterTreatmentContent>(`/api/tratamento-agua?${query.toString()}`);
    
    if (!response?.data) {
      throw new Error('Dados não encontrados');
    }

    return response;
  } catch (error) {
    console.error('Erro ao buscar conteúdo do Strapi:', error);
    
    // Fallback em caso de erro
    return {
      data: {
        id: '1',
        attributes: {
          titleWater: 'Tratamento de Água',
          textWater: 'Desenvolvemos sistemas para monitoramento, controle e automação de estações de tratamento de água e efluentes. Nossos equipamentos garantem a conformidade ambiental e o uso eficiente dos recursos hídricos, promovendo sustentabilidade com confiabilidade.',
          imageWater: {
            data: null
          },
          locale: locale,
          localizations: {
            data: []
          }
        }
      },
      meta: {}
    };
  }
}

// Função para buscar os dados da página Logístico
export async function getLogisticContent(locale: string = 'pt-BR'): Promise<LogisticContent> {
  try {
    const query = new URLSearchParams({
      'populate': '*',
      'locale': locale
    });

    const response = await fetchApi<LogisticContent>(`/api/logistico?${query.toString()}`);
    
    if (!response?.data) {
      throw new Error('Dados não encontrados');
    }

    return response;
  } catch (error) {
    console.error('Erro ao buscar conteúdo do Strapi:', error);
    
    // Fallback em caso de erro
    return {
      data: {
        id: '1',
        attributes: {
          titleLogistic: 'Soluções Logísticas',
          textLogistic: 'Nossas soluções logísticas integram tecnologia e automação para controle de estoque, movimentação de materiais e rastreabilidade. Atuamos com sistemas de identificação automática, sensores e painéis industriais para aumentar a visibilidade e agilidade da operação.',
          imageLogistic: {
            data: null
          },
          locale: locale,
          localizations: {
            data: []
          }
        }
      },
      meta: {}
    };
  }
}

// Função para buscar os dados da página Food
export async function getFoodContent(locale: string = 'pt-BR'): Promise<FoodContent> {
  try {
    const query = new URLSearchParams({
      'populate': '*',
      'locale': locale
    });

    const response = await fetchApi<FoodContent>(`/api/food?${query.toString()}`);
    
    if (!response?.data) {
      throw new Error('Dados não encontrados');
    }

    return response;
  } catch (error) {
    console.error('Erro ao buscar conteúdo do Prismic:', error);
    
    // Fallback em caso de erro
    return {
      data: {
        id: '1',
        attributes: {
          titleFood: 'Alimentos e Bebidas',
          textFood: 'Aqui você encontra uma seleção especial de alimentos e bebidas para todos os gostos. Nossa equipe está pronta para atender você com excelência e qualidade.',
          imageFood: {
            data: null
          },
          locale: locale,
          localizations: {
            data: []
          }
        }
      },
      meta: {}
    };
  }
}