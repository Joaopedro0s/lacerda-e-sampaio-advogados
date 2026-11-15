import Link from "next/link";
import { ChevronRight, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { site, telUrl, whatsappUrl } from "@/content/site";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./Reveal";

const tones = {
  paper: "bg-paper",
  surface: "bg-surface",
  deep: "bg-paper-deep",
  dark: "on-dark bg-ink text-white",
};

export function Section({
  tone = "paper",
  className = "",
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`${tones[tone]} py-20 md:py-28 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="mt-4 text-[2rem] font-medium md:text-[2.6rem]">{title}</Tag>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  );
}

export function IconCircle({ icon: Icon, className = "" }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={`icon-circle ${className}`}>
      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

/** Cabeçalho das páginas internas: breadcrumb visível + JSON-LD BreadcrumbList. */
export function PageHero({ title, lead, crumbs, children }: { title: string; lead?: string; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--brass-soft),transparent)]"
      />
      <div className="wrap relative py-14 md:py-20">
        <nav aria-label="Você está aqui" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="underline-offset-4 hover:text-ink hover:underline">
                Início
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="underline-offset-4 hover:text-ink hover:underline">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-3xl text-[2.4rem] font-medium md:text-[3.4rem]">{title}</h1>
        {lead && <p className="lead mt-5 max-w-2xl">{lead}</p>}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </section>
  );
}

/** CTA final, repetido de forma discreta no fim das páginas. */
export function CtaPanel() {
  return (
    <Section tone="deep">
      <Reveal className="grid gap-10 border-t-2 border-brass pt-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h2 className="max-w-xl text-[2rem] font-medium md:text-[2.6rem]">{site.cta.title}</h2>
          <p className="lead mt-4 max-w-xl">{site.cta.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link href="/contato" className="btn btn-primary">
            {site.cta.primary}
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <MessageCircle className="size-5" aria-hidden="true" />
            {site.cta.whatsapp}
          </a>
          <a href={telUrl} className="btn btn-outline sm:hidden">
            <Phone className="size-5" aria-hidden="true" />
            {site.contact.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
