import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Header } from "./Header";

// Acessibilidade básica: o menu mobile abre pelo teclado, leva o foco para dentro, fecha com Esc e devolve o foco.
it("menu mobile abre e fecha com teclado e Esc", async () => {
  const user = userEvent.setup();
  render(<Header />);
  const button = screen.getByRole("button", { name: "Abrir menu" });
  const panel = document.getElementById(button.getAttribute("aria-controls")!)!;
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(panel.hidden).toBe(true);

  button.focus();
  await user.keyboard("{Enter}");
  expect(button.getAttribute("aria-expanded")).toBe("true");
  expect(panel.hidden).toBe(false);
  expect(panel.contains(document.activeElement)).toBe(true);
  expect(document.body.style.overflow).toBe("hidden");

  await user.keyboard("{Escape}");
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(panel.hidden).toBe(true);
  expect(document.activeElement).toBe(button);
  expect(document.body.style.overflow).toBe("");
});
