import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/content/site";
import { organizationLd, siteUrl } from "@/lib/seo";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Figtree({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.home.metaTitle, template: `%s | ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = { themeColor: "#0F1B2D" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {/* sem JavaScript, o conteúdo com fade-in fica visível */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}
