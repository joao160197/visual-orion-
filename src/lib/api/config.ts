export const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const apiToken = process.env.STRAPI_API_TOKEN;

if (!apiToken) {
  console.warn('⚠️ [Vercel Build] A variável de ambiente STRAPI_API_TOKEN não foi encontrada!');
} else {
  console.log('✅ [Vercel Build] A variável STRAPI_API_TOKEN foi carregada com sucesso.');
}

export const getApiConfig = () => {
  // ATENÇÃO: TOKEN HARDCODED APENAS PARA TESTE
  // SUBSTITUA PELA LINHA COMENTADA ABAIXO DEPOIS DO TESTE
  const apiToken = "fb34a9225a5f81763231a8b805b769e8de4182549d430505abf258c4c06590910cd4e2b90cafec785e2111257b85aa41e5889689796dea95bf46beb2a02a52dd803900c408271f14626d5eea955eba4c3444602bda3b6ead16c5e5f7da7df9bfa780e04ec9e732ed423d109a8988ed755f5b0514dd4a054ddbd5dd76957e6106";
  // const apiToken = process.env.STRAPI_API_TOKEN;

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
