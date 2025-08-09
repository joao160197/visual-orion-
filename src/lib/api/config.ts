export const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

// Log para verificar se a variável de ambiente está sendo lida no build da Vercel
const tokenForLog = process.env.STRAPI_BACKEND_TOKEN;
if (!tokenForLog) {
  console.warn('⚠️ [Vercel Build] A variável de ambiente STRAPI_BACKEND_TOKEN  não foi encontrada!');
} else {
  console.log(`✅ [Vercel Build] STRAPI_BACKEND_TOKEN carregada. Usando token que começa com '${tokenForLog.substring(0, 4)}' e termina com '${tokenForLog.substring(tokenForLog.length - 4)}'.`);
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