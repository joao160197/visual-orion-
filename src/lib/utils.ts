export function getStrapiURL(path = ""): string {
  const strapiUrl = process.env.STRAPI_URL;
  const nextPublicStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  console.log("--- DEBUGGING getStrapiURL ---");
  console.log("--- END DEBUGGING ---");

  return `${nextPublicStrapiUrl || strapiUrl || "http://localhost:1337"}${path}`;
}
