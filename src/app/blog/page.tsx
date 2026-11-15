import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaPanel, PageHero, Section } from "@/components/Section";
import { formatDate, getArea, site, type Post } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const page = site.blogPage;

export const metadata = pageMeta({
  title: page.title,
  description: `${page.lead} ${site.tagline}.`,
  path: "/blog",
});

function PostMeta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <span className="rounded-full bg-brass-soft px-3 py-0.5 font-semibold text-brass-ink">{page.exampleBadge}</span>
      <span>{getArea(post.area)?.title}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
    </p>
  );
}

export default function BlogPage() {
  const [first, ...rest] = site.posts;

  return (
    <>
      <PageHero title={page.title} lead={page.lead} crumbs={[{ name: page.title, href: "/blog" }]} />

      <Section tone="surface">
        <h2 className="sr-only">Artigos</h2>
        {/* primeiro artigo em destaque, os demais em duas colunas */}
        <Reveal>
          <Link
            href={`/blog/${first.slug}`}
            className="group block rounded-sm border border-line bg-paper p-8 transition duration-200 hover:-translate-y-1 hover:border-brass hover:shadow-xl hover:shadow-ink/10 md:p-12"
          >
            <PostMeta post={first} />
            <h3 className="mt-5 max-w-3xl text-3xl font-medium md:text-[2.6rem]">{first.title}</h3>
            <p className="lead mt-4 max-w-2xl">{first.description}</p>
            <span className="mt-7 inline-flex items-center gap-2 font-semibold text-brass-ink">
              Ler artigo
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>

        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 100} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-sm border border-line p-8 transition duration-200 hover:-translate-y-1 hover:border-brass hover:shadow-xl hover:shadow-ink/10"
                >
                  <PostMeta post={post} />
                  <h3 className="mt-5 text-2xl font-medium">{post.title}</h3>
                  <p className="mt-3 flex-1 text-muted">{post.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brass-ink">
                    Ler artigo
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaPanel />
    </>
  );
}
