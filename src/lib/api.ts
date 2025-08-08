import { getStrapiURL } from "@/lib/utils";

// Função genérica para fazer requisições para a API do Strapi
export async function fetchAPI<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  try {

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
    const url = getStrapiURL(path);
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
      // A configuração de cache foi removida para permitir que o Next.js
      // gerencie o cache durante o build estático.
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
export async function getFooter(): Promise<FooterAttributes | null> {
  try {
    const path = '/api/home-page?populate[footer][populate]=image';
    // O tipo genérico para fetchAPI deve ser os atributos que esperamos, não a resposta completa.
    const response = await fetchAPI<StrapiResponse<any>>(path);

    const footerData = response?.data?.footer;

    // Verifica se os dados do footer existem e se é um array com itens
    if (!footerData || !Array.isArray(footerData) || footerData.length === 0) {
      console.warn('Dados do footer não encontrados na resposta da API ou o formato está incorreto.');
      return null;
    }

    // Retorna o primeiro item do array de footer
    return footerData[0] as FooterAttributes;

  } catch (error) {
    console.error('Erro ao buscar dados do footer:', error);
    return null;
  }
}