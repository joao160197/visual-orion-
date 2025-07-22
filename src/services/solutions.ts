import { fetchAPI } from '@/lib/utils/fetch-api';
import { SolutionsResponse } from '@/types/solutions';

export async function getSolutions(locale: string = 'pt'): Promise<SolutionsResponse> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = '/api/solutions';
  
  const urlParamsObject = {
    populate: '*',
    'pagination[pageSize]': '10',
    'sort': 'createdAt:desc',
    'locale': locale,
  };

  const queryString = new URLSearchParams(urlParamsObject as any).toString();
  const url = `${path}?${queryString}`;
  
  try {
    console.log(`[getSolutions] Buscando soluções de: ${url}`);
    
    const response = await fetchAPI(url, {
      method: 'GET',
      authToken: token,
      next: { revalidate: 60 },
    });
    
    if (!response.data) {
      console.warn('[getSolutions] Nenhum dado retornado da API');
      return { 
        data: [], 
        meta: { 
          pagination: { 
            page: 1, 
            pageSize: 10, 
            pageCount: 0, 
            total: 0 
          } 
        } 
      };
    }
    
    return response as SolutionsResponse;
  } catch (error) {
    console.error('[getSolutions] Erro ao buscar soluções:', error);
    // Retorna um array vazio em caso de erro para não quebrar a UI
    return { 
      data: [], 
      meta: { 
        pagination: { 
          page: 1, 
          pageSize: 10, 
          pageCount: 0, 
          total: 0 
        } 
      } 
    };
  }
}
