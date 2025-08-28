// Todas as funções deste arquivo agora retornam conteúdo estático local.

// Dados mock para desenvolvimento quando o Strapi não estiver disponível (base PT)
const mockHomePageData = {
  data: {
    id: 1,
    attributes: {
      title: 'Bem-vindo à Visual Orion',
      description: 'Sua estrela-guia em automação industrial',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      publishedAt: '2023-01-01T00:00:00.000Z',
      locale: 'pt',
      blocks: [
        {
          id: 101,
          __component: 'blocks.carousel',
          order: 1,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2FWhatsApp%20Image%202025-08-27%20at%2013.42.24.jpeg?alt=media&token=5340adb0-ae4e-4ad0-88bf-248dcf1d7584',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2FWhatsApp%20Image%202025-08-27%20at%2013.42.37.jpeg?alt=media&token=cfd653ef-00ed-4c86-b866-9b461300cfd5',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2FWhatsApp%20Image%202025-08-27%20at%2013.42.57.jpeg?alt=media&token=77f69b80-5cfa-45c2-be29-c57b23a0b287',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2FWhatsApp%20Image%202025-08-27%20at%2013.43.03.jpeg?alt=media&token=cf87febc-1a9b-4d47-a941-1c40ef97407e'
          ]
        }
      ],
      about: {
        id: 1,
        title: 'Sobre Nós',
        about: 'Somos uma empresa focada em inovação e qualida.',
        image: {
          data: {
            id: 1,
            attributes: {
              name: 'placeholder.svg',
              alternativeText: 'Sobre Nós',
              caption: 'Sobre Nós',
              width: 800,
              height: 600,
              formats: {},
              hash: 'placeholder',
              ext: '.svg',
              mime: 'image/svg+xml',
              size: 1,
              url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fphoto_of_automobile_production_line_welding_car_body_modern_car_assembly_plant_auto_industry_9478a59c49.webp?alt=media&token=856c34a9-9cf3-4243-9d8d-7056870453de',
              previewUrl: null,
              provider: 'local',
              provider_metadata: null,
              createdAt: '2023-01-01T00:00:00.000Z',
              updatedAt: '2023-01-01T00:00:00.000Z'
            }
          }
        }
      },
      talktous: {
        data: [
          {
            id: 1,
            attributes: {
              title: 'Fale Conosco',
              text: 'Entre em contato para saber mais sobre nossas soluções.',
              link: '/contact',
              createdAt: '2023-01-01T00:00:00.000Z',
              updatedAt: '2023-01-01T00:00:00.000Z',
              publishedAt: '2023-01-01T00:00:00.000Z',
              locale: 'pt',
              image: {
                data: {
                  id: 2,
                  attributes: {
                    name: 'placeholder.svg',
                    alternativeText: 'Entre em contato',
                    caption: 'Entre em contato',
                    width: 1200,
                    height: 800,
                    formats: {},
                    hash: 'placeholder',
                    ext: '.svg',
                    mime: 'image/svg+xml',
                    size: 1,
                    url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftalktous.jpeg?alt=media&token=d34af89e-3f0b-47a2-b422-9a64a313295c',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2023-01-01T00:00:00.000Z',
                    updatedAt: '2023-01-01T00:00:00.000Z'
                  }
                }
              }
            }
          }
        ]
      }
    }
  },
  meta: {}
};

export async function getHomePage(locale: string) {
  // Localização simples PT/EN/ES para textos (mantém blocos e imagens)
  const dict = {
    pt: {
      title: 'Bem-vindo à Orion',
      description: 'Sua estrela-guia em automação industrial',
      aboutTitle: 'Sobre Nós',
      aboutText: 'Desde a sua fundação, a Orion Engineering Group tem trilhado novos caminhos na área de automação industrial, sempre guiada pela inovação e pela excelência em engenharia. Nosso compromisso é oferecer soluções que transformam processos e impulsionam resultados, atuando lado a lado com empresas e parceiros que acreditam no poder da tecnologia para moldar o futuro.',
      talkTitle: 'Fale Conosco',
      talkText: 'Entre em contato para saber mais sobre nossas soluções.',
      aboutAlt: 'Sobre Nós',
      talkAlt: 'Entre em contato',
    },
    en: {
      title: 'Welcome to Visual Orion',
      description: 'Innovative solutions for your business',
      aboutTitle: 'About Us',
      aboutText: 'We are a company focused on innovation and quality.',
      talkTitle: 'Talk to Us',
      talkText: 'Get in touch to learn more about our solutions.',
      aboutAlt: 'About Us',
      talkAlt: 'Get in touch',
    },
    es: {
      title: 'Bienvenido a Visual Orion',
      description: 'Soluciones innovadoras para su negocio',
      aboutTitle: 'Sobre Nosotros',
      aboutText: 'Somos una empresa enfocada en la innovación y la calidad.',
      talkTitle: 'Hable con Nosotros',
      talkText: 'Póngase en contacto para conocer más sobre nuestras soluciones.',
      aboutAlt: 'Sobre Nosotros',
      talkAlt: 'Hable con nosotros',
    },
  } as const;

  const t = dict[(locale as 'pt' | 'en' | 'es')] ?? dict.pt;

  // Clona e aplica traduções
  const data = JSON.parse(JSON.stringify(mockHomePageData));
  data.data.attributes.title = t.title;
  data.data.attributes.description = t.description;
  data.data.attributes.locale = locale || 'pt';

  // About
  data.data.attributes.about.title = t.aboutTitle;
  data.data.attributes.about.about = t.aboutText;
  if (data.data.attributes.about?.image?.data?.attributes) {
    data.data.attributes.about.image.data.attributes.alternativeText = t.aboutAlt;
    data.data.attributes.about.image.data.attributes.caption = t.aboutAlt;
  }

  // Talk to us (considera primeiro item)
  const talk = data.data.attributes.talktous?.data?.[0]?.attributes;
  if (talk) {
    talk.title = t.talkTitle;
    talk.text = t.talkText;
    talk.locale = locale || 'pt';
    if (talk?.image?.data?.attributes) {
      talk.image.data.attributes.alternativeText = t.talkAlt;
      talk.image.data.attributes.caption = t.talkAlt;
    }
  }

  return data;
}

/**
 * Busca os dados da página Company do Strapi
 * @param locale Código do idioma (ex: 'pt', 'en')
 * @returns Dados da página Company ou null em caso de erro
 */
export async function getCompanyPage(locale: string) {
  // Retorna estrutura mínima similar ao Strapi para compatibilidade, caso usada em algum lugar
  return {
    data: {
      attributes: {
        title: 'Sobre Nós',
        description: 'Conheça mais sobre nossa empresa',
        blocks: []
      }
    }
  };
}

export async function getGlobalData(locale: string) {
  // Retorna logo local simples para o Header
  return {
    data: {
      Logo: {
        id: 1,
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fid%20visual%20%20orion%20-%20logo%20varia%C3%A7%C3%A3o%2003.png?alt=media&token=b935408f-e43b-4c28-bc00-74572d7eb7e0',
        alternativeText: 'Visual Orion',
        width: 512,
        height: 512
      }
    }
  } as any;
}
