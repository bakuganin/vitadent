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

type Localized = Record<Language, string>;
type PriceGroup = { title: Localized; services: [Localized, string][] };

// Prices starting with "from " get a localized prefix in formatPrice.
const priceGroups: PriceGroup[] = [
  { title: { et: "Üldine", ru: "Общее", fi: "Yleistä", en: "General" }, services: [
    [{ et: "Plaaniline kontroll", ru: "Плановый контроль", fi: "Määräaikaistarkastus", en: "Routine check-up" }, "15 €"],
    [{ et: "Tuimestus", ru: "Анестезия", fi: "Puudutus", en: "Anaesthesia" }, "15 €"],
    [{ et: "Digitaalne röntgen (sihtülesvõte)", ru: "Дигитальный рентген (прицельный снимок)", fi: "Digitaalinen röntgen (hammaskuva)", en: "Digital X-ray (periapical image)" }, "25 €"],
    [{ et: "Iga järgmine röntgenülesvõte", ru: "Каждый последующий рентген", fi: "Jokainen seuraava röntgenkuva", en: "Each additional X-ray" }, "10 €"],
    [{ et: "Kofferdam", ru: "Коффердам", fi: "Kofferdam", en: "Rubber dam" }, "15 €"],
    [{ et: "Hammaste fotostaatus (dentaalfoto)", ru: "Фотостатус зубов (дентальная фотография)", fi: "Hampaiden valokuvaus (dentaalikuvat)", en: "Dental photo status (dental photography)" }, "25 €"],
    [{ et: "Vastuvõtt väljaspool järjekorda", ru: "Приём вне очереди", fi: "Kiireellinen vastaanotto jonon ohi", en: "Priority appointment" }, "30 €"],
  ] },
  { title: { et: "Restauratsioonid (plommid)", ru: "Реставрации (пломбы)", fi: "Paikkaukset", en: "Restorations (fillings)" }, services: [
    [{ et: "Purihammaste restauratsioon (komposiitmaterjal)", ru: "Реставрация жевательной группы зубов (композитный материал)", fi: "Poskihampaan paikkaus (komposiitti)", en: "Back tooth restoration (composite)" }, "60–90 €"],
    [{ et: "Restauratsioon (klaasionomeertsement)", ru: "Реставрация (СИЦ)", fi: "Paikkaus (lasi-ionomeerisementti)", en: "Restoration (glass ionomer cement)" }, "35–65 €"],
    [{ et: "Esihammaste restauratsioon (komposiitmaterjal)", ru: "Реставрация фронтальной группы зубов (композитный материал)", fi: "Etuhampaan paikkaus (komposiitti)", en: "Front tooth restoration (composite)" }, "80–110 €"],
    [{ et: "Klaaskiudtihvt", ru: "Стекловолоконный штифт", fi: "Lasikuitunasta", en: "Fibreglass post" }, "65 €"],
  ] },
  { title: { et: "Juurekanaliravi", ru: "Лечение каналов", fi: "Juurihoito", en: "Root canal treatment" }, services: [
    [{ et: "Ühe juurega hamba ravi", ru: "Лечение зуба с 1 корнем", fi: "Yksijuurisen hampaan hoito", en: "Tooth with one root" }, "190–250 €"],
    [{ et: "Kahe juurega hamba ravi", ru: "Лечение зуба с 2 корнями", fi: "Kaksijuurisen hampaan hoito", en: "Tooth with two roots" }, "250–290 €"],
    [{ et: "Kolme või enama juurega hamba ravi", ru: "Лечение зуба с 3 и более корнями", fi: "Kolme- tai useampijuurisen hampaan hoito", en: "Tooth with three or more roots" }, "350–650 €"],
  ] },
  { title: { et: "Implantoloogia", ru: "Имплантология", fi: "Implantologia", en: "Implantology" }, services: [
    [{ et: "Implantaat", ru: "Имплантат", fi: "Implantti", en: "Implant" }, "from 550 €"],
    [{ et: "Luu juurdekasvatamine", ru: "Наращивание кости", fi: "Luunlisäys", en: "Bone grafting" }, "from 200 €"],
  ] },
  { title: { et: "Kirurgia", ru: "Хирургия", fi: "Kirurgia", en: "Surgery" }, services: [
    [{ et: "Liikuva hamba lihtne eemaldamine", ru: "Простое удаление подвижного зуба", fi: "Liikkuvan hampaan yksinkertainen poisto", en: "Simple extraction of a loose tooth" }, "45 €"],
    [{ et: "Ühejuurelise hamba eemaldamine", ru: "Удаление однокорневого зуба", fi: "Yksijuurisen hampaan poisto", en: "Single-root tooth extraction" }, "60 €"],
    [{ et: "Mitmejuurelise hamba eemaldamine", ru: "Удаление многокорневого зуба", fi: "Monijuurisen hampaan poisto", en: "Multi-root tooth extraction" }, "90 €"],
    [{ et: "Hamba keeruline eemaldamine", ru: "Сложное удаление зуба", fi: "Vaativa hampaanpoisto", en: "Complex tooth extraction" }, "from 130 €"],
  ] },
  { title: { et: "Proteesimine", ru: "Протезирование", fi: "Proteettinen hoito", en: "Prosthetics" }, services: [
    [{ et: "Kroon", ru: "Коронка", fi: "Kruunu", en: "Crown" }, "250 €"],
    [{ et: "Ajutine kroon", ru: "Временная коронка", fi: "Väliaikainen kruunu", en: "Temporary crown" }, "110 €"],
    [{ et: "Akrüülprotees (üks)", ru: "Акриловый протез (один)", fi: "Akryyliproteesi (yksi)", en: "Acrylic denture (one)" }, "350 €"],
    [{ et: "Akrüülproteesid (kaks)", ru: "Акриловые протезы (два)", fi: "Akryyliproteesit (kaksi)", en: "Acrylic dentures (two)" }, "650 €"],
    [{ et: "Bügelprotees", ru: "Бюгельный протез", fi: "Rankaproteesi", en: "Cast partial denture" }, "650 €"],
    [{ et: "Täisprotees (üks)", ru: "Тотальный протез (один)", fi: "Kokoproteesi (yksi)", en: "Complete denture (one)" }, "650 €"],
    [{ et: "Täisproteesid (mõlemad)", ru: "Тотальный протез (оба)", fi: "Kokoproteesit (molemmat)", en: "Complete dentures (both)" }, "1100 €"],
    [{ et: "Proteesi parandus", ru: "Починка протеза", fi: "Proteesin korjaus", en: "Denture repair" }, "120 €"],
    [{ et: "Krooni lisamine proteesile", ru: "Приварка коронки к протезу", fi: "Kruunun liittäminen proteesiin", en: "Adding a crown to a denture" }, "90 €"],
    [{ et: "Teises kliinikus valmistatud lahtitulnud krooni fikseerimine", ru: "Фиксация выпавшей коронки, изготовленной в другой клинике", fi: "Muualla valmistetun irronneen kruunun kiinnitys", en: "Re-fixing a loose crown made at another clinic" }, "50 €"],
  ] },
  { title: { et: "Parodontiidi ravi", ru: "Лечение пародонтита", fi: "Parodontiitin hoito", en: "Periodontitis treatment" }, services: [
    [{ et: "Igemetasku puhastus (sügavus alla 6 mm)", ru: "Чистка десневого кармана глубиной менее 6 мм", fi: "Ientaskun puhdistus (syvyys alle 6 mm)", en: "Gum pocket cleaning (depth under 6 mm)" }, "15 €"],
    [{ et: "Igemetasku puhastus (sügavus üle 6 mm)", ru: "Чистка десневого кармана глубиной более 6 мм", fi: "Ientaskun puhdistus (syvyys yli 6 mm)", en: "Gum pocket cleaning (depth over 6 mm)" }, "25 €"],
    [{ et: "4–6 igemetasku puhastus (sügavus alla 6 mm)", ru: "Чистка 4–6 карманов глубиной менее 6 мм", fi: "4–6 ientaskun puhdistus (syvyys alle 6 mm)", en: "Cleaning 4–6 pockets (depth under 6 mm)" }, "110 €"],
    [{ et: "4–6 igemetasku puhastus (sügavus üle 6 mm)", ru: "Чистка 4–6 карманов глубиной более 6 мм", fi: "4–6 ientaskun puhdistus (syvyys yli 6 mm)", en: "Cleaning 4–6 pockets (depth over 6 mm)" }, "130 €"],
    [{ et: "10–14 igemetasku puhastus (sügavus alla 6 mm)", ru: "Чистка 10–14 карманов глубиной менее 6 мм", fi: "10–14 ientaskun puhdistus (syvyys alle 6 mm)", en: "Cleaning 10–14 pockets (depth under 6 mm)" }, "200 €"],
    [{ et: "10–14 igemetasku puhastus (sügavus üle 6 mm)", ru: "Чистка 10–14 карманов глубиной более 6 мм", fi: "10–14 ientaskun puhdistus (syvyys yli 6 mm)", en: "Cleaning 10–14 pockets (depth over 6 mm)" }, "250 €"],
  ] },
  { title: { et: "Hügieeniline puhastus", ru: "Гигиеническая чистка", fi: "Hammashygienia", en: "Hygiene cleaning" }, services: [
    [{ et: "Profülaktiline puhastus (poleerimine pastaga)", ru: "Профилактическая чистка (полировка пастой)", fi: "Ennaltaehkäisevä puhdistus (kiillotus tahnalla)", en: "Preventive cleaning (paste polishing)" }, "30 €"],
    [{ et: "Professionaalne Air-Flow puhastus", ru: "Профессиональная чистка Air-Flow", fi: "Ammattimainen Air-Flow-puhdistus", en: "Professional Air-Flow cleaning" }, "75–90 €"],
  ] },
];

