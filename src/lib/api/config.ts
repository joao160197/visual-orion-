export const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

// Log para verificar se a variável de ambiente está sendo lida no build da Vercel
const tokenForLog = process.env.STRAPI_BACKEND_TOKEN;
if (!tokenForLog) {
  console.warn('⚠️ [Vercel Build] A variável de ambiente STRAPI_BACKEND_TOKEN não foi encontrada!');
} else {
  console.log('✅ [Vercel Build] A variável STRAPI_BACKEND_TOKEN foi carregada com sucesso.');
}

export const getApiConfig = () => {
  const apiToken = process.env.STRAPI_BACKEND_TOKEN;

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (apiToken) {
    headers['Authorization'] = `Bearer ${apiToken}`;
  }

  return {
    headers,
  };
};