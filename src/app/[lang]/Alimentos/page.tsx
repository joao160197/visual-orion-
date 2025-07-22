import VoltarButton from "@/components/BackButton";

export default function AlimentosBebidasPage() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <VoltarButton />
      <h1 className="text-4xl font-bold text-[#004a6d] mb-6">
        Alimentos e Bebidas
      </h1>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Findustria-alimentos-e-bebidas.jpg?alt=media&token=b55794eb-6f53-4962-8d53-b9d3db14c717"
        alt="Linha de produção de alimentos"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-md mb-8"
      />
      <p className="text-lg text-gray-700 leading-relaxed">
        Oferecemos soluções para automação de processos em indústrias
        alimentícias e de bebidas, com foco em higiene, segurança e
        rastreabilidade. Nossos sistemas são projetados para atender rigorosos
        padrões de qualidade e facilitar auditorias regulatórias.
      </p>
    </section>
  );
}
