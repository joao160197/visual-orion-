import { API_BASE_URL, getApiConfig } from './config';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
    const config = getApiConfig();

  const mergedOptions: RequestInit = {
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options.headers,
    },
    next: { revalidate: 10 }, // Revalida a cada 10 segundos
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
