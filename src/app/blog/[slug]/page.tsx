import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { CtaPanel, PageHero, Section } from "@/components/Section";
import { formatDate, getArea, getPost, site } from "@/content/site";
import { pageMeta, siteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => site.posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}` });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const area = getArea(post.area);

  return (
    <>
      <PageHero
        title={post.title}
        lead={post.description}
        crumbs={[
          { name: site.blogPage.title, href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      >
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="rounded-full bg-brass-soft px-3 py-0.5 font-semibold text-brass-ink">{site.blogPage.exampleBadge}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min de leitura</span>
        </p>
      </PageHero>

      <Section tone="surface">
        <article className="mx-auto max-w-[68ch]">
          {post.sections.map((s) => (
            <section key={s.heading} className="mb-12">
              <h2 className="text-3xl font-medium">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-5 text-lg text-ink/85">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <p className="border-l-2 border-brass bg-paper p-5 text-sm text-muted">{site.blogPage.disclaimer}</p>

          <div className="mt-10 flex flex-col gap-x-8 border-t border-line pt-6 sm:flex-row sm:justify-between">
            <Link href="/blog" className="link inline-flex min-h-11 items-center">
              Voltar para o blog
            </Link>
            {area && (
              <Link href={`/areas-de-atuacao/${area.slug}`} className="link inline-flex min-h-11 items-center gap-2">
                Conheça a área de {area.title}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </article>
      </Section>

      <CtaPanel />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
        }}
      />
    </>
  );
}
