export function getStrapiUrl(path: string = ""): string {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    
    // Se o path estiver vazio, retorna apenas a URL base
    if (!path) {
      return baseUrl;
    }
    
    // Se o path já for uma URL completa, retorna diretamente
    if (path.startsWith('http')) {
      return path;
    }
    
    // Remove barras iniciais e finais desnecessárias
    const cleanBaseUrl = baseUrl.replace(/\/+$/, ''); // Remove barras no final
    const cleanPath = path.replace(/^\/+/, ''); // Remove barras no início
    
    // Constrói a URL final
    return `${cleanBaseUrl}/${cleanPath}`;
    
  } catch (error) {
    // Em caso de erro, retorna uma URL padrão para evitar quebras
    return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  }
}
