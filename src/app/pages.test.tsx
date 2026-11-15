import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/content/site";
import AreaPage from "./areas-de-atuacao/[slug]/page";
import ContatoPage from "./contato/page";
import HomePage from "./page";
import PrivacidadePage from "./privacidade/page";
import SobrePage from "./sobre/page";

// Renderização: cada página mostra seu h1 e o aviso de dados fictícios (faixa do topo + rodapé).
function expectPage(page: ReactNode, h1: string) {
  render(<SiteShell>{page}</SiteShell>);
  expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeTruthy();
  expect(screen.getAllByText(site.demoNotice, { exact: false }).length).toBeGreaterThanOrEqual(2);
}

describe("páginas", () => {
  it("home", () => expectPage(<HomePage />, site.home.hero.title));
  it("sobre", () => expectPage(<SobrePage />, site.about.title));
  it("área de atuação", async () => {
    const area = site.areas[0];
    expectPage(await AreaPage({ params: Promise.resolve({ slug: area.slug }) }), area.title);
  });
  it("contato", () => expectPage(<ContatoPage />, site.contactPage.title));
  it("privacidade", () => expectPage(<PrivacidadePage />, site.privacy.title));
});
