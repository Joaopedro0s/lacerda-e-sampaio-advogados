import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AreaCard } from "@/components/AreaCard";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { CtaPanel, Heading, IconCircle, Section } from "@/components/Section";
import { site } from "@/content/site";
import { faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: site.home.metaTitle, description: site.description, path: "/" });

const corners = "rounded-br-[4.5rem] rounded-tl-[4.5rem]";

function Avatar({ initials }: { initials: string }) {
  return (
    <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brass-soft font-serif text-sm font-semibold text-brass-ink">
      {initials}
    </span>
  );
}

export default function HomePage() {
  const { hero, intro, areas, differentials, band, testimonials, faq } = site.home;
  const [featured, ...others] = site.testimonials;
  const homeFaq = site.faq.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div
          aria-hidden="true"
          className="absolute -right-56 -top-56 size-[48rem] rounded-full bg-[radial-gradient(closest-side,var(--brass-soft),transparent)]"
        />
        <div className="wrap relative grid gap-14 pb-14 pt-12 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="mt-6 text-[2.5rem] font-medium md:text-6xl xl:text-[4.1rem]">{hero.title}</h1>
            <p className="lead mt-6 max-w-xl">{hero.subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contato" className="btn btn-primary">
                {site.cta.primary}
              </Link>
              <Link href="/areas-de-atuacao" className="btn btn-outline">
                {site.cta.secondary}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className={`absolute -bottom-4 -right-4 left-8 top-8 border border-brass ${corners}`} />
            <Image
              src={hero.image.src}
              width={hero.image.width}
              height={hero.image.height}
              alt={hero.image.alt}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className={`relative aspect-[4/3] w-full object-cover sm:aspect-[4/5] ${corners}`}
            />
            <div className="absolute -left-2 bottom-6 flex max-w-[17.5rem] items-center gap-3 rounded-sm border border-line bg-surface p-4 shadow-xl shadow-ink/15 lg:-left-12 lg:bottom-12">
              <IconCircle icon={hero.card.icon} />
              <p className="text-sm leading-snug">
                <strong className="block font-semibold">{hero.card.title}</strong>
                <span className="text-muted">{hero.card.text}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="wrap relative pb-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:grid-cols-4">
            {site.trustNumbers.map((n) => (
              <div key={n.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-muted">{n.label}</dt>
                <dd className="font-serif text-3xl text-brass-ink sm:text-4xl">{n.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Apresentação + como é o atendimento */}
      <Section tone="surface">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Heading eyebrow={intro.eyebrow} title={intro.title} />
            {intro.paragraphs.map((p) => (
              <p key={p} className="mt-5 max-w-xl text-muted">
                {p}
              </p>
            ))}
            <Link href="/sobre" className="link mt-7 inline-flex min-h-11 items-center gap-2">
              {intro.link}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ProcessSteps />
          </Reveal>
        </div>
      </Section>

      {/* Áreas em destaque */}
      <Section tone="deep">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Heading eyebrow={areas.eyebrow} title={areas.title} lead={areas.lead} />
          <Link href="/areas-de-atuacao" className="link inline-flex min-h-11 items-center gap-2">
            {areas.link}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.areas.map((area, i) => (
            <li key={area.slug}>
              <Reveal delay={i * 80} className="h-full">
                <AreaCard area={area} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Diferenciais (fundo escuro) */}
      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <Heading eyebrow={differentials.eyebrow} title={differentials.title} lead={differentials.lead} />
          </Reveal>
          <ul className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {site.differentials.map((d, i) => (
              <li key={d.title}>
                <Reveal delay={i * 80}>
                  <IconCircle icon={d.icon} />
                  <h3 className="mt-5 text-2xl font-medium">{d.title}</h3>
                  <p className="mt-2 text-on-dark">{d.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Depoimentos: um destaque + dois menores */}
      <Section>
        <Reveal>
          <Heading eyebrow={testimonials.eyebrow} title={testimonials.title} lead={testimonials.note} />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="h-full">
            <figure className="relative flex h-full flex-col justify-between rounded-sm bg-surface p-8 md:p-12">
              <span aria-hidden="true" className="font-serif text-[7rem] leading-[0.6] text-brass">
                “
              </span>
              <blockquote className="mt-2 font-serif text-2xl leading-snug md:text-[2rem]">{featured.quote}</blockquote>
              <figcaption className="mt-10 flex items-center gap-3">
                <Avatar initials={featured.initials} />
                <span className="text-sm leading-snug">
                  <strong className="block font-semibold">{featured.name}</strong>
                  <span className="text-muted">{featured.context}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="grid gap-5">
            {others.map((t, i) => (
              <Reveal key={t.name} delay={(i + 1) * 100} className="h-full">
                <figure className="flex h-full flex-col justify-between rounded-sm border border-line p-7">
                  <blockquote className="text-lg">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Avatar initials={t.initials} />
                    <span className="text-sm leading-snug">
                      <strong className="block font-semibold">{t.name}</strong>
                      <span className="text-muted">{t.context}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Faixa full-bleed com imagem, overlay e CTA */}
      <section className="on-dark relative isolate overflow-hidden text-white">
        <Image
          src={band.image.src}
          width={band.image.width}
          height={band.image.height}
          alt={band.image.alt}
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover object-bottom"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
        <Reveal className="wrap py-24 md:py-32">
          <h2 className="max-w-2xl text-4xl font-medium md:text-5xl">{band.title}</h2>
          <p className="mt-5 max-w-xl text-lg text-white/85">{band.text}</p>
          <Link href="/contato" className="btn btn-brass mt-9">
            {site.cta.primary}
          </Link>
        </Reveal>
      </section>

      {/* FAQ resumido: título + CTA à esquerda, accordion à direita */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal>
            <Heading eyebrow={faq.eyebrow} title={faq.title} lead={faq.lead} />
            <Link href="/duvidas-frequentes" className="btn btn-outline mt-8">
              {faq.link}
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Faq items={homeFaq} />
          </Reveal>
        </div>
      </Section>

      <CtaPanel />
      <JsonLd data={faqLd(homeFaq)} />
    </>
  );
}
