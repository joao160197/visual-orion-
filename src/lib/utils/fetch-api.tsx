import { getStrapiUrl } from './get-strapi-url';

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI<T = any>(path: string, options: FetchAPIOptions = { method: 'GET' }): Promise<T> {
  const { method = 'GET', authToken, body, next } = options;

  try {
    // Construir a URL completa usando getStrapiUrl
    const url = path.startsWith('http') ? path : getStrapiUrl(path);
    
    console.log('🔍 [fetchAPI] Fazendo requisição:', {
      method,
      url,
      hasBody: !!body,
      hasAuth: !!authToken
    });
    
    // Configuração padrão do fetch
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
      next,
      cache: 'no-store', // Desativa o cache para garantir que sempre pegue os dados mais recentes
    };

    const startTime = Date.now();
    const response = await fetch(url, requestOptions);
    const responseTime = Date.now() - startTime;
    
    console.log(`⏱️ [fetchAPI] Resposta recebida em ${responseTime}ms:`, {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    const responseData = await response.json().catch(async (parseError) => {
      console.error('❌ [fetchAPI] Erro ao fazer parse da resposta JSON:', parseError);
      const textResponse = await response.text();
      console.log('📄 [fetchAPI] Conteúdo da resposta (texto):', textResponse);
      return { error: 'Failed to parse JSON', text: textResponse };
    });
    
    if (!response.ok) {
      console.error('❌ [fetchAPI] Erro na resposta da API:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        responseData
      });
      
      const error = new Error(`Erro na requisição: ${response.status} ${response.statusText}`) as any;
      error.status = response.status;
      error.response = responseData;
      throw error;
    }
    
    console.log('✅ [fetchAPI] Requisição concluída com sucesso');
    return responseData;
  } catch (error) {
    console.error('❌ [fetchAPI] Erro durante a requisição:', error);
    throw error;
  }
}