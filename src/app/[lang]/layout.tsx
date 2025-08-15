import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/Header";
import { getGlobalData } from "@/data/loader";
import { getDictionary } from "../../get-dictionary";
import { i18n, Locale } from "../../i18n-config";
import { I18nProvider } from "@/components/providers/I18nProvider";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}



export const metadata: Metadata = {
  title: "Visual Orion",
  description: "Soluções inovadoras para o seu negócio",
  icons: {
    icon: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fid%20visual%20orion%20-%20elemento%20azul.png?alt=media&token=152fa53f-8593-4cd4-8688-912717c1e8fa",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params: routeParams,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = routeParams.lang;
  console.log('[RootLayout] Iniciando renderização para o idioma:', lang);
  
  // Declarar variáveis fora do bloco try para garantir o escopo
  let dictionary;
  let logo = null;
  
  try {
    const globalData = await getGlobalData(lang);
    console.log('[RootLayout] Dados globais recebidos:', {
      hasData: !!globalData,
      hasDataProperty: !!globalData?.data,
      dataKeys: globalData?.data ? Object.keys(globalData.data) : 'sem dados',
      logoExists: !!globalData?.data?.Logo,
      logoType: globalData?.data?.Logo ? typeof globalData.data.Logo : 'não definido'
    });
    
    dictionary = await getDictionary(lang as Locale);
    logo = globalData?.data?.Logo || null;
    
    console.log('[RootLayout] Logo extraído:', {
      logo,
      url: logo?.url,
      alternativeText: logo?.alternativeText,
      hasUrl: !!logo?.url,
      urlType: logo?.url ? typeof logo.url : 'não definido'
    });
  } catch (error) {
    console.error('[RootLayout] Erro ao carregar dados globais ou dicionário:', error);
    // Usar valores padrão em caso de erro
    dictionary = await getDictionary(lang as Locale);
    logo = null;
  }

  return (
    <html lang={lang} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background">
        <I18nProvider lang={lang}>
          <Header logo={logo} dictionary={dictionary.navigation} />
          <main className="min-h-screen">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
