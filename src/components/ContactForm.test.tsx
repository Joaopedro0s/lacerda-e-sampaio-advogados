import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

const fetchMock = vi.fn();
beforeEach(() => vi.stubGlobal("fetch", fetchMock));
afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllGlobals();
});

const valid = { name: "Pessoa de Teste", email: "pessoa@teste.example", phone: "(00) 90000-0000", message: "Gostaria de agendar uma consulta." };

async function fill(user: UserEvent, values: Partial<typeof valid> = {}, consent = true) {
  const v = { ...valid, ...values };
  await user.type(screen.getByLabelText("Nome"), v.name);
  await user.type(screen.getByLabelText("E-mail"), v.email);
  await user.type(screen.getByLabelText("Telefone com DDD"), v.phone);
  await user.type(screen.getByLabelText("Mensagem"), v.message);
  if (consent) await user.click(screen.getByRole("checkbox"));
}
const submit = (user: UserEvent) => user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

describe("ContactForm", () => {
  // Campos obrigatórios: envio vazio mostra um erro por campo, ligado via aria-describedby, e não chama a API.
  it("exige os campos obrigatórios", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await submit(user);

    const name = screen.getByLabelText("Nome");
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById(name.getAttribute("aria-describedby")!)?.textContent).toMatch(/nome completo/i);
    expect(screen.getByText(/e-mail válido/i)).toBeTruthy();
    expect(screen.getByText(/telefone com DDD, como/i)).toBeTruthy();
    expect(screen.getByText(/pelo menos 10 caracteres/i)).toBeTruthy();
    expect(document.activeElement).toBe(name);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // E-mail inválido: mensagem específica no campo de e-mail.
  it("recusa e-mail inválido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user, { email: "pessoa@" });
    await submit(user);

    expect(screen.getByLabelText("E-mail").getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText(/e-mail válido/i)).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // Telefone inválido: precisa ter DDD + número (10 ou 11 dígitos).
  it("recusa telefone inválido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user, { phone: "12345" });
    await submit(user);

    expect(screen.getByLabelText("Telefone com DDD").getAttribute("aria-invalid")).toBe("true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // LGPD: sem marcar o consentimento, o envio é bloqueado.
  it("bloqueia o envio sem consentimento LGPD", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user, {}, false);
    await submit(user);

    expect(screen.getByText(/é preciso autorizar/i)).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // Sucesso: envia os dados validados para /api/contato e mostra a confirmação.
  it("envia com sucesso", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user);
    await submit(user);

    expect(await screen.findByText(site.contactPage.successTitle)).toBeTruthy();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contato");
    expect(JSON.parse(init.body)).toMatchObject({ ...valid, consent: true });
  });

  // Erro do servidor: mostra alerta com caminho de recuperação e mantém o que foi digitado.
  it("exibe erro do servidor sem perder os dados", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status: 502 }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user);
    await submit(user);

    expect((await screen.findByRole("alert")).textContent).toContain(site.contactPage.errorText);
    expect((screen.getByLabelText("Nome") as HTMLInputElement).value).toBe(valid.name);
  });
});
