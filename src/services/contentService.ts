import { staticSolutionsPages, resolveLocale } from '@/data/staticContent';

interface MediaFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
  size: number;
}

interface Media {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail?: MediaFormat;
        small?: MediaFormat;
        medium?: MediaFormat;
        large?: MediaFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

// Interface para a página Automotive
export interface AutomotiveContent {
  data: {
    id: string;
    titleAuto: string;
    textAuto: string;
    imageAuto: {
      url: string;
      alternativeText: string | null;
    } | null;
    locale: string;
    localizations: {
      data: Array<{ id: number; locale: string; }>;
    };
  };
  meta?: any;
}

// Interface para a página Tratamento de Água
export interface WaterTreatmentContent {
  data: {
    id: string;
    titleWater: string;
    textWater: string;
    imageWater: {
      url: string;
      alternativeText: string | null;
    } | null;
    locale: string;
    localizations: {
      data: Array<{ id: number; locale: string; }>;
    };
  };
  meta?: any;
}

// Interface para a página Logístico
export interface LogisticContent {
  data: {
    id: string;
    titleLogistic: string;
    textLogistic: string;
    imageLogistic: {
      url: string;
      alternativeText: string | null;
    } | null;
    locale: string;
    localizations: {
      data: Array<{ id: number; locale: string; }>;
    };
  };
  meta?: any;
}

// Interface para a página Food
export interface FoodContent {
  data: {
    id: string;
    titleFood: string;
    textFood: string;
    imageFood: {
      id: number;
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail?: MediaFormat;
        small?: MediaFormat;
        medium?: MediaFormat;
        large?: MediaFormat;
      };
    } | null;
    locale: string;
    localizations: {
      data: Array<{
        id: number;
        locale: string;
      }>;
    };
  };
  meta?: any;
}

// Função para buscar os dados da página Automotive
export async function getAutomotiveContent(locale: string = 'pt-BR'): Promise<AutomotiveContent> {
  const loc = resolveLocale(staticSolutionsPages as any, locale, 'pt');
  const base = (loc as any).automotive;
  if (base) {
    return Promise.resolve({
      data: {
        id: '1',
        titleAuto: base.titleAuto,
        textAuto: base.textAuto,
        imageAuto: base.imageAuto,
        locale: locale,
        localizations: { data: [] }
      },
      meta: {}
    } as AutomotiveContent);
  }
  return Promise.resolve({
    data: {
      id: '1',
      titleAuto: 'Setor Automotivo (Fallback)',
      textAuto: 'Conteúdo indisponível.',
      imageAuto: null,
      locale: locale,
      localizations: { data: [] }
    },
    meta: {}
  });
}

// Função para buscar os dados da página de Tratamento de Água
export async function getWaterTreatmentContent(locale: string = 'pt-BR'): Promise<WaterTreatmentContent> {
  const loc = resolveLocale(staticSolutionsPages as any, locale, 'pt');
  const base = (loc as any).water;
  if (base) {
    return Promise.resolve({
      data: {
        id: '1',
        titleWater: base.titleWater,
        textWater: base.textWater,
        imageWater: base.imageWater,
        locale: locale,
        localizations: { data: [] }
      },
      meta: {}
    } as WaterTreatmentContent);
  }
  return Promise.resolve({
    data: {
      id: '1',
      titleWater: 'Tratamento de Água (Fallback)',
      textWater: 'Conteúdo indisponível.',
      imageWater: null,
      locale: locale,
      localizations: { data: [] }
    },
    meta: {}
  });
}

// Função para buscar os dados da página Logístico
export async function getLogisticContent(locale: string = 'pt-BR'): Promise<LogisticContent> {
  const loc = resolveLocale(staticSolutionsPages as any, locale, 'pt');
  const base = (loc as any).logistic;
  if (base) {
    return Promise.resolve({
      data: {
        id: '1',
        titleLogistic: base.titleLogistic,
        textLogistic: base.textLogistic,
        imageLogistic: base.imageLogistic,
        locale: locale,
        localizations: { data: [] }
      },
      meta: {}
    } as LogisticContent);
  }
  return Promise.resolve({
    data: {
      id: '1',
      titleLogistic: 'Soluções Logísticas (Fallback)',
      textLogistic: 'Conteúdo indisponível.',
      imageLogistic: null,
      locale: locale,
      localizations: { data: [] }
    },
    meta: {}
  });
}

// Função para buscar os dados da página Food
export async function getFoodContent(locale: string = 'pt-BR'): Promise<FoodContent> {
  const loc = resolveLocale(staticSolutionsPages as any, locale, 'pt');
  const base = (loc as any).food;
  if (base && base.titleFood) {
    return Promise.resolve({
      data: {
        id: '1',
        titleFood: base.titleFood,
        textFood: base.textFood,
        imageFood: base.imageFood,
        locale: locale,
        localizations: { data: [] }
      },
      meta: {}
    } as FoodContent);
  }
  return Promise.resolve({
    data: {
      id: '1',
      titleFood: 'Alimentos e Bebidas (Fallback)',
      textFood: 'Conteúdo indisponível.',
      imageFood: null,
      locale: locale,
      localizations: { data: [] }
    },
    meta: {}
  });
}