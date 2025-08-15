"use client";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function VoltarButton() {
  const router = useRouter();
  const pathname = usePathname();

  const currentSegments = pathname.split("/").filter(Boolean);
  const currentLocale = currentSegments[0] || "pt";
  const fallbackHref = `/${currentLocale}/features`;

  const handleBack = () => {
    try {
      const ref = typeof document !== "undefined" ? document.referrer : "";
      if (ref && typeof window !== "undefined") {
        const url = new URL(ref);
        // Apenas considera histórico interno do mesmo host
        if (url.origin === window.location.origin) {
          const refPath = url.pathname;
          const refLocale = refPath.split("/").filter(Boolean)[0] || "pt";
          if (refLocale === currentLocale) {
            router.back();
            return;
          }
        }
      }
    } catch (_) {
      // Ignora e segue para o fallback
    }
    router.push(fallbackHref);
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 font-medium mt-6"
    >
      <FaArrowLeft size={18} />
      Voltar
    </button>
  );
}
