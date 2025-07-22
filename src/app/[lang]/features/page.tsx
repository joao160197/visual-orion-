"use client";

import Link from "next/link";
import { Car, LineChart, Waves, Pizza } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Automotivo",
      icon: <Car size={40} />,
      href: "/pt/AutomativePage",
    },
    {
      title: "Logístico",
      icon: <LineChart size={40} />,
      href: "/pt/Logistico",
    },
    {
      title: "Tratamento de água",
      icon: <Waves size={40} />,
      href: "/pt/TratamentoAgua",
    },
    {
      title: "Alimentos e bebidas",
      icon: <Pizza size={40} />,
      href: "/pt/Alimentos",
    },
  ];

  return (
    <section className="py-20 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#004a6d] mb-4">
          Nossos Campos de Atuação
        </h1>
        <p className="text-gray-700 mb-12">
          Com uma lista ampla de clientes, temos conhecimento em diversos tipos de segmentos.
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
