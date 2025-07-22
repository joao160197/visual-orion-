import { getStrapiUrl } from '@/lib/utils/get-strapi-url';

export async function getHomePage() {
  try {
    const apiUrl = `${getStrapiUrl()}/api/home-page?populate=*`;
    console.log('Making request to:', apiUrl);
    const response = await fetch(apiUrl);
    console.log('Strapi response status:', response.status);
    if (!response.ok) throw new Error('Failed to fetch data from Strapi');
    const data = await response.json();
    console.log('Full response structure:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

export async function getCompanyPage(locale: string = 'pt') {
  try {
    const apiUrl = new URL(`${getStrapiUrl()}/api/company`);
    
    // Parâmetros de consulta otimizados
    const params = new URLSearchParams({
      'populate[blocks][populate]': '*',
      locale
    });
    
    console.log('Parâmetros da requisição:', params.toString());
    
    apiUrl.search = params.toString();
    
    console.log('=== FAZENDO REQUISIÇÃO PARA ===', apiUrl.toString());
    
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
      cache: 'no-store' // Desativa o cache para desenvolvimento
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries()),
        errorText
      });
      throw new Error(`Falha ao buscar dados da empresa: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('=== DADOS RECEBIDOS ===', JSON.stringify(responseData, null, 2));

    // Verifica se temos dados
    if (!responseData) {
      console.error('Resposta do servidor vazia:', responseData);
      throw new Error('Resposta do servidor vazia');
    }

    // Verifica se a resposta tem a estrutura de dados do Strapi v4
    const pageData = responseData.data || responseData;
    
    if (!pageData) {
      console.error('Dados da página não encontrados na resposta:', responseData);
      throw new Error('Dados da página não encontrados');
    }
    
    // Extrai os dados da resposta
    const { id, attributes } = pageData;
    
    // Se não houver attributes, assume que os dados estão no próprio objeto
    const pageAttributes = attributes || pageData;
    
    // Log detalhado dos atributos
    console.log('Atributos recebidos:', Object.keys(pageAttributes));
    
    // Verifica se existem blocos e formata corretamente
    // No Strapi v4, os blocos podem estar em attributes.blocks.data ou diretamente em blocks
    let blocks = [];
    
    if (pageAttributes.blocks?.data) {
      // Formato: { blocks: { data: [...] } }
      blocks = pageAttributes.blocks.data;
    } else if (Array.isArray(pageAttributes.blocks)) {
      // Formato: { blocks: [...] }
      blocks = pageAttributes.blocks;
    } else if (Array.isArray(pageData.blocks)) {
      // Formato alternativo: { blocks: [...] } no root
      blocks = pageData.blocks;
    }
    
    console.log('Blocos recebidos (estrutura completa):', JSON.stringify(blocks, null, 2));
    
    // Log do primeiro bloco (se existir) para debug
    if (blocks.length > 0) {
      console.log('Primeiro bloco (estrutura completa):', JSON.stringify(blocks[0], null, 2));
    }
    
    // Mapeia os blocos para o formato esperado
    const formattedBlocks = blocks.map((block: any) => {
      try {
        console.log('Processando bloco:', block.id, block.__component || block.attributes?.__component);
        
        // Se o bloco já tiver __component, é porque já está no formato correto
        if (block.__component) {
          console.log('Bloco já formatado:', JSON.stringify(block, null, 2));
          return block;
        }
        
        // Se não tiver attributes, usa o próprio bloco
        if (!block.attributes) {
          console.warn('Bloco sem atributos, usando dados brutos:', block);
          return block;
        }
        
        // Extrai os atributos do bloco
        const { id, attributes: blockAttrs } = block;
        
        // Cria o bloco formatado
        const formattedBlock = {
          id,
          ...blockAttrs
        };
        
        // Log detalhado de imagens, se houver
        if (blockAttrs.image?.data?.attributes) {
          console.log('Bloco com imagem encontrado:', {
            url: blockAttrs.image.data.attributes.url,
            formats: blockAttrs.image.data.attributes.formats ? Object.keys(blockAttrs.image.data.attributes.formats) : 'nenhum formato adicional'
          });
        }
        
        // Tratamento especial para blocos de info
        if (blockAttrs.__component === 'blocks.info-block') {
          const imageData = blockAttrs.Image?.data?.[0]?.attributes;
          if (imageData) {
            console.log('Bloco de info com imagem:', {
              url: imageData.url,
              formats: imageData.formats ? Object.keys(imageData.formats) : 'nenhum formato adicional'
            });
          }
        }
        
        console.log('Bloco formatado:', JSON.stringify(formattedBlock, null, 2));
        return formattedBlock;
      } catch (error) {
        console.error('Erro ao processar bloco:', error);
        console.error('Bloco com erro:', JSON.stringify(block, null, 2));
        return null;
      }
    }).filter(Boolean);
    
    // Prepara o resultado final
    const result = {
      id: id || pageData.id,
      ...(pageAttributes || {}),
      blocks: formattedBlocks
    };
    
    // Remove atributos desnecessários
    delete result.attributes;
    delete result.publishedAt;
    delete result.createdAt;
    delete result.updatedAt;
    delete result.locale;
    
    console.log('Dados formatados para retorno:', {
      id: result.id,
      title: result.title,
      description: result.description?.substring(0, 100) + '...',
      blocksCount: result.blocks?.length || 0,
      blocksTypes: result.blocks?.map((b: any) => b.__component).join(', ')
    });
    
    return result;
  } catch (error) {
    console.error('Erro ao buscar dados da empresa:', error);
    throw error;
  }
}