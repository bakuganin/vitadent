import { useEffect, useRef, useState } from "react";
import { Activity, ChevronLeft, ChevronRight, Cross, Droplets, MapPin, Phone, ScanLine, ShieldPlus, Sparkles, Syringe, type LucideIcon } from "lucide-react";

type Language = "et" | "ru" | "fi" | "en";

const LANGUAGE_STORAGE_KEY = "vitadent-language";

const copy = {
  et: { back: "Avalehele", language: "Keel", title: "Hinnakiri", lead: "Vitadent ametlik hinnakiri. Lõplik raviplaan koostatakse individuaalselt.", service: "Teenus", price: "Hind", note: "Broneeri aeg" },
  ru: { back: "На главную", language: "Язык", title: "Цены", lead: "Официальный прайс-лист Vitadent. Окончательный план лечения составляется индивидуально.", service: "Услуга", price: "Цена", note: "Записаться на прием" },
  fi: { back: "Etusivulle", language: "Kieli", title: "Hinnasto", lead: "Vitadentin virallinen hinnasto. Lopullinen hoitosuunnitelma laaditaan yksilöllisesti.", service: "Palvelu", price: "Hinta", note: "Varaa aika" },
  en: { back: "Home", language: "Language", title: "Price list", lead: "Vitadent's official price list. The final treatment plan is prepared individually.", service: "Service", price: "Price", note: "Book an appointment" },
} as const;

const priceGroups = [
  ["Общее", [["Плановый контроль", "15 €"], ["Анестезия", "15 €"], ["Дигитальный рентген (прицельный снимок)", "25 €"], ["Каждый последующий рентген", "10 €"], ["Коффердам", "15 €"], ["Фотостатус зубов (дентальная фотография)", "25 €"], ["Приём вне очереди", "30 €"]]],
  ["Реставрации (пломбы)", [["Реставрация жевательной группы зубов (композитный материал)", "60–90 €"], ["Реставрация (СИЦ)", "35–65 €"], ["Реставрация фронтальной группы зубов (композитный материал)", "80–110 €"], ["Стекловолоконный штифт", "65 €"]]],
  ["Лечение каналов", [["Лечение зуба с 1 корнем", "190–250 €"], ["Лечение зуба с 2 корнями", "250–290 €"], ["Лечение зуба с 3 и более корнями", "350–650 €"]]],
  ["Имплантология", [["Имплантат", "от 550 €"], ["Наращивание кости", "от 200 €"]]],
  ["Хирургия", [["Простое удаление подвижного зуба", "45 €"], ["Удаление однокорневого зуба", "60 €"], ["Удаление многокорневого зуба", "90 €"], ["Сложное удаление зуба", "от 130 €"]]],
  ["Протезирование", [["Коронка", "250 €"], ["Временная коронка", "110 €"], ["Акриловый протез (один)", "350 €"], ["Акриловые протезы (два)", "650 €"], ["Бюгельный протез", "650 €"], ["Тотальный протез (один)", "650 €"], ["Тотальный протез (оба)", "1100 €"], ["Починка протеза", "120 €"], ["Приварка коронки к протезу", "90 €"], ["Фиксация выпавшей коронки, изготовленной в другой клинике", "50 €"]]],
  ["Лечение пародонтита", [["Чистка десневого кармана глубиной менее 6 мм", "15 €"], ["Чистка десневого кармана глубиной более 6 мм", "25 €"], ["Чистка 4–6 карманов глубиной менее 6 мм", "110 €"], ["Чистка 4–6 карманов глубиной более 6 мм", "130 €"], ["Чистка 10–14 карманов глубиной менее 6 мм", "200 €"], ["Чистка 10–14 карманов глубиной более 6 мм", "250 €"]]],
  ["Гигиеническая чистка", [["Профилактическая чистка (полировка пастой)", "30 €"], ["Профессиональная чистка Air-Flow", "75–90 €"]]],
] as const;

