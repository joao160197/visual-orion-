
export function getStrapiURL(path: string = ''): string {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${path}`;
}
