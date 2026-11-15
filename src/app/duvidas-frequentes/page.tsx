import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section } from "@/components/Section";
import { site, whatsappUrl } from "@/content/site";
import { faqLd, pageMeta } from "@/lib/seo";

const page = site.faqPage;

export const metadata = pageMeta({
  title: page.title,
  description: `${page.lead} ${site.tagline}.`,
  path: "/duvidas-frequentes",
});

export default function FaqPage() {
  return (
    <>
      <PageHero title={page.title} lead={page.lead} crumbs={[{ name: page.title, href: "/duvidas-frequentes" }]} />

      <Section tone="surface">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Faq items={site.faq} as="h2" />

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border-t-2 border-brass bg-paper p-8">
              <h2 className="text-2xl font-medium">{page.asideTitle}</h2>
              <p className="mt-3 text-muted">{page.asideText}</p>
              <Link href="/contato" className="btn btn-primary mt-7 w-full">
                {site.cta.primary}
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-3 w-full">
                <MessageCircle className="size-5" aria-hidden="true" />
                {site.cta.whatsapp}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd data={faqLd(site.faq)} />
    </>
  );
}
