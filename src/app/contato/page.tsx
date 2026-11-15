import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { IconCircle, PageHero, Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { mailUrl, site, telUrl, whatsappUrl } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const page = site.contactPage;

export const metadata = pageMeta({
  title: `${page.title} e agendamento em ${site.city}`,
  description: page.lead,
  path: "/contato",
});

function Item({ icon, title, children }: { icon: typeof Phone; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 py-5">
      <IconCircle icon={icon} />
      <div>
        <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">{title}</h3>
        <div className="mt-1 text-lg">{children}</div>
      </div>
    </li>
  );
}

export default function ContatoPage() {
  const { contact } = site;

  return (
    <>
      <PageHero title={page.title} lead={page.lead} crumbs={[{ name: page.title, href: "/contato" }]} />

      <Section tone="surface">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-medium">{page.formTitle}</h2>
            <p className="mb-8 mt-3 text-muted">{page.formLead}</p>
            <ContactForm />
          </Reveal>

          <Reveal delay={120}>
            <h2 className="sr-only">Canais de atendimento</h2>
            <ul className="divide-y divide-line border-y border-line">
              <Item icon={Phone} title="Telefone">
                <a href={telUrl} className="link inline-flex min-h-11 items-center">
                  {contact.phoneDisplay}
                </a>
              </Item>
              <Item icon={MessageCircle} title="WhatsApp">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
                  {contact.whatsappDisplay}
                </a>
              </Item>
              <Item icon={Mail} title="E-mail">
                <a href={mailUrl} className="link inline-flex min-h-11 items-center break-all">
                  {contact.email}
                </a>
              </Item>
              <Item icon={MapPin} title="Endereço">
                <address className="not-italic">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Item>
              <Item icon={Clock} title="Horários">
                <dl>
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex flex-wrap gap-x-2">
                      <dt>{h.days}:</dt>
                      <dd className="text-muted">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </Item>
            </ul>
            <SocialLinks className="mt-6" />
          </Reveal>
        </div>
      </Section>

      <section className="bg-paper-deep" aria-labelledby="mapa-titulo">
        <div className="wrap py-16">
          <h2 id="mapa-titulo" className="text-3xl font-medium">
            {page.mapTitle}
          </h2>
          {/* Google Maps sem chave de API. mapQuery é uma rua real só para posicionar o pin; o endereço exibido no site é fictício. */}
          <iframe
            title={`Mapa: localização do ${site.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-8 h-[26rem] w-full rounded-sm border border-line"
          />
        </div>
      </section>
    </>
  );
}
