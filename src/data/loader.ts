// Todas as funções deste arquivo agora retornam conteúdo estático local.

// Dados mock para desenvolvimento quando o Strapi não estiver disponível (base PT)
const mockHomePageData = {
  data: {
    id: 1,
    attributes: {
      title: 'Bem-vindo à Visual Orion',
      description: 'Soluções inovadoras para o seu negócio',
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
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fboys-helping-climb-1024x628.jpg?alt=media&token=32921c92-51d8-4078-b310-f75652090a45',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fmenino-escada.jpg?alt=media&token=80c0f87b-8a2f-4712-ad42-7f5066ebfc60',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsunset-vista-homem-1024x683.jpg?alt=media&token=2b9723ea-4e87-4244-96bf-6a1407f5047f',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F1666636483967.jpg?alt=media&token=52739564-0141-4a1c-beb4-61aa17d5fee7'
          ]
        }
      ],
      about: {
        id: 1,
        title: 'Sobre Nós',
        about: 'Somos uma empresa focada em inovação e qualidade.',
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
                    url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F6225106_fc7fceac14.jpg?alt=media&token=a149cb6d-58b5-4297-a47d-f375614b8bf1',
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
      title: 'Bem-vindo à Visual Orion',
      description: 'Soluções inovadoras para o seu negócio',
      aboutTitle: 'Sobre Nós',
      aboutText: 'Somos uma empresa focada em inovação e qualidade.',
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