const fromPrefix: Localized = { et: "alates", ru: "от", fi: "alkaen", en: "from" };

function formatPrice(price: string, language: Language) {
  return price.startsWith("from ") ? `${fromPrefix[language]} ${price.slice(5)}` : price;
}

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
  const activeTitle = priceGroups[activeGroup].title[language];
  const activeServices = priceGroups[activeGroup].services;
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
    <div className="price-tabs-shell"><button className="price-tabs-arrow" type="button" onClick={() => scrollTabs(-1)} aria-label="Previous categories"><ChevronLeft aria-hidden="true" /></button><div ref={tabListRef} className="price-tabs" role="tablist" aria-label={t.title}>{priceGroups.map(({ title }, index) => { const Icon = priceIcons[index]; return <button key={title.en} type="button" role="tab" aria-selected={activeGroup === index} className={activeGroup === index ? "is-active" : ""} onClick={() => setActiveGroup(index)}><Icon aria-hidden="true" /><span>{title[language]}</span></button>; })}</div><button className="price-tabs-arrow" type="button" onClick={() => scrollTabs(1)} aria-label="Next categories"><ChevronRight aria-hidden="true" /></button></div>
    <div className="price-groups"><section className="price-group"><div className="price-group-heading"><div><span className="price-group-kicker">Vitadent</span><h2>{activeTitle}</h2></div><span className="price-group-number">{String(activeGroup + 1).padStart(2, "0")}</span></div><div className="price-table" role="table"><div className="price-table-head" role="row"><span>{t.service}</span><span>{t.price}</span></div>{activeServices.map(([service, price]) => <div className="price-row" role="row" key={service.en}><span data-label={t.service}>{service[language]}</span><strong data-label={t.price}>{formatPrice(price, language)}</strong></div>)}</div><div className="price-group-footer"><ActiveIcon aria-hidden="true" /><span>{activeTitle}</span></div></section></div>
    <a className="price-cta" href="/#contact">{t.note}</a>
    <footer className="price-footer"><img src="/vitadent-logo.png" alt="Vitadent Hambakliinik" /><p>© 2026 VITADENT OÜ · Reg. nr: 11292810 · Haigla tn 6, 20104 Narva</p><div><a href="https://www.facebook.com/vitadent.ee" target="_blank" rel="noreferrer">Facebook</a><a href="/privacy-policy">{language === "ru" ? "Конфиденциальность" : language === "et" ? "Privaatsus" : language === "fi" ? "Tietosuoja" : "Privacy"}</a><a href="/terms-of-service">{language === "ru" ? "Условия" : language === "et" ? "Tingimused" : language === "fi" ? "Ehdot" : "Terms"}</a></div></footer>
  </div></main>;
}
