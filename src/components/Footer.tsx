import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { mailUrl, site, telUrl, whatsappUrl } from "@/content/site";
import { EmailText } from "./EmailText";
import { IconCircle } from "./Section";
import { SocialLinks } from "./SocialLinks";
import { Wordmark } from "./Wordmark";

const link = "underline-offset-4 transition-colors duration-200 hover:text-white hover:underline";
const columnTitle = "flex min-h-9 items-center gap-3 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white";

export function Footer() {
  return (
    <footer className="on-dark bg-ink pb-16 text-on-dark md:pb-0">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1.25fr_0.9fr_0.8fr]">
        <div>
          <div className="text-white">
            <Wordmark />
          </div>
          <p className="mt-5 max-w-xs">{site.description}</p>
          <p className="mt-3 text-sm">{site.registryNumber}</p>
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <h2 className={columnTitle}>
            <IconCircle icon={MapPin} className="!size-9" />
            Contato
          </h2>
          <address className="mt-5 not-italic">
            <p className="mb-3">
              {site.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a href={telUrl} className={`flex min-h-11 items-center gap-2 whitespace-nowrap ${link}`}>
              <Phone className="size-4 shrink-0 text-brass" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`flex min-h-11 items-center gap-2 whitespace-nowrap ${link}`}>
              <MessageCircle className="size-4 shrink-0 text-brass" aria-hidden="true" />
              WhatsApp {site.contact.whatsappDisplay}
            </a>
            <a href={mailUrl} className={`flex min-h-11 items-center gap-2 ${link}`}>
              <Mail className="size-4 shrink-0 text-brass" aria-hidden="true" />
              <EmailText email={site.contact.email} />
            </a>
          </address>
        </div>

        <div>
          <h2 className={columnTitle}>
            <IconCircle icon={Clock} className="!size-9" />
            Horários
          </h2>
          <dl className="mt-5 space-y-3">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt className="text-white">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Links rápidos">
          <h2 className={columnTitle}>Links rápidos</h2>
          <ul className="mt-5">
            {[...site.nav.slice(1), { label: site.privacy.title, href: "/privacidade" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`inline-flex min-h-11 items-center ${link}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap space-y-3 py-6 text-[0.9rem]">
          <p>
            <strong className="font-semibold text-brass">{site.demoNotice}.</strong> {site.legalLine}
          </p>
          <p>
            Fotos:{" "}
            {site.photoCredits.map((c, i) => (
              <span key={c.href}>
                {i > 0 && " · "}
                <a href={c.href} target="_blank" rel="noopener noreferrer" className={`underline ${link}`}>
                  {c.title}
                </a>
                , {c.author} ({c.license})
              </span>
            ))}
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
