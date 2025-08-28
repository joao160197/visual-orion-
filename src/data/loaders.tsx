export async function getHomePage() {
  return {
    data: {
      attributes: {
        title: 'Bem-vindo à Orion',
        description: 'Sua estrela-guia em automação industrial',
        blocks: [],
        about: {
          id: 1,
          title: 'Sobre Nós',
          about: 'Somos uma empresa focada em inovação e qualidade.',
          image: {
            data: {
              id: 1,
              attributes: {
                url: '/images/placeholder.svg',
                alternativeText: 'Sobre Nós',
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
                title: 'Fale Conosco',
                text: 'Entre em contato e descubra como nossas soluções podem agregar valor ao seu negócio com inovação, eficiência e confiabilidade.',
                link: '/contact',
                image: {
                  data: {
                    id: 2,
                    attributes: {
                      url: '/images/placeholder.svg',
                      alternativeText: 'Entre em contato',
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
      description:
        'O Orion Engineering Group nasceu da união de três consultores de engenharia experientes, movidos pelo propósito de aplicar conhecimento sólido, expertise e inovação na indústria de automação. Inspirados pela constelação de Órion — uma das formações mais marcantes do céu noturno — seguimos o mesmo princípio que guiou exploradores ao longo da história: ser um farol de confiança e direção para aqueles que enfrentam desafios complexos de engenharia.',
      mission: 'Missão',
      vision: 'Visão',
      values: 'Objetivos',
      altMission: 'Missão',
      altVision: 'Visão',
      altValues: 'Objetivos',
    },
    en: {
      title: 'Mission, Vision and Values',
      description:
        'KING Automation has a strong set of beliefs that guide all our actions. Over time we learned these values are among the most important things we have, and we understand it is part of our mission to share them with the world.',
      mission: 'Mission',
      vision: 'Vision',
      values: 'Values',
      altMission: 'Mission',
      altVision: 'Vision',
      altValues: 'Values',
    },
    es: {
      title: 'Misión, Visión y Valores',
      description:
        'KING Automation posee un sólido conjunto de creencias que guía todas nuestras acciones. Con el tiempo aprendimos que estos valores están entre lo más importante que tenemos y entendemos que es parte de nuestra misión compartirlos con el mundo.',
      mission: 'Misión',
      vision: 'Visión',
      values: 'Valores',
      altMission: 'Misión',
      altVision: 'Visión',
      altValues: 'Valores',
    },
  } as const;

  const t = dict[(locale as 'pt' | 'en' | 'es')] ?? dict.pt;

  return {
    title: t.title,
    description: t.description,
    blocks: [
      {
        id: 1,
        __component: 'blocks.info-block',
        headline: t.mission,
        content:
          '<p>Assim como Órion sempre foi símbolo de orientação, nossa visão é ser a estrela-guia na automação industrial, oferecendo soluções de engenharia de ponta que impulsionem inovação, eficiência e sustentabilidade.</p>',
        reversed: false,
        image: [
          { url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F1.jpeg?alt=media&token=02b21579-53b8-402e-bd80-608a84a5c356', alternativeText: t.altMission }
        ]
      },
      {
        id: 2,
        __component: 'blocks.info-block',
        headline: t.vision,
        content:
          '<p>Nossa missão é desenvolver soluções de automação industrial de classe mundial para o setor automotivo, aliando expertise técnica à busca incansável pela qualidade. Cada projeto é movido pela paixão pela excelência em engenharia, pelo compromisso com o sucesso de nossos clientes e pela determinação em antecipar o futuro</p>',
        reversed: true,
        image: [
          { url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F2.jpeg?alt=media&token=35977b43-d12b-4bd7-b474-8a5e8d879d9b', alternativeText: t.altVision }
        ]
      },
      {
        id: 3,
        __component: 'blocks.info-block',
        headline: t.values,
        content:
          '<p>Nosso objetivo é construir parcerias sólidas e duradouras, entregando soluções que não apenas respondam às necessidades atuais, mas que também abram caminho para os desafios e oportunidades de amanhã — iluminando o futuro da indústria automotiva e além.</p>',
        reversed: false,
        image: [
          { url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F3.jpeg?alt=media&token=f3074c51-4dab-4948-809e-e4875cdda143', alternativeText: t.altValues }
        ]
      }
    ]
  };
}