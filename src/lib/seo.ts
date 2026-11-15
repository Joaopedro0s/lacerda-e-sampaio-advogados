import type { Metadata } from "next";
import { segment, site, type Faq } from "@/content/site";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://escritorio.example").replace(/\/$/, "");

export type Crumb = { name: string; href: string };

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "pt_BR",
      type: "website",
      images: [{ url: site.home.hero.image.src, width: site.home.hero.image.width, height: site.home.hero.image.height }],
    },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": segment.schemaType,
  name: site.name,
  description: site.description,
  url: siteUrl,
  image: siteUrl + site.home.hero.image.src,
  telephone: site.contact.phoneE164,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.addressLines[0],
    addressLocality: site.city,
    addressCountry: "BR",
  },
  areaServed: site.city,
  openingHours: "Mo-Fr 09:00-18:00",
  knowsAbout: site.areas.map((a) => a.title),
});

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Início", href: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: siteUrl + c.href,
  })),
});

export const faqLd = (items: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});
