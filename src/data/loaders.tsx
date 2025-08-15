export async function getHomePage() {
  return {
    data: {
      attributes: {
        title: 'Bem-vindo à Visual Orion',
        description: 'Soluções inovadoras para o seu negócio',
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
                text: 'Entre em contato para saber mais sobre nossas soluções.',
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
      title: 'Missão, Visão e Valores',
      description:
        'A KING Automation tem um forte conjunto de crenças que orientam todas as nossas ações. Aprendemos ao longo do caminho que esses valores estão entre as coisas mais importantes que temos e entendemos que faz parte de nossa missão compartilhá-los com o mundo.',
      mission: 'Missão',
      vision: 'Visão',
      values: 'Valores',
      altMission: 'Missão',
      altVision: 'Visão',
      altValues: 'Valores',
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
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie suscipit sem, eu placerat tortor viverra ac. Sed nec odio magna. Integer lobortis, elit nec tristique pellentesque, justo diam bibendum turpis, sed feugiat felis massa at nunc. Fusce vel leo nisi. Nunc volutpat lorem magna.</p>',
        reversed: false,
        image: [
          { url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsunset-vista-homem-1024x683.jpg?alt=media&token=2b9723ea-4e87-4244-96bf-6a1407f5047f', alternativeText: t.altMission }
        ]
      },
      {
        id: 2,
        __component: 'blocks.info-block',
        headline: t.vision,
        content:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie suscipit sem, eu placerat tortor viverra ac. Sed nec odio magna. Integer lobortis, elit nec tristique pellentesque, justo diam bibendum turpis, sed feugiat felis massa at nunc. Fusce vel leo nisi. Nunc volutpat lorem magna.</p>',
        reversed: true,
        image: [
          { url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fmenino-escada.jpg?alt=media&token=80c0f87b-8a2f-4712-ad42-7f5066ebfc60', alternativeText: t.altVision }
        ]
      },
      {
        id: 3,
        __component: 'blocks.info-block',
        headline: t.values,
        content:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque molestie suscipit sem, eu placerat tortor viverra ac. Sed nec odio magna. Integer lobortis, elit nec tristique pellentesque, justo diam bibendum turpis, sed feugiat felis massa at nunc. Fusce vel leo nisi. Nunc volutpat lorem magna.</p>',
        reversed: false,
        image: [
          { url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2F1666636483967.jpg?alt=media&token=52739564-0141-4a1c-beb4-61aa17d5fee7', alternativeText: t.altValues }
        ]
      }
    ]
  };
}