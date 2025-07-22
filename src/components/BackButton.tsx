"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function VoltarButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 font-medium mt-6"
    >
      <FaArrowLeft size={18} />
      Voltar
    </button>
  );
}
