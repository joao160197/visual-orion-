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

export async function fetchAPI(path: string, options: FetchAPIOptions = { method: 'GET' }) {
  const { method = 'GET', authToken, body, next } = options;

  try {
    // Construir a URL completa usando getStrapiUrl
    const url = path.startsWith('http') ? path : getStrapiUrl(path);
    console.log(`[fetchAPI] Fazendo requisição para: ${url}`);
    
    // Configuração padrão do fetch
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
      next,
    };

    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[fetchAPI] Erro na requisição: ${response.status}`, {
        url,
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[fetchAPI] Erro ao processar requisição:', error);
    throw error;
  }
}