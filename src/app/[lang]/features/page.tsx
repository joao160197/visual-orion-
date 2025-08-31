import Link from "next/link";
import { Reveal } from '@/components/Reveal';
import { Car, LineChart, Waves, Pizza } from "lucide-react";
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";

interface FeaturesPageProps {
  params: {
    lang: Locale;
  };
}

export default async function FeaturesPage({ params: { lang } }: FeaturesPageProps) {
  const dictionary = await getDictionary(lang);
  const featuresDictionary = dictionary.featuresPage;

  const features = [
    {
      title: featuresDictionary.items.automotive,
      icon: <Car size={40} />,
      href: `/${lang}/AutomativePage`,
    },
    {
      title: featuresDictionary.items.logistics,
      icon: <LineChart size={40} />,
      href: `/${lang}/Logistico`,
    },
    {
      title: featuresDictionary.items.waterTreatment,
      icon: <Waves size={40} />,
      href: `/${lang}/TratamentoAgua`,
    },
    {
      title: featuresDictionary.items.foodAndBeverage,
      icon: <Pizza size={40} />,
      href: `/${lang}/Food`,
    },
  ];

  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <Reveal direction="up" distance={24} duration={0.55}>
          <h1 className="text-3xl md:text-4xl font-bold text-[#004a6d] mb-4">
            {featuresDictionary.title}
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.08} distance={20} duration={0.55}>
          <p className="text-gray-700 mb-12">
            {featuresDictionary.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 place-items-stretch items-stretch">
          {features.map((item, index) => (
            <Reveal
              key={index}
              delay={index * 0.06}
              direction={index % 2 === 0 ? 'left' : 'right'}
              distance={28}
              duration={0.6}
              hoverScale={1.02}
              className="h-full"
            >
              <Link
                href={item.href}
                className="bg-[#0082ad] text-white h-full min-h-[160px] sm:min-h-[180px] rounded-md shadow-md transition-all hover:shadow-lg flex flex-col items-center justify-between gap-4 py-8 sm:py-10 px-4 sm:px-6"
              >
                {item.icon}
                <span className="text-lg font-semibold">{item.title}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
