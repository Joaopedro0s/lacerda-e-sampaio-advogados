import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MessageCircle, Phone, Star } from "lucide-react";
import { AreaCard } from "@/components/AreaCard";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { CtaPanel, Heading, IconCircle, Section } from "@/components/Section";
import { TeamCard } from "@/components/TeamCard";
import { site, telUrl, whatsappUrl } from "@/content/site";
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

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`${rating} de 5 estrelas`} className="flex gap-0.5 text-brass-ink">
      {Array.from({ length: rating }, (_, i) => (
        <Star key={i} className="size-4 fill-current" aria-hidden="true" />
      ))}
    </div>
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
            <div className="absolute -left-2 bottom-4 flex max-w-[13.5rem] items-center gap-2.5 rounded-sm border border-line bg-surface p-2.5 shadow-xl shadow-ink/15 sm:bottom-6 sm:max-w-[17.5rem] sm:gap-3 sm:p-4 lg:-left-12 lg:bottom-12">
              <IconCircle icon={hero.card.icon} className="max-sm:!size-9" />
              <p className="text-xs leading-snug sm:text-sm">
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

      {/* Equipe: 2 sócios + 1 associado. No mobile vira carrossel com scroll-snap, rolável por teclado. */}
      <Section tone="surface">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Heading eyebrow={site.about.team.eyebrow} title={site.about.team.title} />
          <Link href="/sobre" className="link inline-flex min-h-11 items-center gap-2">
            {site.home.team.link}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div
          role="region"
          aria-label={site.about.team.title}
          tabIndex={0}
          className="-mx-5 mt-12 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-3 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
        >
          <ul className="flex gap-5 md:grid md:grid-cols-3 md:gap-8">
            {site.team.slice(0, 3).map((member) => (
              <li key={member.name} className="w-[78%] shrink-0 snap-start md:w-auto">
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>
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
              <Stars rating={featured.rating} />
              <blockquote className="mt-4 font-serif text-2xl leading-snug md:text-[2rem]">{featured.quote}</blockquote>
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
                <figure className="flex h-full flex-col rounded-sm border border-line bg-surface p-7">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-4 flex-1 text-lg">{t.quote}</blockquote>
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
        {/* mobile: overlay uniforme (texto ocupa a largura toda); desktop: escuro só à esquerda */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-ink/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink lg:from-40% lg:via-ink/85 lg:via-60% lg:to-ink/15"
        />
        <Reveal className="wrap grid gap-12 py-24 md:py-28 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h2 className="max-w-2xl text-4xl font-medium md:text-5xl">{band.title}</h2>
            <p className="mt-5 max-w-xl text-lg text-white/90">{band.text}</p>
            <Link href="/contato" className="btn btn-brass mt-9">
              {site.cta.primary}
            </Link>
          </div>
          <div className="hidden rounded-sm bg-surface p-7 text-ink shadow-2xl shadow-ink/40 lg:block">
            <h3 className="text-2xl font-medium">{band.cardTitle}</h3>
            <ul className="mt-4 divide-y divide-line">
              <li>
                <a href={telUrl} className="flex min-h-12 items-center gap-3 font-semibold underline-offset-4 hover:underline">
                  <Phone className="size-5 text-brass-ink" aria-hidden="true" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 font-semibold underline-offset-4 hover:underline">
                  <MessageCircle className="size-5 text-brass-ink" aria-hidden="true" />
                  WhatsApp {site.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex min-h-12 items-center gap-3 text-muted">
                <Clock className="size-5 shrink-0 text-brass-ink" aria-hidden="true" />
                {site.hours[0].days}, {site.hours[0].time}
              </li>
            </ul>
          </div>
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
