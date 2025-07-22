import VoltarButton from "@/components/BackButton";

export default function AutomotivoPage() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <VoltarButton />
      <h1 className="text-4xl font-bold text-[#004a6d] mb-6">
        Setor Automotivo
      </h1>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fevoluc%CC%A7a%CC%83o-linha-de-montagem-de-veiculos.png?alt=media&token=aff65fc1-4f66-4d68-baf9-e0833c5bad7b"
        alt="Linha de montagem automotiva"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-md mb-8"
      />
      <p className="text-lg text-gray-700 leading-relaxed">
        Atuamos no desenvolvimento de soluções voltadas para a automação de
        processos no setor automotivo, desde linhas de montagem até testes de
        qualidade. Com foco em eficiência e rastreabilidade, nossas tecnologias
        ajudam a otimizar tempo e reduzir falhas humanas em ambientes
        industriais altamente exigentes.
      </p>
    </section>
  );
}
