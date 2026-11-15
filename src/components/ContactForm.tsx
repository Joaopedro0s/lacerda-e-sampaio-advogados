"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { contactSchema, fieldErrors, type ContactErrors } from "@/lib/contact-schema";

const empty = { name: "", email: "", phone: "", message: "", consent: false, website: "" };
const order = ["name", "email", "phone", "message", "consent"] as const;
const text = site.contactPage;

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (key: keyof typeof empty, value: string | boolean) => setValues((v) => ({ ...v, [key]: value }));

  function showErrors(next: ContactErrors) {
    setErrors(next);
    const first = order.find((k) => next[k]);
    if (first) document.getElementById(`contato-${first}`)?.focus();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) return showErrors(fieldErrors(parsed.error));

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setValues(empty);
        setStatus("success");
        return;
      }
      const body = await res.json().catch(() => null);
      if (res.status === 400 && body?.errors) {
        setStatus("idle");
        return showErrors(body.errors);
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-sm border border-line bg-paper p-8">
        <CircleCheck className="size-10 text-brass-ink" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-medium">{text.successTitle}</h3>
        <p className="mt-2 text-muted">{text.successText}</p>
        <button type="button" className="btn btn-outline mt-6" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const field = (key: "name" | "email" | "phone" | "message", label: string, props: Record<string, string>) => {
    const id = `contato-${key}`;
    const shared = {
      id,
      name: key,
      value: values[key],
      required: true,
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? `${id}-erro` : undefined,
      className: "field mt-2",
      ...props,
    };
    return (
      <div className={key === "message" || key === "name" ? "sm:col-span-2" : ""}>
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        {key === "message" ? (
          <textarea rows={5} {...shared} onChange={(e) => set(key, e.target.value)} />
        ) : (
          <input {...shared} onChange={(e) => set(key, e.target.value)} />
        )}
        {errors[key] && (
          <p id={`${id}-erro`} className="mt-1.5 text-sm font-medium text-red-800">
            {errors[key]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {field("name", "Nome", { type: "text", autoComplete: "name" })}
      {field("email", "E-mail", { type: "email", autoComplete: "email", inputMode: "email" })}
      {field("phone", "Telefone com DDD", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
      {field("message", "Mensagem", {})}

      {/* Honeypot: invisível para pessoas; robôs costumam preencher */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="contato-website">Não preencha este campo</label>
        <input
          id="contato-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id="contato-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "contato-consent-erro" : undefined}
            onChange={(e) => set("consent", e.target.checked)}
            className="size-6 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-field bg-white transition-colors duration-150 checked:border-ink checked:bg-ink checked:shadow-[inset_0_0_0_3px_white] aria-invalid:border-red-700"
          />
          <label htmlFor="contato-consent" className="cursor-pointer text-[0.95rem] text-muted">
            Autorizo o uso dos meus dados para retorno deste contato, conforme o{" "}
            <Link href="/privacidade" className="link">
              {site.privacy.title}
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="contato-consent-erro" className="mt-1.5 text-sm font-medium text-red-800">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="flex gap-3 rounded-sm border border-red-800/30 bg-red-50 p-4 text-[0.95rem] text-red-900 sm:col-span-2">
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          {text.errorText}
        </p>
      )}

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          {status === "sending" ? "Enviando…" : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}
