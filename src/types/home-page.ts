export interface TalkToUsItem {
  id: number;
  title: string;
  text: string;
  href: string;
  image: string;
}

export interface HomePageData {
  id: number;
  attributes: {
    title: string;
    description: string;
    about: {
      id: number;
      title: string;
      about: string;
    };
    talktous: TalkToUsItem[];
    // Outros campos que podem existir
    [key: string]: any;
  };
}
