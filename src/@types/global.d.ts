// Ensure TypeScript recognizes the @/ path alias
declare module '@/lib/media' {
  export function getStrapiMedia(media: any): string | null;
}
