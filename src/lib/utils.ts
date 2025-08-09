export function getStrapiURL(path = ""): string {
  const strapiUrl = process.env.STRAPI_URL;
  const nextPublicStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  console.log("--- DEBUGGING getStrapiURL ---");
  console.log(`process.env.NEXT_PUBLIC_STRAPI_URL: ${nextPublicStrapiUrl}`);
  console.log(`process.env.STRAPI_URL: ${strapiUrl}`);
  const finalUrl = nextPublicStrapiUrl || strapiUrl || "http://localhost:1337";
  console.log(`Final base URL selected: ${finalUrl}`);
  console.log("--- END DEBUGGING ---");

  return `${finalUrl}${path}`;
}
