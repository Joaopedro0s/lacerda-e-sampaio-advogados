"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Menu aberto: foco preso, Esc e clique fora fecham, scroll travado, foco devolvido ao botão.
  useEffect(() => {
    if (!open) return;
    const button = buttonRef.current!;
    const panel = panelRef.current!;
    const items = () => [button, ...panel.querySelectorAll<HTMLElement>("a, button")];
    items()[1]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const list = items();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panel.contains(target) && !button.contains(target)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.body.style.overflow = "";
      button.focus();
    };
  }, [open]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Wordmark onClick={close} />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="relative py-2 text-[0.95rem] font-medium text-ink/80 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-brass after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100 aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contato" className="btn btn-primary hidden md:inline-flex">
            {site.cta.primary}
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="flex size-12 items-center justify-center rounded-sm border border-ink/20 transition-colors duration-200 hover:border-ink lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] animate-[menu-in_200ms_ease-out] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Menu" className="wrap flex flex-col py-6">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center font-serif text-2xl aria-[current=page]:text-brass-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contato" onClick={close} className="btn btn-primary mt-8">
            {site.cta.primary}
          </Link>
        </nav>
      </div>
    </header>
  );
}
