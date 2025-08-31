import { getHomePage } from "@/data/loader";
import { notFound } from "next/navigation";
import { i18n } from "../../i18n-config";
import { renderBlocks } from "@/components/BlockRenderer";
import AboutSection from "@/components/AboutSection";
import FaleConoscoSection from "@/components/FaleConoscoSection";
import Footer from "@/components/Footer";
import { getDictionary } from "../../get-dictionary";
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Locale } from '@/i18n-config';
import { Car, LineChart, Waves, Pizza } from "lucide-react";


interface HomePageProps {
  params: {
    lang: string;
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Home({ params: { lang } }: HomePageProps) {
  // Buscar dados da página inicial (estático/local)
  const dictionary = await getDictionary(lang as Locale);
  const homePageData = await getHomePage(lang);


  if (!homePageData?.data) {
    notFound();
    return null;
  }

  // Extrair dados da página com verificações de segurança
  const pageData = homePageData?.data?.attributes || homePageData?.data || {};
  const { title, description, blocks = [], about, talktous } = pageData;
  
  // Garantir que talktous seja um array
  const safeTalktous = Array.isArray(talktous?.data) ? talktous.data : 
                     Array.isArray(talktous) ? talktous : [];
  
  // Se não tiver dados, retornar 404
  if (!homePageData?.data) {
    notFound();
    return null;
  }

  // Processar dados do Fale Conosco (compatível com estrutura local)
  const processarDadosFaleConosco = () => {
    // Se não houver itens, retornar null
    if (safeTalktous.length === 0) {
      console.log('Nenhum item encontrado em safeTalktous');
      return null;
    }
    
    const primeiroItem = safeTalktous[0];
    if (!primeiroItem) {
      console.log('Primeiro item é nulo ou indefinido');
      return null;
    }
    
    console.log('Estrutura completa do primeiro item:', JSON.stringify(primeiroItem, null, 2));
    
    // Extrair os atributos, lidando com diferentes estruturas de dados
    const atributos = primeiroItem.attributes || primeiroItem;
    if (!atributos) {
      console.log('Nenhum atributo encontrado no item');
      return null;
    }
    
    console.log('Atributos extraídos:', JSON.stringify(atributos, null, 2));
    
    // Extrair campos principais
    const titulo = atributos.title || atributos.titulo || 'Fale Conosco';
    const texto = atributos.text || atributos.texto || 'Entre em contato conosco para mais informações.';
    const link = atributos.link || atributos.href || '/contato';
    const image = atributos.image || atributos.midia || atributos.media;
    
    // Extrair a mídia, usando o campo 'midia' conforme configurado no Strapi
    let midia = null;
    
    // Verificar se há dados de mídia em diferentes formatos
    if (atributos.midia?.data) {
      console.log('Usando campo midia.data');
      midia = { data: atributos.midia.data };
    } else if (atributos.media?.data) {
      console.log('Usando campo media.data (fallback)');
      midia = { data: atributos.media.data };
    } else if (atributos.image?.data) {
      console.log('Usando campo image.data (fallback)');
      midia = { data: atributos.image.data };
    } else if (atributos.midia) {
      console.log('Usando campo midia diretamente');
      midia = atributos.midia;
    } else if (atributos.media) {
      console.log('Usando campo media diretamente (fallback)');
      midia = atributos.media;
    } else if (atributos.image) {
      console.log('Usando campo image diretamente (fallback)');
      midia = atributos.image;
    }
    
    // Log detalhado da estrutura da mídia
    if (midia) {
      console.log('Estrutura da mídia encontrada:', JSON.stringify(midia, null, 2));
      // Sem chamadas externas; URLs são tratadas nos componentes com caminhos locais/root-relativos
    } else {
      console.log('Nenhuma mídia encontrada nos atributos');
    }
    
    // Retornar os dados processados
    const resultado = {
      title: titulo,
      text: texto,
      href: link,
      image: midia  // Inclui a mídia processada
    };

    // Overrides por idioma quando não há conteúdo do CMS adequado
    if ((lang as string) === 'pt') {
      resultado.title = 'Fale Conosco';
      resultado.text = 'Entre em contato e descubra como nossas soluções podem agregar valor ao seu negócio com inovação, eficiência e confiabilidade.';
    } else if ((lang as string) === 'es') {
      resultado.title = 'Contáctenos';
      resultado.text = 'Póngase en contacto y descubra cómo nuestras soluciones pueden aportar valor a su negocio con innovación, eficiencia y confiabilidad.';
    } else if ((lang as string) === 'en') {
      resultado.title = 'Contact Us';
      resultado.text = 'Get in touch and discover how our solutions can add value to your business with innovation, efficiency, and reliability.';
    }
    
    console.log('Dados processados do Fale Conosco:', JSON.stringify(resultado, null, 2));
    return resultado;
  };
  
  const faleConosco = processarDadosFaleConosco();

  // Lista de soluções (local) com os mesmos ícones usados em `features/page.tsx`
  const solutionsToShow = [
    { id: 1, title: dictionary.solutions.items.automotive, slug: 'automotivo', Icon: Car },
    { id: 2, title: dictionary.solutions.items.logistics, slug: 'logistico', Icon: LineChart },
    { id: 3, title: dictionary.solutions.items.waterTreatment, slug: 'tratamento-agua', Icon: Waves },
    { id: 4, title: dictionary.solutions.items.foodAndBeverage, slug: 'Food', Icon: Pizza },
  ];

  // Logs de depuração removidos para limpar o console

  return (
    <main>
      {/* Cabeçalho da página */}
      <section className="text-center py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-GoodTimes text-[#3c4494]">
          {title || dictionary.homePage.welcome}
        </h1>
        <p className="text-base sm:text-lg font-ReportSb text-gray-600 mt-4 max-w-3xl mx-auto px-4">
          {description || ""}
        </p>
      </section>

      {/* Renderização dos blocos dinâmicos, incluindo o carrossel */}
      <section className="space-y-8">
        {Array.isArray(blocks) && blocks.length > 0 ? (
          renderBlocks(blocks, dictionary, lang)
        ) : (
          <div className="text-center py-8">
            <p>{dictionary.homePage.noBlocks}</p>
          </div>
        )}
      </section>

      {/* Seção Sobre Nós */}
      {about && (
        <AboutSection 
          title={about.title as string | undefined}
          about={about.about as string | undefined}
          image={about.image as any | undefined}
          dictionary={dictionary.about}
        />
      )}

          {/* Seção Soluções */}
      <section className="bg-[#0f4c75] text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal direction="up" distance={24} duration={0.55}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
              {dictionary.solutions.title}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.08} distance={20} duration={0.55}>
            <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-gray-200">
              {dictionary.solutions.subtitle}
            </p>
          </Reveal>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 items-stretch">
            {solutionsToShow.map((solution, index) => {
              // Mapear slugs para as rotas corretas
              const getRouteFromSlug = (slug: string) => {
                const routes: {[key: string]: string} = {
                  'automotivo': 'AutomativePage',
                  'logistico': 'Logistico',
                  'tratamento-agua': 'TratamentoAgua',
                  'Food': 'Food' // Corrigido para corresponder ao slug
                };
                return routes[slug] || slug;
              };
              
              const route = getRouteFromSlug(solution.slug);
              
              return (
                <Reveal
                  key={solution.id}
                  delay={index * 0.06}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  distance={28}
                  duration={0.6}
                  hoverScale={1.02}
                  className="h-full"
                >
                  <Link 
                    href={`/${lang}/${route}`}
                    className="group block h-full"
                  >
                    <div className="bg-white/10 p-4 sm:p-6 rounded-lg h-full min-h-[160px] sm:min-h-[180px] flex flex-col items-center justify-between transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-[1.02] sm:hover:scale-105">
                      <div className="bg-white/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <solution.Icon size={40} />
                      </div>
                      <h3 className="text-xl font-medium mb-1 text-center">{solution.title}</h3>
                      <p className="text-sm text-white/80">{dictionary.solutions.learnMore}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Seção Fale Conosco */}
      <div className="mt-16">
        <FaleConoscoSection
          titulo={faleConosco?.title}
          texto={faleConosco?.text}
          linkBotao={faleConosco?.href || `/${lang}/contato`}
          image={faleConosco?.image}
          lang={lang as Locale}
          dictionary={{ contactPage: dictionary.contactPage }}
        />
      </div>
      
      <Footer />
    </main>
  );
}
