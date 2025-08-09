import { getStrapiUrl } from '@/lib/utils/get-strapi-url';

export async function getHomePage() {
  try {
    const apiUrl = `${getStrapiUrl()}/api/home-page?populate=*`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch data from Strapi');
    return await response.json();
  } catch (error) {
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
    
    apiUrl.search = params.toString();
    
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // Usa ISR para revalidação
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha ao buscar dados da empresa: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();

    // Verifica se temos dados
    if (!responseData) {
      throw new Error('Resposta do servidor vazia');
    }

    // Verifica se a resposta tem a estrutura de dados do Strapi v4
    const pageData = responseData.data || responseData;
    
    if (!pageData) {
      throw new Error('Dados da página não encontrados');
    }
    
    // Extrai os dados da resposta
    const { id, attributes } = pageData;
    
    // Se não houver attributes, assume que os dados estão no próprio objeto
    const pageAttributes = attributes || pageData;
    
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
    
    // Mapeia os blocos para o formato esperado
    const formattedBlocks = blocks.map((block: any) => {
      try {
        // Se o bloco já tiver __component, é porque já está no formato correto
        if (block.__component) {
          return block;
        }
        
        // Se não tiver attributes, usa o próprio bloco
        if (!block.attributes) {
          return block;
        }
        
        // Extrai os atributos do bloco
        const { id, attributes: blockAttrs } = block;
        
        // Cria o bloco formatado
        return {
          id,
          ...blockAttrs
        };
      } catch (error) {
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
    
    return result;
  } catch (error) {
    throw error;
  }
}