"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { Faq as FaqItem } from "@/content/site";

/** Accordion acessível: botão com aria-expanded/aria-controls, painel inerte quando fechado, altura animada. */
export function Faq({ items, as: Tag = "h3" }: { items: FaqItem[]; as?: "h2" | "h3" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="border-b border-line">
            <Tag className="font-sans text-base tracking-normal">
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={open}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-lg font-semibold transition-colors duration-200 hover:text-brass-ink"
              >
                {item.question}
                <ChevronDown
                  className={`size-5 shrink-0 text-brass-ink transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </Tag>
            <div
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-b${i}`}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-6 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
