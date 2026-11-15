import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { CtaPanel, Heading, IconCircle, PageHero, Section } from "@/components/Section";
import { getArea, site, whatsappUrl } from "@/content/site";
import { faqLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => site.areas.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props) {
  const area = getArea((await params).slug);
  if (!area) return {};
  return pageMeta({
    title: `${area.title} em ${site.city}`,
    description: area.summary,
    path: `/areas-de-atuacao/${area.slug}`,
  });
}

export default async function AreaPage({ params }: Props) {
  const area = getArea((await params).slug);
  if (!area) notFound();
  const others = site.areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        title={area.title}
        lead={area.lead}
        crumbs={[
          { name: site.areasPage.title, href: "/areas-de-atuacao" },
          { name: area.title, href: `/areas-de-atuacao/${area.slug}` },
        ]}
      />

      <Section tone="surface">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div className="space-y-16">
            <Reveal>
              <h2 className="text-3xl font-medium">O que atendemos</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {area.services.map((s) => (
                  <li key={s} className="flex gap-4 py-4">
                    <Check className="mt-1 size-5 shrink-0 text-brass-ink" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-medium">Para quem é</h2>
              <p className="mt-5 text-muted">{area.audience}</p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-medium">Situações comuns</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {area.situations.map((s) => (
                  <li key={s} className="rounded-sm border-l-2 border-brass bg-paper p-5">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* CTA lateral, fixo durante a leitura no desktop */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark rounded-sm bg-ink p-8 text-white">
              <IconCircle icon={area.icon} />
              <h2 className="mt-6 text-2xl font-medium">Precisa de orientação em {area.title}?</h2>
              <p className="mt-3 text-on-dark">{site.cta.text}</p>
              <Link href="/contato" className="btn btn-brass mt-7 w-full">
                {site.cta.primary}
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-3 w-full">
                <MessageCircle className="size-5" aria-hidden="true" />
                {site.cta.whatsapp}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="deep">
        <Reveal>
          <Heading title={site.areasPage.processTitle} lead={site.areasPage.processLead} />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ProcessSteps columns />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal>
            <Heading eyebrow="Dúvidas frequentes" title={`Perguntas sobre ${area.title}`} />
            <Link href="/duvidas-frequentes" className="link mt-6 inline-flex min-h-11 items-center gap-2">
              Ver todas as dúvidas
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Faq items={area.faq} />
          </Reveal>
        </div>

        <nav aria-label="Outras áreas de atuação" className="mt-20 border-t border-line pt-8">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">Outras áreas</h2>
          <ul className="mt-3 flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
            {others.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas-de-atuacao/${a.slug}`} className="link inline-flex min-h-11 items-center gap-2">
                  {a.title}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <CtaPanel />
      <JsonLd data={faqLd(area.faq)} />
    </>
  );
}
