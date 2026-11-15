import { AreaCard } from "@/components/AreaCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { CtaPanel, Heading, PageHero, Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const page = site.areasPage;

export const metadata = pageMeta({
  title: `${page.title} em ${site.city}`,
  description: `${page.lead} ${site.areas.map((a) => a.title).join(", ")}.`,
  path: "/areas-de-atuacao",
});

export default function AreasPage() {
  return (
    <>
      <PageHero title={page.title} lead={page.lead} crumbs={[{ name: page.title, href: "/areas-de-atuacao" }]} />

      <Section tone="deep">
        <h2 className="sr-only">Todas as áreas</h2>
        <ul className="grid gap-5 sm:grid-cols-2">
          {site.areas.map((area, i) => (
            <li key={area.slug}>
              <Reveal delay={(i % 2) * 100} className="h-full">
                <AreaCard area={area} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <Reveal>
          <Heading title={page.processTitle} lead={page.processLead} />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <ProcessSteps columns />
        </Reveal>
      </Section>

      <CtaPanel />
    </>
  );
}
