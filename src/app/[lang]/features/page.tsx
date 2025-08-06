import Link from "next/link";
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#004a6d] mb-4">
          {featuresDictionary.title}
        </h1>
        <p className="text-gray-700 mb-12">
          {featuresDictionary.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {features.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-[#0082ad] text-white flex flex-col items-center justify-center gap-4 py-10 px-6 w-64 rounded-md shadow-md hover:scale-105 transition-transform"
            >
              {item.icon}
              <span className="text-lg font-semibold">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
