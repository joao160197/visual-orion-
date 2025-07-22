import VoltarButton from "@/components/BackButton";

export default function TratamentoAguaPage() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <VoltarButton />
      <h1 className="text-4xl font-bold text-[#004a6d] mb-6">
        Tratamento de Água
      </h1>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Ftratamento-de-agua.jpg?alt=media&token=15ad587a-f642-413c-aa17-4a4680caf211"
        alt="Estação de tratamento de água"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-md mb-8"
      />
      <p className="text-lg text-gray-700 leading-relaxed">
        Desenvolvemos sistemas para monitoramento, controle e automação de
        estações de tratamento de água e efluentes. Nossos equipamentos garantem
        a conformidade ambiental e o uso eficiente dos recursos hídricos,
        promovendo sustentabilidade com confiabilidade.
      </p>
    </section>
  );
}
