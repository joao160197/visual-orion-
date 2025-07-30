// src/lib/utils/get-strapi-url.ts
export function getStrapiUrl(path: string = ""): string {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  
    if (typeof path !== 'string' || path.trim() === "") {
      return strapiUrl; // Retorna a URL base se o path for inválido ou vazio
    }
  
    // Verifica se o path já é uma URL absoluta
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
  
    // Verifica se a URL base do Strapi termina com '/' e se o path começa com '/'
    // para evitar barras duplicadas.
    const endsWithSlash = strapiUrl.endsWith("/");
    const startsWithSlash = path.startsWith("/");
  
    let fullUrl;
    if (endsWithSlash && startsWithSlash) {
      // Ex: strapiUrl = "http://localhost:1337/", path = "/uploads/image.png"
      // Resultado: "http://localhost:1337uploads/image.png" (remove uma barra)
      fullUrl = strapiUrl + path.substring(1);
    } else if (!endsWithSlash && !startsWithSlash) {
      // Ex: strapiUrl = "http://localhost:1337", path = "uploads/image.png"
      // Resultado: "http://localhost:1337/uploads/image.png" (adiciona uma barra)
      fullUrl = `${strapiUrl}/${path}`;
    } else {
      // Ex: strapiUrl = "http://localhost:1337/", path = "uploads/image.png" OU
      // Ex: strapiUrl = "http://localhost:1337", path = "/uploads/image.png"
      // Resultado: "http://localhost:1337/uploads/image.png" (junção direta)
      fullUrl = strapiUrl + path;
    }
    
    return fullUrl;
  }