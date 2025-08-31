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
  en: {
    title: 'Visual Orion',
    description: 'Innovative solutions for your business',
    blocks: [],
    about: {
      title: 'More about us',
      about:
        'We develop solutions focused on automation and technology, with an emphasis on efficiency and reliability.',
      image: {
        data: {
          id: 1,
          attributes: {
            url: '/images/food-banner.jpg',
            alternativeText: 'About us',
            width: 1200,
            height: 800,
            formats: {},
          },
        },
      },
    },
    talktous: [
      {
        title: 'Contact Us',
        text:
          'If your company can benefit from faster processes, talk to us and learn what automation can do for you.',
        link: '/contact',
        image: {
          data: {
            id: 2,
            attributes: {
              url: '/images/placeholder.svg',
              alternativeText: 'Contact Us',
              width: 800,
              height: 533,
              formats: {},
            },
          },
        },
      },
    ],
  },
  es: {
    title: 'Visual Orion',
    description: 'Soluciones innovadoras para su negocio',
    blocks: [],
    about: {
      title: 'Más sobre nosotros',
      about:
        'Desarrollamos soluciones enfocadas en automatización y tecnología, con énfasis en eficiencia y confiabilidad.',
      image: {
        data: {
          id: 1,
          attributes: {
            url: '/images/food-banner.jpg',
            alternativeText: 'Sobre nosotros',
            width: 1200,
            height: 800,
            formats: {},
          },
        },
      },
    },
    talktous: [
      {
        title: 'Contáctenos',
        text:
          'Si su empresa puede beneficiarse de procesos más rápidos, hable con nosotros y descubra lo que la automatización puede hacer por usted.',
        link: '/contacto',
        image: {
          data: {
            id: 2,
            attributes: {
              url: '/images/placeholder.svg',
              alternativeText: 'Contáctenos',
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
      textAuto: `Atuamos no desenvolvimento de soluções voltadas para a automação de processos no setor automotivo, desde linhas de montagem até testes de qualidade. Nossas tecnologias apoiam fabricantes e fornecedores em projetos que exigem alta precisão e confiabilidade, otimizando tempo e reduzindo falhas humanas em ambientes industriais exigentes.

Principais serviços aplicados ao setor automotivo:
- Projeto de layout de automação de linhas, segurança e equipamentos
- Programação de PLC e robôs industriais
- Desenvolvimento de HMI e SCADA
- Comissionamento virtual e partida de equipamentos
- Testes, otimização de programação e ciclo de tempo
- Suporte à manutenção e controle de produção
- Treinamento de equipes e padronização de processos`,
      imageAuto: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fevoluc%CC%A7a%CC%83o-linha-de-montagem-de-veiculos.png?alt=media&token=aff65fc1-4f66-4d68-baf9-e0833c5bad7b',
        alternativeText: 'Linha de montagem de veículos',
      },
      locale: 'pt',
      localizations: { data: [] },
    },
    water: {
      titleWater: 'Tratamento de Água',
      textWater: `Contribuímos para a eficiência e confiabilidade de estações de tratamento de água e efluentes com soluções de automação que garantem estabilidade operacional, monitoramento em tempo real e conformidade com normas ambientais.

Principais serviços aplicados ao setor de tratamento de água:
- Programação de PLCs para controle de bombas, válvulas e processos de filtração
- Desenvolvimento de sistemas SCADA e HMI para supervisão remota
- Projeto elétrico e auditorias de instalação
- Projeto de redes industriais para comunicação confiável entre equipamentos
- Partida, testes e otimização de programação
- Documentação técnica e padronização de processos`,
      imageWater: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftratamento-de-agua.jpg?alt=media&token=e1e5b2bc-69f6-4386-937d-b01882bf274c',
        alternativeText: 'Estação de tratamento de água industrial',
      },
      locale: 'pt',
      localizations: { data: [] },
    },
    logistic: {
      titleLogistic: 'Setor Logístico',
      textLogistic: `No setor logístico, apoiamos a transformação digital de armazéns, centros de distribuição e operações de transporte, por meio de soluções de automação que aumentam a agilidade, reduzem custos operacionais e garantem maior rastreabilidade dos processos.

Principais serviços aplicados ao setor logístico:
- Projeto de redes industriais para sistemas integrados de movimentação
- Programação de PLC em transportadores, classificadores e sistemas automatizados
- Integração de sistemas de supervisão (SCADA) e interfaces HMI
- Desenvolvimento de softwares de alto nível para rastreamento e controle
- Testes e otimização de programação em fluxos logísticos
- Suporte à manutenção e operação de sistemas de movimentação`,
      imageLogistic: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsolucoes-logisticas-para-empresas.jpg?alt=media&token=8ea94167-fb0e-4aeb-883a-4a1287c18ecc',
        alternativeText: 'Centro de distribuição e movimentação de materiais',
      },
      locale: 'pt',
      localizations: { data: [] },
    },
    food: {
      titleFood: 'Alimentos e Bebidas',
      textFood: `No setor de alimentos e bebidas, garantimos soluções que unem automação, segurança e rastreabilidade, atendendo às rigorosas normas de qualidade. Nossos serviços otimizam linhas de envase, embalagem e controle de processos, sempre com foco em eficiência e segurança alimentar.

Principais serviços aplicados ao setor de alimentos e bebidas:
- Projeto de layout de automação de linhas de produção
- Programação de PLC e robôs para envase e embalagem
- Desenvolvimento de HMI e SCADA para supervisão de processos
- Comissionamento virtual para validação de linhas antes da instalação
- Testes, otimização de ciclo e suporte à produção
- Treinamento de equipes e documentação técnica conforme normas regulatórias`,
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
      textAuto: `We develop solutions focused on automating processes in the automotive sector, from assembly lines to quality tests. Our technologies support manufacturers and suppliers in projects that require high precision and reliability, optimizing time and reducing human failures in demanding industrial environments.

Main services applied to the automotive sector:
- Layout design for line automation, safety and equipment
- PLC and industrial robot programming
- HMI and SCADA development
- Virtual commissioning and equipment start-up
- Testing, programming optimization and cycle time improvement
- Maintenance support and production control
- Team training and process standardization`,
      imageAuto: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fevoluc%CC%A7a%CC%83o-linha-de-montagem-de-veiculos.png?alt=media&token=aff65fc1-4f66-4d68-baf9-e0833c5bad7b',
        alternativeText: 'Vehicle assembly line',
      },
      locale: 'en',
      localizations: { data: [] },
    },
    water: {
      titleWater: 'Water Treatment',
      textWater: `We contribute to the efficiency and reliability of water and wastewater treatment plants with automation solutions that ensure operational stability, real-time monitoring, and compliance with environmental standards.

Main services applied to the water treatment sector:
- PLC programming for pump, valve and filtration process control
- SCADA and HMI systems development for remote supervision
- Electrical design and installation audits
- Industrial network design for reliable equipment communication
- Commissioning, testing and programming optimization
- Technical documentation and process standardization`,
      imageWater: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftratamento-de-agua.jpg?alt=media&token=e1e5b2bc-69f6-4386-937d-b01882bf274c',
        alternativeText: 'Industrial water treatment plant',
      },
      locale: 'en',
      localizations: { data: [] },
    },
    logistic: {
      titleLogistic: 'Logistics Sector',
      textLogistic: `In the logistics sector, we support the digital transformation of warehouses, distribution centers and transport operations through automation solutions that increase agility, reduce operating costs and ensure greater process traceability.

Main services applied to the logistics sector:
- Industrial network design for integrated material handling systems
- PLC programming in conveyors, sorters and automated systems
- Integration of SCADA supervision systems and HMI interfaces
- Development of higher-level software for tracking and control
- Testing and programming optimization in logistics flows
- Maintenance support and operation of handling systems`,
      imageLogistic: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsolucoes-logisticas-para-empresas.jpg?alt=media&token=8ea94167-fb0e-4aeb-883a-4a1287c18ecc',
        alternativeText: 'Logistics warehouse and material handling',
      },
      locale: 'en',
      localizations: { data: [] },
    },
    food: {
      titleFood: 'Food and Beverage',
      textFood: `In the food and beverage sector, we deliver solutions that combine automation, safety and traceability, meeting strict quality standards. Our services optimize filling, packaging and process control lines, always focused on efficiency and food safety.

Main services applied to the food and beverage sector:
- Layout design for production line automation
- PLC and robot programming for filling and packaging
- HMI and SCADA development for process supervision
- Virtual commissioning to validate lines before installation
- Testing, cycle optimization and production support
- Team training and technical documentation according to regulatory standards`,
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
      textAuto: `Desarrollamos soluciones enfocadas en la automatización de procesos en el sector automotriz, desde líneas de montaje hasta pruebas de calidad. Nuestras tecnologías apoyan a fabricantes y proveedores en proyectos que exigen alta precisión y confiabilidad, optimizando el tiempo y reduciendo fallas humanas en entornos industriales exigentes.

Servicios principales aplicados al sector automotriz:
- Diseño de layout para automatización de líneas, seguridad y equipos
- Programación de PLC y robots industriales
- Desarrollo de HMI y SCADA
- Comisionamiento virtual y puesta en marcha de equipos
- Pruebas, optimización de programación y mejora del tiempo de ciclo
- Soporte de mantenimiento y control de producción
- Capacitación de equipos y estandarización de procesos`,
      imageAuto: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fevoluc%CC%A7a%CC%83o-linha-de-montagem-de-veiculos.png?alt=media&token=aff65fc1-4f66-4d68-baf9-e0833c5bad7b',
        alternativeText: 'Línea de ensamblaje de vehículos',
      },
      locale: 'es',
      localizations: { data: [] },
    },
    water: {
      titleWater: 'Tratamiento de Agua',
      textWater: `Contribuimos a la eficiencia y confiabilidad de plantas de tratamiento de agua y efluentes con soluciones de automatización que garantizan estabilidad operativa, monitoreo en tiempo real y conformidad con normas ambientales.

Servicios principales aplicados al sector de tratamiento de agua:
- Programación de PLC para control de bombas, válvulas y procesos de filtración
- Desarrollo de sistemas SCADA y HMI para supervisión remota
- Proyecto eléctrico y auditorías de instalación
- Diseño de redes industriales para comunicación confiable entre equipos
- Puesta en marcha, pruebas y optimización de programación
- Documentación técnica y estandarización de procesos`,
      imageWater: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftratamento-de-agua.jpg?alt=media&token=e1e5b2bc-69f6-4386-937d-b01882bf274c',
        alternativeText: 'Planta industrial de tratamiento de agua',
      },
      locale: 'es',
      localizations: { data: [] },
    },
    logistic: {
      titleLogistic: 'Sector Logístico',
      textLogistic: `En el sector logístico, apoyamos la transformación digital de almacenes, centros de distribución y operaciones de transporte, mediante soluciones de automatización que aumentan la agilidad, reducen costos operativos y garantizan mayor trazabilidad de los procesos.

Servicios principales aplicados al sector logístico:
- Diseño de redes industriales para sistemas integrados de movimiento de materiales
- Programación de PLC en transportadores, clasificadores y sistemas automatizados
- Integración de sistemas de supervisión (SCADA) e interfaces HMI
- Desarrollo de software de alto nivel para trazabilidad y control
- Pruebas y optimización de programación en flujos logísticos
- Soporte de mantenimiento y operación de sistemas de movimiento`,
      imageLogistic: {
        url: 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsolucoes-logisticas-para-empresas.jpg?alt=media&token=8ea94167-fb0e-4aeb-883a-4a1287c18ecc',
        alternativeText: 'Almacén logístico y manejo de materiales',
      },
      locale: 'es',
      localizations: { data: [] },
    },
    food: {
      titleFood: 'Alimentos y Bebidas',
      textFood: `En el sector de alimentos y bebidas, garantizamos soluciones que combinan automatización, seguridad y trazabilidad, cumpliendo con normas de calidad rigurosas. Nuestros servicios optimizan líneas de llenado, empaquetado y control de procesos, siempre con foco en eficiencia y seguridad alimentaria.

Servicios principales aplicados al sector de alimentos y bebidas:
- Diseño de layout para automatización de líneas de producción
- Programación de PLC y robots para llenado y empaquetado
- Desarrollo de HMI y SCADA para supervisión de procesos
- Comisionamiento virtual para validación de líneas antes de la instalación
- Pruebas, optimización de ciclo y soporte a la producción
- Capacitación de equipos y documentación técnica conforme normas regulatorias`,
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
