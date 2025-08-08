import { fetchAPI } from '@/lib/utils/fetch-api';
import { SolutionsResponse } from '@/types/solutions';

export async function getSolutions(locale: string = 'pt'): Promise<SolutionsResponse> {
  // Retorna um array vazio para desativar a funcionalidade temporariamente
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
