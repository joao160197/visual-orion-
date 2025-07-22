export interface SolutionItem {
  id: number;
  attributes: {
    title: string;
    slug: string;
    icon: string; // Nome do ícone que corresponde aos ícones do Lucide
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface SolutionsResponse {
  data: SolutionItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
