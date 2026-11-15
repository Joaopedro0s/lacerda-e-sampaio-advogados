import Link from "next/link";
import { CalendarDays, MessageCircle } from "lucide-react";
import { site, whatsappUrl } from "@/content/site";

/** Desktop: botão flutuante. Mobile: barra fixa "WhatsApp | Agendar" (o rodapé reserva o espaço dela). */
export function WhatsAppButtons() {
  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={site.cta.whatsapp}
        className="fixed bottom-6 right-6 z-30 hidden size-14 items-center justify-center rounded-full bg-ink text-brass shadow-lg shadow-ink/25 ring-1 ring-brass/60 transition duration-200 hover:-translate-y-1 hover:bg-ink-soft md:flex"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>

      <nav
        aria-label="Atalhos de contato"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-white/15 bg-ink pb-[env(safe-area-inset-bottom)] text-white md:hidden"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center gap-2 font-semibold">
          <MessageCircle className="size-5 text-brass" aria-hidden="true" />
          WhatsApp
        </a>
        <Link href="/contato" className="flex min-h-14 items-center justify-center gap-2 bg-brass font-semibold text-ink">
          <CalendarDays className="size-5" aria-hidden="true" />
          Agendar
        </Link>
      </nav>
    </>
  );
}
