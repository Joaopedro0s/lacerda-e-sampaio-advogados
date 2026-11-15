import Link from "next/link";
import { site } from "@/content/site";

/** Logo tipográfico gerado a partir de site.name: trocar o dado troca o logo. */
export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex min-h-12 items-center gap-3" aria-label={`${site.name}: página inicial`}>
      <span
        aria-hidden="true"
        className="size-2.5 rotate-45 bg-brass transition-transform duration-200 group-hover:rotate-[135deg]"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight sm:text-xl">{site.name}</span>
        <span className="mt-1.5 hidden text-[0.68rem] font-semibold uppercase tracking-[0.2em] opacity-70 sm:block">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
