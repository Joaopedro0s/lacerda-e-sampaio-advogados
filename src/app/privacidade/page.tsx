import { PageHero, Section } from "@/components/Section";
import { formatDate, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const page = site.privacy;

export const metadata = pageMeta({ title: page.title, description: page.lead, path: "/privacidade" });

export default function PrivacidadePage() {
  return (
    <>
      <PageHero title={page.title} lead={page.lead} crumbs={[{ name: page.title, href: "/privacidade" }]}>
        <p className="mt-6 text-sm text-muted">
          Última atualização: <time dateTime={page.updatedAt}>{formatDate(page.updatedAt)}</time>
        </p>
      </PageHero>

      <Section tone="surface">
        <div className="mx-auto max-w-[68ch]">
          {page.sections.map((s) => (
            <section key={s.heading} className="mb-12 last:mb-0">
              <h2 className="text-3xl font-medium">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-5 text-ink/85">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
