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
    titleAuto: string;
    textAuto: string;
    imageAuto: {
      url: string;
      alternativeText: string | null;
    } | null;
    locale: string;
    localizations: {
      data: Array<{ id: number; locale: string; }>;
    };
  };
  meta?: any;
}

// Interface para a página Tratamento de Água
export interface WaterTreatmentContent {
  data: {
    id: string;
    titleWater: string;
    textWater: string;
    imageWater: {
      url: string;
      alternativeText: string | null;
    } | null;
    locale: string;
    localizations: {
      data: Array<{ id: number; locale: string; }>;
    };
  };
  meta?: any;
}

// Interface para a página Logístico
export interface LogisticContent {
  data: {
    id: string;
    titleLogistic: string;
    textLogistic: string;
    imageLogistic: {
      url: string;
      alternativeText: string | null;
    } | null;
    locale: string;
    localizations: {
      data: Array<{ id: number; locale: string; }>;
    };
  };
  meta?: any;
}

// Interface para a página Food
export interface FoodContent {
  data: {
    id: string;
    titleFood: string;
    textFood: string;
    imageFood: {
      id: number;
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail?: MediaFormat;
        small?: MediaFormat;
        medium?: MediaFormat;
        large?: MediaFormat;
      };
    } | null;
    locale: string;
    localizations: {
      data: Array<{
        id: number;
        locale: string;
      }>;
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

    const path = `/api/automative-page?${query.toString()}`;
    const data = await fetchApi<AutomotiveContent>(path, {
      next: { revalidate: 60 } // Adiciona revalidação para caching
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar conteúdo do Strapi:', error);
    
    // Fallback em caso de erro
    return {
      data: {
        id: '1',
        titleAuto: 'Setor Automotivo (Fallback)',
        textAuto: 'O conteúdo desta página não pôde ser carregado.',
        imageAuto: null,
        locale: locale,
        localizations: { data: [] }
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
        titleWater: 'Tratamento de Água (Fallback)',
        textWater: 'O conteúdo desta página não pôde ser carregado.',
        imageWater: null,
        locale: locale,
        localizations: { data: [] }
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
        titleLogistic: 'Soluções Logísticas (Fallback)',
        textLogistic: 'O conteúdo desta página não pôde ser carregado.',
        imageLogistic: null,
        locale: locale,
        localizations: { data: [] }
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
    
    // Validação robusta: verifica se os atributos existem
    if (!response?.data?.titleFood) { // Valida um campo essencial
      console.warn('Resposta da API para Food não contém titleFood:', response);
      throw new Error('Dados de Food não encontrados ou em formato inesperado.');
    }

    return response;
  } catch (error) {
    console.error('Erro ao buscar conteúdo de Food do Strapi:', error);
    
    // Fallback em caso de erro
    return {
      data: {
        id: '1',
        titleFood: 'Alimentos e Bebidas (Fallback)',
        textFood: 'O conteúdo desta página não pôde ser carregado. Por favor, tente novamente mais tarde.',
        imageFood: null,
        locale: locale,
        localizations: {
          data: []
        }
      },
      meta: {}
    };
  }
}