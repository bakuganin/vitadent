import { useEffect, useState } from "react";

// GA4 measurement ID of the Vitadent web stream (EgaDent analytics account).
// Leave empty to disable analytics entirely.
const GA_MEASUREMENT_ID = "G-TGD9Q2SQJC";

const CONSENT_STORAGE_KEY = "vitadent-analytics-consent";

type Language = "et" | "ru" | "fi" | "en";
type Consent = "granted" | "denied";

const copy: Record<Language, { text: string; policy: string; accept: string; decline: string }> = {
  et: { text: "Kasutame Google Analyticsi küpsiseid, et mõista, kuidas veebilehte kasutatakse.", policy: "Küpsiste poliitika", accept: "Nõustun", decline: "Keeldun" },
  ru: { text: "Мы используем cookie Google Analytics, чтобы понимать, как посетители пользуются сайтом.", policy: "Политика cookie", accept: "Принять", decline: "Отклонить" },
  fi: { text: "Käytämme Google Analyticsin evästeitä ymmärtääksemme, miten sivustoa käytetään.", policy: "Evästekäytäntö", accept: "Hyväksy", decline: "Hylkää" },
  en: { text: "We use Google Analytics cookies to understand how visitors use the website.", policy: "Cookie policy", accept: "Accept", decline: "Decline" },
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function readLanguage(): Language {
  const lang = document.documentElement.lang;
  return lang === "ru" || lang === "fi" || lang === "en" ? lang : "et";
}

let analyticsLoaded = false;

// Loads gtag.js with Consent Mode v2: analytics storage stays denied until the visitor accepts.
function loadAnalytics(consent: Consent | null) {
  if (!GA_MEASUREMENT_ID || analyticsLoaded) return;
  analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: consent === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(readConsent);
  const [language, setLanguage] = useState<Language>(readLanguage);

  useEffect(() => {
    loadAnalytics(readConsent());
    // Pages set <html lang> when the visitor switches language.
    const observer = new MutationObserver(() => setLanguage(readLanguage()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    // Page effects run before this one and may already have set the language.
    setLanguage(readLanguage());
    return () => observer.disconnect();
  }, []);

  if (!GA_MEASUREMENT_ID || consent) return null;

  const choose = (value: Consent) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // Storage unavailable: the choice applies to this visit only.
    }
    if (value === "granted") window.gtag?.("consent", "update", { analytics_storage: "granted" });
    setConsent(value);
  };

  const t = copy[language];

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={t.policy}>
      <p>
        {t.text} <a href="/cookie-policy">{t.policy}</a>
      </p>
      <div className="cookie-consent-actions">
        <button type="button" onClick={() => choose("denied")}>{t.decline}</button>
        <button type="button" className="is-primary" onClick={() => choose("granted")}>{t.accept}</button>
      </div>
    </div>
  );
}
