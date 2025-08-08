import { fetchAPI } from '@/lib/utils/fetch-api';
import { SolutionsResponse } from '@/types/solutions';

export async function getSolutions(locale: string = 'pt'): Promise<SolutionsResponse> {
  // Retornando dados vazios para desativar temporariamente a feature
  return Promise.resolve({ data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } });
}
