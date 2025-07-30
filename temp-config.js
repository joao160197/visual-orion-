// Verifique se o servidor Strapi está rodando e acessível
const checkStrapi = async () => {
  const strapiUrl = 'http://localhost:1337';
  console.log(`Verificando se o Strapi está rodando em ${strapiUrl}...`);
  
  try {
    const response = await fetch(strapiUrl);
    console.log('Status do Strapi:', response.status, response.statusText);
    console.log('Headers:', [...response.headers.entries()]);
    
    // Verificar a rota de uploads
    const uploadsUrl = `${strapiUrl}/uploads`;
    console.log(`Verificando a rota de uploads em ${uploadsUrl}...`);
    
    const uploadsResponse = await fetch(uploadsUrl, { method: 'HEAD' });
    console.log('Status da rota de uploads:', uploadsResponse.status, uploadsResponse.statusText);
    
    // Verificar a rota da API de food
    const foodApiUrl = `${strapiUrl}/api/food`;
    console.log(`Verificando a rota da API de food em ${foodApiUrl}...`);
    
    const foodResponse = await fetch(foodApiUrl);
    console.log('Status da API de food:', foodResponse.status, foodResponse.statusText);
    
    if (foodResponse.ok) {
      const foodData = await foodResponse.json();
      console.log('Dados da API de food:', {
        hasImage: !!foodData?.data?.attributes?.imageFood,
        imageUrl: foodData?.data?.attributes?.imageFood?.data?.attributes?.url
      });
    }
    
  } catch (error) {
    console.error('Erro ao verificar o Strapi:', error);
  }
};

// Executar a verificação
checkStrapi().catch(console.error);
