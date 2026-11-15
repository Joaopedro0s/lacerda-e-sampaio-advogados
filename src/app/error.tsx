"use client";

import Link from "next/link";
import { Section } from "@/components/Section";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Section>
      <p className="eyebrow">Algo deu errado</p>
      <h1 className="mt-4 max-w-2xl text-[2.4rem] font-medium md:text-[3.4rem]">Não foi possível carregar esta página</h1>
      <p className="lead mt-5 max-w-xl">O problema é do nosso lado. Tente novamente em instantes.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn btn-primary">
          Tentar novamente
        </button>
        <Link href="/" className="btn btn-outline">
          Voltar para o início
        </Link>
      </div>
    </Section>
  );
}
