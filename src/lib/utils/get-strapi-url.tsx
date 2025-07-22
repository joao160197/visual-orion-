// src/lib/utils/get-strapi-url.ts
export function getStrapiUrl(path: string = ""): string {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  
    // Log inicial para ver os parâmetros e a URL base do Strapi
    console.log(`[getStrapiUrl] Chamada com path: "${path}" (Tipo: ${typeof path})`);
    console.log(`[getStrapiUrl] Usando NEXT_PUBLIC_STRAPI_URL: "${strapiUrl}"`);
  
    if (typeof path !== 'string' || path.trim() === "") {
      console.warn("[getStrapiUrl] Path é inválido ou vazio. Retornando URL base do Strapi.");
      return strapiUrl; // Retorna a URL base se o path for inválido ou vazio
    }
  
    // Verifica se o path já é uma URL absoluta
    if (path.startsWith("http://") || path.startsWith("https://")) {
      console.log("[getStrapiUrl] Path já é uma URL absoluta. Retornando path diretamente:", path);
      return path;
    }
  
    // Verifica se a URL base do Strapi termina com '/' e se o path começa com '/'
    // para evitar barras duplicadas.
    const needsSlash = !strapiUrl.endsWith("/") && !path.startsWith("/");
    const endsWithSlash = strapiUrl.endsWith("/");
    const startsWithSlash = path.startsWith("/");
  
    let fullUrl;
    if (endsWithSlash && startsWithSlash) {
      // Ex: strapiUrl = "http://localhost:1337/", path = "/uploads/image.png"
      // Resultado: "http://localhost:1337uploads/image.png" (remove uma barra)
      fullUrl = strapiUrl + path.substring(1);
      console.log(`[getStrapiUrl] Ambas as strings têm barras adjacentes. Removendo uma. URL construída: ${fullUrl}`);
    } else if (!endsWithSlash && !startsWithSlash) {
      // Ex: strapiUrl = "http://localhost:1337", path = "uploads/image.png"
      // Resultado: "http://localhost:1337/uploads/image.png" (adiciona uma barra)
      fullUrl = `${strapiUrl}/${path}`;
      console.log(`[getStrapiUrl] Nenhuma das strings tem barra na junção. Adicionando uma. URL construída: ${fullUrl}`);
    } else {
      // Ex: strapiUrl = "http://localhost:1337/", path = "uploads/image.png" OU
      // Ex: strapiUrl = "http://localhost:1337", path = "/uploads/image.png"
      // Resultado: "http://localhost:1337/uploads/image.png" (junção direta)
      fullUrl = strapiUrl + path;
      console.log(`[getStrapiUrl] Uma das strings já tem a barra na junção. URL construída: ${fullUrl}`);
    }
    
    console.log(`[getStrapiUrl] URL final retornada: "${fullUrl}"`);
    return fullUrl;
  }