import Image from "next/image";
import { User } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaPanel, Heading, PageHero, Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const { about } = site;

export const metadata = pageMeta({
  title: about.title,
  description: `${about.lead} ${site.tagline}.`,
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <PageHero title={about.title} lead={about.lead} crumbs={[{ name: about.title, href: "/sobre" }]} />

      {/* História: texto + foto */}
      <Section tone="surface">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <Heading eyebrow={about.history.eyebrow} title={about.history.title} />
            {about.history.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-muted">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120} className="relative">
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 right-8 top-8 rounded-bl-[4.5rem] rounded-tr-[4.5rem] border border-brass" />
            <Image
              src={about.history.image.src}
              width={about.history.image.width}
              height={about.history.image.height}
              alt={about.history.image.alt}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="relative aspect-[4/3] w-full rounded-bl-[4.5rem] rounded-tr-[4.5rem] object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* Missão: frase em destaque */}
      <Section tone="deep">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="eyebrow justify-center font-sans after:h-px after:w-8 after:bg-brass">{about.mission.eyebrow}</h2>
          <p className="mt-8 font-serif text-3xl leading-snug md:text-[2.6rem]">{about.mission.text}</p>
        </Reveal>
      </Section>

      {/* Valores (fundo escuro) */}
      <Section tone="dark">
        <Reveal>
          <Heading eyebrow={about.values.eyebrow} title={about.values.title} />
        </Reveal>
        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.items.map((v, i) => (
            <li key={v.title}>
              <Reveal delay={i * 80} className="border-t border-white/20 pt-6">
                <span aria-hidden="true" className="font-serif text-3xl text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-medium">{v.title}</h3>
                <p className="mt-2 text-on-dark">{v.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Equipe */}
      <Section>
        <Reveal>
          <Heading eyebrow={about.team.eyebrow} title={about.team.title} lead={about.team.lead} />
        </Reveal>
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {site.team.map((member, i) => (
            <li key={member.name}>
              <Reveal delay={i * 80}>
                {member.photo ? (
                  <Image
                    src={member.photo}
                    width={800}
                    height={1000}
                    alt={`Retrato de ${member.name}`}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="aspect-[4/5] w-full rounded-sm object-cover"
                  />
                ) : (
                  // Placeholder com a mesma proporção do retrato (ver docs/imagens-pendentes.md)
                  <div
                    role="img"
                    aria-label={`Retrato de ${member.name} (foto a adicionar)`}
                    className="flex aspect-[4/5] w-full items-end justify-center overflow-hidden rounded-sm bg-gradient-to-b from-brass-soft to-paper-deep"
                  >
                    <User className="size-3/4 translate-y-[12%] text-brass/55" strokeWidth={0.75} aria-hidden="true" />
                  </div>
                )}
                <h3 className="mt-5 text-2xl font-medium">{member.name}</h3>
                <p className="mt-1 font-semibold text-brass-ink">{member.role}</p>
                <p className="mt-3 text-sm text-muted">{member.education}</p>
                <p className="text-sm text-muted">{member.registry}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaPanel />
    </>
  );
}
