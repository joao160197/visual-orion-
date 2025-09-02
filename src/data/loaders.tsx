export async function getHomePage(locale: string = 'pt') {
  // Dicionário de traduções para a página inicial
  const dict = {
    pt: {
      title: 'Bem-vindo à Orion',
      description: 'Sua estrela-guia em automação industrial',
      aboutTitle: 'Sobre Nós',
      aboutText: 'Somos uma empresa focada em inovação e qualidade.',
      talkTitle: 'Fale Conosco',
      talkText: 'Entre em contato e descubra como nossas soluções podem agregar valor ao seu negócio com inovação, eficiência e confiabilidade.',
      aboutAlt: 'Sobre Nós',
      talkAlt: 'Entre em contato',
      // Seções adicionais
      ourServices: 'Nossos Serviços',
      ourSolutions: 'Nossas Soluções',
      contactUs: 'Fale Conosco',
      learnMore: 'Saiba Mais',
      // Erros
      errorLoading: 'Erro ao carregar os dados',
      tryAgain: 'Tentar novamente',
      noData: 'Nenhum dado disponível'
    },
    en: {
      title: 'Welcome to Orion',
      description: 'Your guiding star in industrial automation',
      aboutTitle: 'About Us',
      aboutText: 'We are a company focused on innovation and quality.',
      talkTitle: 'Contact Us',
      talkText: 'Get in touch and discover how our solutions can add value to your business with innovation, efficiency, and reliability.',
      aboutAlt: 'About Us',
      talkAlt: 'Contact Us',
      // Additional sections
      ourServices: 'Our Services',
      ourSolutions: 'Our Solutions',
      contactUs: 'Contact Us',
      learnMore: 'Learn More',
      // Errors
      errorLoading: 'Error loading data',
      tryAgain: 'Try again',
      noData: 'No data available'
    },
    es: {
      title: 'Bienvenido a Orion',
      description: 'Tu estrella guía en automatización industrial',
      aboutTitle: 'Sobre Nosotros',
      aboutText: 'Somos una empresa enfocada en innovación y calidad.',
      talkTitle: 'Contáctenos',
      talkText: 'Póngase en contacto y descubra cómo nuestras soluciones pueden agregar valor a su negocio con innovación, eficiencia y confiabilidad.',
      aboutAlt: 'Sobre Nosotros',
      talkAlt: 'Contáctenos',
      // Secciones adicionales
      ourServices: 'Nuestros Servicios',
      ourSolutions: 'Nuestras Soluciones',
      contactUs: 'Contáctenos',
      learnMore: 'Saber Más',
      // Errores
      errorLoading: 'Error al cargar los datos',
      tryAgain: 'Intentar de nuevo',
      noData: 'No hay datos disponibles'
    }
  } as const;

  const t = dict[locale as keyof typeof dict] || dict.pt;

  return {
    data: {
      attributes: {
        title: t.title,
        description: t.description,
        blocks: [],
        about: {
          id: 1,
          title: t.aboutTitle,
          about: t.aboutText,
          image: {
            data: {
              id: 1,
              attributes: {
                url: '/images/placeholder.svg',
                alternativeText: t.aboutAlt,
                width: 800,
                height: 600,
                formats: {}
              }
            }
          }
        },
        talktous: {
          data: [
            {
              id: 1,
              attributes: {
                title: t.talkTitle,
                text: t.talkText,
                link: '/contact',
                image: {
                  data: {
                    id: 2,
                    attributes: {
                      url: '/images/placeholder.svg',
                      alternativeText: t.talkAlt,
                      width: 1200,
                      height: 800,
                      formats: {}
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  };
}

export async function getCompanyPage(locale: string = 'pt') {
  const dict = {
    pt: {
      title: 'Nossa História',
      description: 'O Orion Engineering Group nasceu da união de três consultores de engenharia experientes, movidos pelo propósito de aplicar conhecimento sólido, expertise e inovação na indústria de automação. Inspirados pela constelação de Órion — uma das formações mais marcantes do céu noturno — seguimos o mesmo princípio que guiou exploradores ao longo da história: ser um farol de confiança e direção para aqueles que enfrentam desafios complexos de engenharia.',
      mission: 'Missão',
      vision: 'Visão',
      values: 'Objetivos',
      altMission: 'Missão',
      altVision: 'Visão',
      altValues: 'Objetivos',
      missionContent: 'Assim como Órion sempre foi símbolo de orientação, nossa visão é ser a estrela-guia na automação industrial, oferecendo soluções de engenharia de ponta que impulsionem inovação, eficiência e sustentabilidade.',
      visionContent: 'Nossa missão é desenvolver soluções de automação industrial de classe mundial para o setor automotivo, aliando expertise técnica à busca incansável pela qualidade. Cada projeto é movido pela paixão pela excelência em engenharia, pelo compromisso com o sucesso de nossos clientes e pela determinação em antecipar o futuro.',
      valuesContent: 'Nosso objetivo é construir parcerias sólidas e duradouras, entregando soluções que não apenas respondam às necessidades atuais, mas que também abram caminho para os desafios e oportunidades de amanhã — iluminando o futuro da indústria automotiva e além.'
    },
    en: {
      title: 'Our Story',
      description: 'Orion Engineering Group was born from the union of three experienced engineering consultants, driven by the purpose of applying solid knowledge, expertise, and innovation in the automation industry. Inspired by the Orion constellation — one of the most striking formations in the night sky — we follow the same principle that has guided explorers throughout history: to be a beacon of trust and direction for those facing complex engineering challenges.',
      mission: 'Mission',
      vision: 'Vision',
      values: 'Values',
      altMission: 'Mission',
      altVision: 'Vision',
      altValues: 'Values',
      missionContent: 'Just as Orion has always been a symbol of guidance, our vision is to be the guiding star in industrial automation, offering cutting-edge engineering solutions that drive innovation, efficiency, and sustainability.',
      visionContent: 'Our mission is to develop world-class industrial automation solutions for the automotive sector, combining technical expertise with an unwavering pursuit of quality. Each project is driven by a passion for engineering excellence, a commitment to our clients\' success, and the determination to anticipate the future.',
      valuesContent: 'Our goal is to build strong and lasting partnerships, delivering solutions that not only meet current needs but also pave the way for tomorrow\'s challenges and opportunities — illuminating the future of the automotive industry and beyond.'
    },
    es: {
      title: 'Nuestra Historia',
      description: 'Orion Engineering Group nació de la unión de tres consultores de ingeniería experimentados, impulsados por el propósito de aplicar conocimientos sólidos, experiencia e innovación en la industria de la automatización. Inspirados por la constelación de Orión —una de las formaciones más llamativas del cielo nocturno— seguimos el mismo principio que ha guiado a los exploradores a lo largo de la historia: ser un faro de confianza y dirección para quienes enfrentan desafíos de ingeniería complejos.',
      mission: 'Misión',
      vision: 'Visión',
      values: 'Valores',
      altMission: 'Misión',
      altVision: 'Visión',
      altValues: 'Valores',
      missionContent: 'Así como Orión siempre ha sido un símbolo de orientación, nuestra visión es ser la estrella guía en la automatización industrial, ofreciendo soluciones de ingeniería de vanguardia que impulsen la innovación, la eficiencia y la sostenibilidad.',
      visionContent: 'Nuestra misión es desarrollar soluciones de automatización industrial de clase mundial para el sector automotriz, combinando experiencia técnica con una búsqueda incansable de la calidad. Cada proyecto está impulsado por la pasión por la excelencia en ingeniería, el compromiso con el éxito de nuestros clientes y la determinación de anticipar el futuro.',
      valuesContent: 'Nuestro objetivo es construir asociaciones sólidas y duraderas, ofreciendo soluciones que no solo respondan a las necesidades actuales, sino que también abran el camino a los desafíos y oportunidades del mañana, iluminando el futuro de la industria automotriz y más allá.'
    }
  } as const;

  const t = dict[locale as keyof typeof dict] || dict.pt;

  return {
    title: t.title,
    description: t.description,
    blocks: [
      {
        id: 1,
        __component: 'blocks.info-block',
        headline: t.mission,
        content: `<p>${t.missionContent}</p>`,
        reversed: false,
        image: [
          { 
            url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F1.jpeg?alt=media&token=02b21579-53b8-402e-bd80-608a84a5c356', 
            alternativeText: t.altMission 
          }
        ]
      },
      {
        id: 2,
        __component: 'blocks.info-block',
        headline: t.vision,
        content: `<p>${t.visionContent}</p>`,
        reversed: true,
        image: [
          { 
            url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F2.jpeg?alt=media&token=35977b43-d12b-4bd7-b474-8a5e8d879d9b', 
            alternativeText: t.altVision 
          }
        ]
      },
      {
        id: 3,
        __component: 'blocks.info-block',
        headline: t.values,
        content: `<p>${t.valuesContent}</p>`,
        reversed: false,
        image: [
          { 
            url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F3.jpeg?alt=media&token=f3074c51-4dab-4948-809e-e4875cdda143', 
            alternativeText: t.altValues 
          }
        ]
      }
    ]
  };
}