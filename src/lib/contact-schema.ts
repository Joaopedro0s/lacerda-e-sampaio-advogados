import { z } from "zod";

const required = "Preencha este campo.";

/** Validação única do formulário de contato, usada no cliente e no route handler. */
export const contactSchema = z.object({
  name: z.string(required).trim().min(2, "Informe seu nome completo.").max(120, "Use até 120 caracteres."),
  email: z.string(required).trim().pipe(z.email("Informe um e-mail válido, como nome@exemplo.com.")),
  phone: z
    .string(required)
    .trim()
    // 10 ou 11 dígitos (DDD + número), com ou sem pontuação
    .refine((v) => /^\d{10,11}$/.test(v.replace(/[\s().-]/g, "")), "Informe um telefone com DDD, como (11) 91234-5678."),
  message: z.string(required).trim().min(10, "Conte um pouco mais: use pelo menos 10 caracteres.").max(3000, "Use até 3000 caracteres."),
  consent: z.literal(true, "Para enviar, é preciso autorizar o uso dos dados."),
  website: z.string().max(0).optional(), // honeypot: deve chegar vazio
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function fieldErrors(error: z.ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    out[key] ??= issue.message;
  }
  return out;
}
