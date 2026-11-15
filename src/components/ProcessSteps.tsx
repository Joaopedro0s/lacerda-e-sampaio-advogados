import { site } from "@/content/site";

/** "Como é o atendimento": passos numerados, reutilizados na home e nas páginas de área. */
export function ProcessSteps({ columns = false }: { columns?: boolean }) {
  return (
    <ol className={columns ? "grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" : "divide-y divide-line border-y border-line"}>
      {site.process.map((step, i) => (
        <li key={step.title} className={columns ? "border-t-2 border-brass pt-5" : "flex gap-6 py-6"}>
          <span aria-hidden="true" className="font-serif text-3xl leading-none text-brass-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className={columns ? "mt-4" : ""}>
            <h3 className="font-sans text-lg font-semibold tracking-normal">{step.title}</h3>
            <p className="mt-1.5 text-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
