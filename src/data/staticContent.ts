// Conteúdo estático por locale para remover dependência do Strapi
export type Locale = 'pt' | 'en' | 'es' | 'pt-BR' | 'es-AR';

export const staticCompany = {
  pt: {
    title: 'Visual Orion',
    description: 'Soluções inovadoras para o seu negócio',
    blocks: [],
    about: {
      title: 'Mais sobre nós',
      about:
        'Atuamos no desenvolvimento de soluções voltadas para automação e tecnologia, com foco em eficiência e confiabilidade.',
      image: {
        data: {
          id: 1,
          attributes: {
            url: '/images/food-banner.jpg',
            alternativeText: 'Sobre nós',
            width: 1200,
            height: 800,
            formats: {},
          },
        },
      },
    },
    talktous: [
      {
        title: 'Fale Conosco',
        text:
          'Se sua empresa pode se beneficiar de processos mais rápidos, fale com a gente e saiba o que a automação pode fazer por você.',
        link: '/contato',
        image: {
          data: {
            id: 2,
            attributes: {
              url: '/images/placeholder.svg',
              alternativeText: 'Fale Conosco',
              width: 800,
              height: 533,
              formats: {},
            },
          },
        },
      },
    ],
  },
} as const;

export const staticSolutionsPages = {
  pt: {
    automotive: {
      titleAuto: 'Setor Automotivo',
      textAuto:
        'Atuamos no desenvolvimento de soluções voltadas para automação de processos no setor automotivo, desde linhas de montagem até testes de qualidade. Nossas tecnologias ajudam a otimizar tempo e reduzir falhas humanas em ambientes industriais exigentes.',
      imageAuto: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fevoluc%CC%A7a%CC%83o-linha-de-montagem-de-veiculos.png?alt=media&token=aff65fc1-4f66-4d68-baf9-e0833c5bad7b',
        alternativeText: 'Linha de montagem de veículos',
      },
      locale: 'pt',
      localizations: { data: [] },
    },
    water: {
      titleWater: 'Tratamento de Água',
      textWater:
        'Soluções para tratamento, monitoramento e automação de processos hídricos, garantindo qualidade, rastreabilidade e eficiência operacional.',
      imageWater: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftratamento-de-agua.jpg?alt=media&token=e1e5b2bc-69f6-4386-937d-b01882bf274c',
        alternativeText: 'Estação de tratamento de água industrial',
      },
      locale: 'pt',
      localizations: { data: [] },
    },
    logistic: {
      titleLogistic: 'Soluções Logísticas',
      textLogistic:
        'Integramos tecnologia e automação para controle de estoque, movimentação de materiais e rastreabilidade, aumentando a visibilidade e a agilidade da operação.',
      imageLogistic: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsolucoes-logisticas-para-empresas.jpg?alt=media&token=8ea94167-fb0e-4aeb-883a-4a1287c18ecc',
        alternativeText: 'Centro de distribuição e movimentação de materiais',
      },
      locale: 'pt',
      localizations: { data: [] },
    },
    food: {
      titleFood: 'Alimentos e Bebidas',
      textFood:
        'Automação e controle para processos de alimentos e bebidas, com foco em segurança, qualidade e produtividade.',
      imageFood: {
        id: 3,
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Findustria-alimentos-e-bebidas.jpg?alt=media&token=a1e12721-7d63-49d6-b479-68c5e719dadc',
        alternativeText: 'Indústria de alimentos e bebidas',
        width: 1200,
        height: 800,
        formats: {},
      },
      locale: 'pt',
      localizations: { data: [] },
    },
  },
  en: {
    automotive: {
      titleAuto: 'Automotive Sector',
      textAuto:
        'We develop automation solutions for the automotive sector, from assembly lines to quality tests. Our technologies help optimize time and reduce human errors in demanding industrial environments.',
      imageAuto: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fevoluc%CC%A7a%CC%83o-linha-de-montagem-de-veiculos.png?alt=media&token=aff65fc1-4f66-4d68-baf9-e0833c5bad7b',
        alternativeText: 'Vehicle assembly line',
      },
      locale: 'en',
      localizations: { data: [] },
    },
    water: {
      titleWater: 'Water Treatment',
      textWater:
        'Solutions for treatment, monitoring, and automation of water processes, ensuring quality, traceability, and operational efficiency.',
      imageWater: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftratamento-de-agua.jpg?alt=media&token=e1e5b2bc-69f6-4386-937d-b01882bf274c',
        alternativeText: 'Industrial water treatment plant',
      },
      locale: 'en',
      localizations: { data: [] },
    },
    logistic: {
      titleLogistic: 'Logistics Solutions',
      textLogistic:
        'We integrate technology and automation for inventory control, material handling, and traceability, increasing visibility and operational agility.',
      imageLogistic: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsolucoes-logisticas-para-empresas.jpg?alt=media&token=8ea94167-fb0e-4aeb-883a-4a1287c18ecc',
        alternativeText: 'Logistics warehouse and material handling',
      },
      locale: 'en',
      localizations: { data: [] },
    },
    food: {
      titleFood: 'Food and Beverage',
      textFood:
        'Automation and control for food and beverage processes, focusing on safety, quality, and productivity.',
      imageFood: {
        id: 3,
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Findustria-alimentos-e-bebidas.jpg?alt=media&token=a1e12721-7d63-49d6-b479-68c5e719dadc',
        alternativeText: 'Food and beverage industry',
        width: 1200,
        height: 800,
        formats: {},
      },
      locale: 'en',
      localizations: { data: [] },
    },
  },
  es: {
    automotive: {
      titleAuto: 'Sector Automotriz',
      textAuto:
        'Desarrollamos soluciones de automatización para el sector automotriz, desde líneas de montaje hasta pruebas de calidad. Nuestras tecnologías ayudan a optimizar el tiempo y reducir errores humanos en entornos industriales exigentes.',
      imageAuto: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fevoluc%CC%A7a%CC%83o-linha-de-montagem-de-veiculos.png?alt=media&token=aff65fc1-4f66-4d68-baf9-e0833c5bad7b',
        alternativeText: 'Línea de ensamblaje de vehículos',
      },
      locale: 'es',
      localizations: { data: [] },
    },
    water: {
      titleWater: 'Tratamiento de Agua',
      textWater:
        'Soluciones para tratamiento, monitoreo y automatización de procesos de agua, garantizando calidad, trazabilidad y eficiencia operativa.',
      imageWater: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftratamento-de-agua.jpg?alt=media&token=e1e5b2bc-69f6-4386-937d-b01882bf274c',
        alternativeText: 'Planta industrial de tratamiento de agua',
      },
      locale: 'es',
      localizations: { data: [] },
    },
    logistic: {
      titleLogistic: 'Soluciones Logísticas',
      textLogistic:
        'Integramos tecnología y automatización para el control de inventario, manejo de materiales y trazabilidad, aumentando la visibilidad y la agilidad operativa.',
      imageLogistic: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsolucoes-logisticas-para-empresas.jpg?alt=media&token=8ea94167-fb0e-4aeb-883a-4a1287c18ecc',
        alternativeText: 'Almacén logístico y manejo de materiales',
      },
      locale: 'es',
      localizations: { data: [] },
    },
    food: {
      titleFood: 'Alimentos y Bebidas',
      textFood:
        'Automatización y control para procesos de alimentos y bebidas, con foco en seguridad, calidad y productividad.',
      imageFood: {
        id: 3,
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Findustria-alimentos-e-bebidas.jpg?alt=media&token=a1e12721-7d63-49d6-b479-68c5e719dadc',
        alternativeText: 'Industria de alimentos y bebidas',
        width: 1200,
        height: 800,
        formats: {},
      },
      locale: 'es',
      localizations: { data: [] },
    },
  },
} as const;

export function resolveLocale<T>(map: Record<string, T>, locale: string, fallback: string): T {
  // Tenta correspondência exata (ex.: 'pt' ou 'en')
  if (map[locale]) return map[locale];

  // Normaliza locales com região (ex.: 'es-AR' -> 'es', 'pt-BR' -> 'pt')
  const base = (locale || '').split('-')[0];
  if (base && map[base]) return map[base];

  // Fallback configurado
  if (map[fallback]) return map[fallback];

  // Último recurso: primeiro item do mapa
  return (Object.values(map)[0] as T);
}
