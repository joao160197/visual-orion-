import VoltarButton from "@/components/BackButton";

export default function LogisticoPage() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <VoltarButton />
      <h1 className="text-4xl font-bold text-[#004a6d] mb-6">
        Soluções Logísticas
      </h1>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fsolucoes-logisticas-para-empresas.jpg?alt=media&token=220b1492-cf06-4555-bea9-d184a65773e2"
        alt="Centro logístico"
        className="w-full max-w-3xl mx-auto rounded-lg shadow-md mb-8"
      />
      <p className="text-lg text-gray-700 leading-relaxed">
        Nossas soluções logísticas integram tecnologia e automação para controle
        de estoque, movimentação de materiais e rastreabilidade. Atuamos com
        sistemas de identificação automática, sensores e painéis industriais
        para aumentar a visibilidade e agilidade da operação.
      </p>
    </section>
  );
}
