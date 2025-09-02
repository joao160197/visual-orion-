// Todas as funções deste arquivo agora retornam conteúdo estático local.

// Dados mock para desenvolvimento quando o Strapi não estiver disponível (base PT)
const mockHomePageData = {
  data: {
    id: 1,
    attributes: {
      title: 'Bem-vindo à Orion',
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
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ffabrica.jpg?alt=media&token=577b0306-b171-49e0-bbb7-3080dfe119ff',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fpremium_photo-1682144748274-add3d8ed04ea.jpg?alt=media&token=50556bdb-12fc-4715-a3bd-9954e0797d47',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fgettyimages-1352428937.jpg?alt=media&token=f1ca0899-afb5-4aa3-a4ab-237c95c90de4',
            'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fequipamento-de-producao-automatizado-de-linha-de-producao-de-automoveis-modernos-loja-para-a-montagem-de-novos-carros-modernos-o-modo-de-montagem-do-carro-na-linha-de-montagem-na-fabrica_645730-596.avif?alt=media&token=5687acf2-4576-4d42-ba04-7cd7409307b0'
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
  // Localização PT/EN/ES para textos
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
      // Company Page
      companyTitle: 'Sobre Nós',
      companyDescription: 'Conheça mais sobre nossa empresa',
      // Global
      logoAlt: 'Orion',
      // Carousel
      carouselPrev: 'Slide anterior',
      carouselNext: 'Próximo slide',
      carouselGoTo: 'Ir para slide',
      // Placeholders
      placeholderAlt: 'Imagem ilustrativa',
      // Errors
      errorLoading: 'Erro ao carregar os dados',
      tryAgain: 'Tentar novamente',
      noData: 'Nenhum dado disponível',
      // Actions
      learnMore: 'Saiba mais',
      contactUs: 'Fale Conosco',
      // Sections
      ourSolutions: 'Nossas Soluções',
      ourServices: 'Nossos Serviços',
      ourPartners: 'Nossos Parceiros',
      // Contact
      address: 'Endereço',
      phone: 'Telefone',
      email: 'E-mail',
      workingHours: 'Horário de Atendimento',
      sendMessage: 'Enviar Mensagem'
    },
    en: {
      title: 'Welcome to Orion',
      description: 'Your guiding star in industrial automation',
      aboutTitle: 'About Us',
      aboutText: 'Since its foundation, Orion Engineering Group has been pioneering new paths in industrial automation, always guided by innovation and engineering excellence. Our commitment is to deliver solutions that transform processes and drive results, working side by side with companies and partners who believe in the power of technology to shape the future.',
      talkTitle: 'Contact Us',
      talkText: 'Get in touch to learn more about our solutions.',
      aboutAlt: 'About Us',
      talkAlt: 'Contact Us',
      // Company Page
      companyTitle: 'About Us',
      companyDescription: 'Learn more about our company',
      // Global
      logoAlt: 'Orion',
      // Carousel
      carouselPrev: 'Previous slide',
      carouselNext: 'Next slide',
      carouselGoTo: 'Go to slide',
      // Placeholders
      placeholderAlt: 'Illustrative image',
      // Errors
      errorLoading: 'Error loading data',
      tryAgain: 'Try again',
      noData: 'No data available',
      // Actions
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      // Sections
      ourSolutions: 'Our Solutions',
      ourServices: 'Our Services',
      ourPartners: 'Our Partners',
      // Contact
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      workingHours: 'Business Hours',
      sendMessage: 'Send Message'
    },
    es: {
      title: 'Bienvenido a Orion',
      description: 'Tu estrella guía en automatización industrial',
      aboutTitle: 'Sobre Nosotros',
      aboutText: 'Desde su fundación, Orion Engineering Group ha abierto nuevos caminos en el campo de la automatización industrial, siempre guiados por la innovación y la excelencia en ingeniería. Nuestro compromiso es ofrecer soluciones que transformen procesos e impulsen resultados, trabajando codo a codo con empresas y socios que creen en el poder de la tecnología para moldear el futuro.',
      talkTitle: 'Contáctenos',
      talkText: 'Póngase en contacto para conocer más sobre nuestras soluciones.',
      aboutAlt: 'Sobre Nosotros',
      talkAlt: 'Contáctenos',
      // Company Page
      companyTitle: 'Sobre Nosotros',
      companyDescription: 'Conozca más sobre nuestra empresa',
      // Global
      logoAlt: 'Orion',
      // Carousel
      carouselPrev: 'Diapositiva anterior',
      carouselNext: 'Siguiente diapositiva',
      carouselGoTo: 'Ir a la diapositiva',
      // Placeholders
      placeholderAlt: 'Imagen ilustrativa',
      // Errors
      errorLoading: 'Error al cargar los datos',
      tryAgain: 'Intentar de nuevo',
      noData: 'No hay datos disponibles',
      // Actions
      learnMore: 'Saber más',
      contactUs: 'Contáctenos',
      // Sections
      ourSolutions: 'Nuestras Soluciones',
      ourServices: 'Nuestros Servicios',
      ourPartners: 'Nuestros Socios',
      // Contact
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo electrónico',
      workingHours: 'Horario de atención',
      sendMessage: 'Enviar Mensaje'
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
  // Usa o dicionário de tradução existente
  const dict = {
    pt: {
      title: 'Sobre Nós',
      description: 'Conheça mais sobre nossa empresa',
    },
    en: {
      title: 'About Us',
      description: 'Learn more about our company',
    },
    es: {
      title: 'Sobre Nosotros',
      description: 'Conozca más sobre nuestra empresa',
    }
  };
  
  const t = dict[locale as keyof typeof dict] || dict.pt;
  
  return {
    data: {
      attributes: {
        title: t.title,
        description: t.description,
        blocks: [],
        locale: locale || 'pt'
      }
    }
  };
}

export async function getGlobalData(locale: string = 'pt') {
  // Logo configuration
  const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fid%20visual%20%20orion%20-%20logo%20varia%C3%A7%C3%A3o%2003.png?alt=media&token=b935408f-e43b-4c28-bc00-74572d7eb7e0';
  
  // Translation dictionary
  const dict = {
    pt: {
      logoAlt: 'Orion Logo',
      siteName: 'Orion',
    },
    en: {
      logoAlt: 'Orion Logo',
      siteName: 'Orion',
    },
    es: {
      logoAlt: 'Logo de Orion',
      siteName: 'Orion',
    }
  };
  
  const t = dict[locale as keyof typeof dict] || dict.pt;
  
  return {
    data: {
      Logo: {
        id: 1,
        url: logoUrl,
        alternativeText: t.logoAlt,
        name: 'orion-logo',
        width: 512,
        height: 512,
        formats: {
          thumbnail: {
            url: logoUrl,
            width: 156,
            height: 156
          },
          small: {
            url: logoUrl,
            width: 256,
            height: 256
          },
          medium: {
            url: logoUrl,
            width: 384,
            height: 384
          },
          large: {
            url: logoUrl,
            width: 512,
            height: 512
          }
        }
      },
      // Adiciona outras traduções globais que possam ser necessárias
      siteName: 'Orion',
      defaultSeo: {
        metaTitle: 'Orion Engineering',
        metaDescription: 'Soluções em automação industrial',
        shareImage: null
      }
    }
  } as const;
}
