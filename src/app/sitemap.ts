import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/sobre",
    "/areas-de-atuacao",
    ...site.areas.map((a) => `/areas-de-atuacao/${a.slug}`),
    "/duvidas-frequentes",
    "/blog",
    ...site.posts.map((p) => `/blog/${p.slug}`),
    "/contato",
    "/privacidade",
  ];
  return paths.map((path) => ({ url: siteUrl + path }));
}