const priceIcons: LucideIcon[] = [ScanLine, Sparkles, Activity, ShieldPlus, Syringe, Cross, Activity, Droplets];

function getInitialLanguage(): Language {
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "ru" || stored === "fi" || stored === "en" ? stored : "et";
}

export default function PriceList() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [activeGroup, setActiveGroup] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const t = copy[language];
  const [activeTitle, activeServices] = priceGroups[activeGroup];
  const ActiveIcon = priceIcons[activeGroup];

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const scrollTabs = (direction: -1 | 1) => tabListRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });

  return <main className="price-page-shell"><header className="price-site-header">
    <a className="price-brand" href="/"><img src="/vitadent-logo.png" alt="Vitadent Hambakliinik" /></a>
    <nav className="price-site-nav" aria-label={t.title}><a href="/">{language === "ru" ? "Главная" : language === "et" ? "Avaleht" : language === "fi" ? "Etusivu" : "Home"}</a><a href="/#contact">{language === "ru" ? "Контакты" : language === "et" ? "Kontakt" : language === "fi" ? "Yhteystiedot" : "Contacts"}</a></nav>
    <div className="price-header-actions"><span><MapPin aria-hidden="true" />Narva, Haigla tn 6</span><div className="price-language-switch" aria-label={t.language}>{(["et", "ru", "fi", "en"] as const).map((code) => <button key={code} type="button" className={language === code ? "is-active" : ""} onClick={() => setLanguage(code)} aria-pressed={language === code}>{code.toUpperCase()}</button>)}</div><a href="tel:+37258508890"><Phone aria-hidden="true" />{language === "ru" ? "Позвонить" : language === "et" ? "Helista" : language === "fi" ? "Soita" : "Call"}</a></div>
  </header><div className="price-page-inner">
    <header className="price-hero"><span>Vitadent</span><h1>{t.title}</h1><p>{t.lead}</p></header>
    <div className="price-tabs-shell"><button className="price-tabs-arrow" type="button" onClick={() => scrollTabs(-1)} aria-label="Previous categories"><ChevronLeft aria-hidden="true" /></button><div ref={tabListRef} className="price-tabs" role="tablist" aria-label={t.title}>{priceGroups.map(([title], index) => { const Icon = priceIcons[index]; return <button key={title} type="button" role="tab" aria-selected={activeGroup === index} className={activeGroup === index ? "is-active" : ""} onClick={() => setActiveGroup(index)}><Icon aria-hidden="true" /><span>{title}</span></button>; })}</div><button className="price-tabs-arrow" type="button" onClick={() => scrollTabs(1)} aria-label="Next categories"><ChevronRight aria-hidden="true" /></button></div>
    <div className="price-groups"><section className="price-group"><div className="price-group-heading"><div><span className="price-group-kicker">Vitadent</span><h2>{activeTitle}</h2></div><span className="price-group-number">{String(activeGroup + 1).padStart(2, "0")}</span></div><div className="price-table" role="table"><div className="price-table-head" role="row"><span>{t.service}</span><span>{t.price}</span></div>{activeServices.map(([service, price]) => <div className="price-row" role="row" key={service}><span data-label={t.service}>{service}</span><strong data-label={t.price}>{price}</strong></div>)}</div><div className="price-group-footer"><ActiveIcon aria-hidden="true" /><span>{activeTitle}</span></div></section></div>
    <a className="price-cta" href="/#contact">{t.note}</a>
    <footer className="price-footer"><img src="/vitadent-logo.png" alt="Vitadent Hambakliinik" /><p>© 2026 VITADENT OÜ · Reg. nr: 11292810 · Haigla tn 6, 20104 Narva</p><div><a href="https://www.facebook.com/vitadent.ee" target="_blank" rel="noreferrer">Facebook</a><a href="/privacy-policy">{language === "ru" ? "Конфиденциальность" : "Privacy"}</a><a href="/terms-of-service">{language === "ru" ? "Условия" : "Terms"}</a></div></footer>
  </div></main>;
}
