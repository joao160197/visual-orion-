import { API_BASE_URL, API_CONFIG } from './config';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...API_CONFIG,
    ...options,
    next: { revalidate: 10 }, // Revalida a cada 10 segundos
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
