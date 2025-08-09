export const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const apiToken = process.env.STRAPI_API_TOKEN;

if (!apiToken) {
  console.warn('⚠️ [Vercel Build] A variável de ambiente STRAPI_API_TOKEN não foi encontrada!');
} else {
  console.log('✅ [Vercel Build] A variável STRAPI_API_TOKEN foi carregada com sucesso.');
}

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  },
};
