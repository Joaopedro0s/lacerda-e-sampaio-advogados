import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <Section>
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-4 max-w-2xl text-[2.4rem] font-medium md:text-[3.4rem]">Não encontramos esta página</h1>
      <p className="lead mt-5 max-w-xl">O endereço pode ter mudado ou sido digitado de outra forma. Você pode voltar ao início ou falar com a equipe.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Voltar para o início
        </Link>
        <Link href="/contato" className="btn btn-outline">
          Ir para o contato
        </Link>
      </div>
    </Section>
  );
}
