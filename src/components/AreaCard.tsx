import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Area } from "@/content/site";
import { IconCircle } from "./Section";

export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas-de-atuacao/${area.slug}`}
      className="group flex h-full flex-col rounded-sm border border-line bg-surface p-7 transition duration-200 hover:-translate-y-1 hover:border-brass hover:shadow-xl hover:shadow-ink/10"
    >
      <IconCircle icon={area.icon} />
      <h3 className="mt-6 text-2xl font-medium">{area.title}</h3>
      <p className="mt-3 flex-1 text-muted">{area.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brass-ink">
        Saiba mais
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
