import { contactSchema, fieldErrors } from "@/lib/contact-schema";

// shortcut: sem limite de requisições por IP; adicionar rate limit (ex.: Vercel Firewall) antes de uso real.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // inclui o honeypot preenchido: o erro de "website" não é devolvido ao cliente
    const errors = fieldErrors(parsed.error);
    delete errors.website;
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    // API REST do Resend via fetch: dispensa a dependência "resend"
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || "Site <onboarding@resend.dev>",
        to: CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `Contato pelo site: ${name}`,
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\n${message}`,
      }),
    }).catch(() => null);
    if (!res?.ok) {
      console.error("[contato] falha no envio pelo Resend:", res?.status);
      return Response.json({ ok: false }, { status: 502 });
    }
    return Response.json({ ok: true });
  }

  if (process.env.NODE_ENV === "production") {
    // Em produção, nunca confirmar um envio que não aconteceu.
    console.error("[contato] RESEND_API_KEY e CONTACT_TO_EMAIL não configurados.");
    return Response.json({ ok: false }, { status: 503 });
  }

  console.info("[contato] (desenvolvimento, nada foi enviado)", { name, email, phone, message });
  return Response.json({ ok: true });
}
