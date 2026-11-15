// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const valid = {
  name: "Pessoa de Teste",
  email: "pessoa@teste.example",
  phone: "(00) 90000-0000",
  message: "Gostaria de agendar uma consulta.",
  consent: true,
  website: "",
};

const post = (body: unknown) =>
  POST(new Request("http://localhost/api/contato", { method: "POST", body: JSON.stringify(body) }));

describe("POST /api/contato", () => {
  // Payload inválido: responde 400 com os erros por campo (validação repetida no servidor).
  it("rejeita payload inválido", async () => {
    const res = await post({ ...valid, email: "invalido", consent: false });
    expect(res.status).toBe(400);
    const { errors } = await res.json();
    expect(errors.email).toBeTruthy();
    expect(errors.consent).toBeTruthy();
  });

  // Honeypot: se o campo oculto vier preenchido, a mensagem é recusada.
  it("rejeita honeypot preenchido", async () => {
    const res = await post({ ...valid, website: "https://spam.example" });
    expect(res.status).toBe(400);
  });

  // Payload válido sem credenciais: fora de produção apenas registra no console e responde sucesso.
  it("aceita payload válido", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(info).toHaveBeenCalled();
  });
});
