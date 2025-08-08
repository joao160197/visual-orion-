export function getStrapiURL(path = ""): string {
  const strapiUrl = process.env.STRAPI_URL;
  const nextPublicStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  console.log("--- DEBUGGING getStrapiURL ---");
  console.log("process.env.STRAPI_URL:", strapiUrl);
  console.log("process.env.NEXT_PUBLIC_STRAPI_URL:", nextPublicStrapiUrl);
  
  const baseUrl = strapiUrl || nextPublicStrapiUrl || "http://localhost:1337";
  
  console.log("Using base URL:", baseUrl);
  console.log("--- END DEBUGGING ---");

  return `${baseUrl}${path}`;
}
