export function getStrapiUrl(path: string = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  console.log(`[getStrapiUrl] Recebido path: "${path}" (Tipo: ${typeof path})`);
  console.log(`[getStrapiUrl] Base URL: "${baseUrl}"`);
  // Remove trailing slash from baseUrl and leading slash from path to avoid double slashes
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  const fullUrl = `${cleanBaseUrl}/${cleanPath}`.replace(/\/$/, ''); // Remove trailing slash from final URL if path was empty
  console.log(`[getStrapiUrl] URL completa construída: "${fullUrl}"`);
  return fullUrl;
}
