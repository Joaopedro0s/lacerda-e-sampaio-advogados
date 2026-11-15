import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppButtons } from "./WhatsAppButtons";

/** Moldura comum a todas as páginas: skip link, faixa de aviso, cabeçalho, conteúdo, rodapé e atalhos. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <aside aria-label="Aviso de demonstração" className="bg-ink px-4 py-1.5 text-center text-[0.8rem] leading-snug text-white">
        {site.demoNotice}
      </aside>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppButtons />
    </>
  );
}
