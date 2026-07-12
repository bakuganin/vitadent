import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Cookie as CookieIcon,
  FileText,
  Languages,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
} from "lucide-react";

type Language = "et" | "ru" | "fi" | "en";

type LegalSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type LegalCopy = {
  type: "privacy" | "terms" | "cookie";
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
};

type LegalPageProps = {
  documents: Partial<Record<Language, LegalCopy>> & Record<"et", LegalCopy>;
};

const LANGUAGE_STORAGE_KEY = "vitadent-language";

const chromeCopy = {
  et: {
    back: "Avalehele",
    language: "Keel",
    legal: "Juriidilised dokumendid",
    privacy: "Privaatsuspoliitika",
    terms: "Teenustingimused",
    cookie: "Cookie",
    contacts: "Kontakt",
    company: "VITADENT OÜ",
    registry: "Reg. nr: 11292810",
    address: "Haigla tn 6, 20104 Narva, Eesti",
  },
  ru: {
    back: "На главную",
    language: "Язык",
    legal: "Юридические документы",
    privacy: "Политика конфиденциальности",
    terms: "Условия обслуживания",
    cookie: "Cookie",
    contacts: "Контакт",
    company: "VITADENT OÜ",
    registry: "Рег. номер: 11292810",
    address: "Haigla tn 6, 20104 Нарва, Эстония",
  },
  fi: {
    back: "Etusivulle",
    language: "Kieli",
    legal: "Juridiset asiakirjat",
    privacy: "Tietosuojakäytäntö",
    terms: "Palveluehdot",
    cookie: "Cookie",
    contacts: "Yhteystiedot",
    company: "VITADENT OÜ",
    registry: "Rek. nro: 11292810",
    address: "Haigla tn 6, 20104 Narva, Viro",
  },
  en: {
    back: "Home",
    language: "Language",
    legal: "Legal documents",
    privacy: "Privacy policy",
    terms: "Terms of service",
    cookie: "Cookie",
    contacts: "Contact",
    company: "VITADENT OÜ",
    registry: "Reg. no: 11292810",
    address: "Haigla tn 6, 20104 Narva, Estonia",
  },
} satisfies Record<Language, Record<string, string>>;

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "et";
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage === "ru" || storedLanguage === "fi" || storedLanguage === "en" ? storedLanguage : "et";
}

function getDocumentIcon(type: LegalCopy["type"]) {
  if (type === "privacy") return ShieldCheck;
  if (type === "terms") return Scale;
  return CookieIcon;
}

export default function LegalPage({ documents }: LegalPageProps) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const content = documents[language] ?? documents.en ?? documents.et;
  const t = chromeCopy[language];
  const DocumentIcon = useMemo(() => getDocumentIcon(content.type), [content.type]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  return (
    <main className="legal-page-shell">
      <div className="legal-page-inner">
        <nav className="legal-topbar" aria-label={t.legal}>
          <a className="legal-back-link" href="/">
            <ArrowLeft aria-hidden="true" />
            <span>{t.back}</span>
          </a>

          <div className="legal-language-switch" aria-label={t.language}>
            <Languages aria-hidden="true" />
            {(["et", "ru", "fi", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                className={language === code ? "is-active" : ""}
                onClick={() => setLanguage(code)}
                aria-pressed={language === code}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>

        <header className="legal-hero">
          <div className="legal-hero-icon">
            <DocumentIcon aria-hidden="true" />
          </div>
          <span className="legal-eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
          <time>{content.updated}</time>
        </header>

        <section className="legal-contact-strip" aria-label={t.contacts}>
          <div>
            <Building2 aria-hidden="true" />
            <span>{t.company}</span>
          </div>
          <div>
            <FileText aria-hidden="true" />
            <span>{t.registry}</span>
          </div>
          <div>
            <Phone aria-hidden="true" />
            <a href="tel:+37258508890">+372 58 508 890</a>
          </div>
          <div>
            <Mail aria-hidden="true" />
            <a href="mailto:infovitadent24@gmail.com">infovitadent24@gmail.com</a>
          </div>
        </section>

        <div className="legal-document">
          {content.sections.map((section, index) => (
            <section className="legal-section" key={section.title}>
              <span className="legal-section-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <footer className="legal-footer">
          <p>&copy; 2026 {t.company} · {t.registry} · {t.address}</p>
          <div>
            <a href="/privacy-policy">{t.privacy}</a>
            <a href="/terms-of-service">{t.terms}</a>
            <a href="/cookie-policy">{t.cookie}</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
