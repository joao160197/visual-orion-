import { fetchAPI } from '@/lib/utils/fetch-api';
import { SolutionsResponse } from '@/types/solutions';

export async function getSolutions(locale: string = 'pt'): Promise<SolutionsResponse> {
  const urlParams = new URLSearchParams({
    populate: "deep",
    locale: locale,
  });

  const path = `/global?${urlParams.toString()}`;
  
  return await fetchAPI(path);
}
