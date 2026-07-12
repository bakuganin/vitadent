import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";

import { ServiceCard } from "./types";

const BookingForm = lazy(() => import("./components/BookingForm"));
const RouteGuide = lazy(() => import("./components/RouteGuide"));

type Language = "et" | "ru" | "fi" | "en";
type IntroPhase = "loading" | "split" | "revealing" | "done";
const LANGUAGE_STORAGE_KEY = "vitadent-language";
const SHOW_INTRO_SECTIONS = false;

function ToothIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M9.6 4.7c2.3-.8 4.1.5 5.4 1.4.5.3.9.6 1 .6s.5-.3 1-.6c1.3-.9 3.1-2.2 5.4-1.4 3.1 1.1 4.7 4.8 3.7 8.9-.4 1.8-1.2 3.2-2 4.7-.8 1.5-1.7 3.1-2.2 5.3-.6 2.7-1.6 4.1-3 4.1-1.6 0-2.1-1.7-2.5-3.4-.2-.8-.5-1.7-1-2.4-.5.7-.8 1.6-1 2.4-.4 1.7-.9 3.4-2.5 3.4-1.4 0-2.4-1.4-3-4.1-.5-2.2-1.4-3.8-2.2-5.3-.8-1.5-1.6-2.9-2-4.7-1-4.1.6-7.8 3.7-8.9Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4 7.2c1.2.8 2.1 1.3 2.6 1.3s1.4-.5 2.6-1.3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "et";
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage === "ru" || storedLanguage === "fi" || storedLanguage === "en" ? storedLanguage : "et";
}

const copy = {
  et: {
    brandSubtitle: "Hambaravi",
    navLabel: "Peamenüü",
    nav: {
      home: "Avaleht",
      about: "Kliinikust",
      services: "Teenused",
      results: "Tulemused",
      contacts: "Kontaktid",
    },
    location: "Narva, Haigla tn 6",
    call: "Helista",
    languageLabel: "Keel",
    languageEt: "Eesti",
    languageRu: "Vene",
    languageFi: "Soome",
    languageEn: "Inglise",
    hero: {
      eyebrow: "Vitadent hambaravi",
      line1: "Innovaatiline",
      strong: "hammaste taastamise",
      middle: "",
      technology: "tehnoloogia",
      forWord: "terve",
      healthy: "naeratuse",
      cta: "Broneeri konsultatsioon",
      noteLeft: "Implantaadi jälgimine",
      noteRight: "Premium-materjalid",
      smilePrefix: "Ja",
      smileStrong: "Kindla",
      smileLine: "Naeratuse",
      patients:
        "Patsiendid keerukate hambaravi vajadustega on saanud diagnostika, personaalse raviplaani ja mugavuse tagasi.",
      statsLabel: "Vitadenti kogemus",
      downLabel: "Liigu kliiniku statistika juurde",
      aboutLink: "Kliinikust",
    },
    stats: {
      years: "Aastat\nkogemust",
      clinics: "Kliinikut\nEuroopas",
    },
    about: {
      kicker: "Kliinikust",
      line1: "Rohkem kui",
      clinic: "kliinik",
      accent: "Teie naeratuse",
      line3: "partner",
      copy: "Vitadentis saate rohkem kui ravi: saate tähelepaneliku partneri oma suu tervise ja kindla naeratuse jaoks.",
      prev: "Eelmine kaart",
      next: "Järgmine kaart",
      cardsLabel: "Kliiniku eelised",
    },
    serviceCards: [
      {
        number: "01",
        title: "Kogenud\nspetsialistid",
        description: "Juhtivad hambakirurgid, kellel on üle 10 aasta kliinilist kogemust Eestis ja Euroopa Liidus.",
      },
      {
        number: "02",
        title: "Personaalne\nlähenemine",
        description: "Individuaalne raviplaan\niga patsiendi jaoks.",
      },
      {
        number: "03",
        title: "Kaasaegsed\ntehnoloogiad",
        description: "3D-diagnostika, digitaalne naeratuse planeerimine ja premium-implantaadisüsteemid.",
      },
      {
        number: "04",
        title: "Kõrged ohutus-\nstandardid",
        description: "Steriilsed protokollid, Euroopa materjalid ja õrn tuimastus igas etapis.",
      },
    ],
    contact: {
      eyebrow: "Aja broneerimine",
      title1: "Oleme valmis",
      titleStrong: "aitama",
      copy: "Jätke oma kontaktid ja me helistame tagasi, et leida konsultatsiooniks mugav aeg.",
      doctorLabel: "Juhtiv arst",
      phone: "Telefon",
      email: "E-post",
      address: "Kliiniku aadress",
      addressValue: "Haigla tn 6, 20104 Narva, Eesti",
    },
    footer: {
      brand: "Vitadent hambaravi",
      legal: "Reg. nr: 11292810 · Haigla tn 6, 20104 Narva, Eesti",
      privacy: "Privaatsuspoliitika",
      terms: "Teenustingimused",
      cookie: "Cookie",
    },
    modal: {
      close: "Sulge aken",
      title: "Sait on veel arendamisel",
      body: "Täiendame saiti järk-järgult. Konsultatsiooniks saate meiega ühendust võtta telefonil.",
      item1Title: "Jaotised ilmuvad peagi",
      item1Text: "Teenused ja tulemused valmistatakse praegu avaldamiseks ette.",
      item2Title: "Info on kontrollimisel",
      item2Text: "Kogume kliinilisi andmeid hoolikalt, et näidata neid korrektselt.",
      action: "Sain aru",
      request: "Broneeri",
    },
  },
  ru: {
    brandSubtitle: "Стоматология",
    navLabel: "Основное меню",
    nav: {
      home: "Главная",
      about: "О клинике",
      services: "Услуги",
      results: "Результаты",
      contacts: "Контакты",
    },
    location: "Нарва, Haigla tn 6",
    call: "Позвонить",
    languageLabel: "Язык",
    languageEt: "Эстонский",
    languageRu: "Русский",
    languageFi: "Финский",
    languageEn: "Английский",
    hero: {
      eyebrow: "Стоматология Vitadent",
      line1: "Инновационная",
      strong: "реставрация",
      middle: "зубов",
      technology: "технология",
      forWord: "для",
      healthy: "здоровой",
      cta: "Записаться на консультацию",
      noteLeft: "Контроль приживления",
      noteRight: "Премиальные материалы",
      smilePrefix: "и",
      smileStrong: "Уверенной",
      smileLine: "Улыбки",
      patients:
        "Пациентов с комплексными стоматологическими задачами прошли диагностику, получили персональный план лечения и вернули комфорт при жевании.",
      statsLabel: "Опыт Vitadent",
      downLabel: "Перейти к статистике клиники",
      aboutLink: "О нас",
    },
    stats: {
      years: "Лет\nопыта",
      clinics: "Клиники\nв Европе",
    },
    about: {
      kicker: "О нас",
      line1: "Больше, чем",
      clinic: "клиника",
      accent: "Ваш партнер",
      line3: "улыбки",
      copy: "В Vitadent вы получаете не просто лечение, а внимательного партнера в здоровье и уверенности вашей улыбки.",
      prev: "Предыдущая карточка",
      next: "Следующая карточка",
      cardsLabel: "Преимущества клиники",
    },
    serviceCards: [
      {
        number: "01",
        title: "Опытные\nспециалисты",
        description: "Ведущие хирурги-стоматологи с опытом более 10 лет клинической практики в Эстонии и странах ЕС.",
      },
      {
        number: "02",
        title: "Персональный\nподход",
        description: "Индивидуальные планы\nлечения для каждого пациента.",
      },
      {
        number: "03",
        title: "Передовые\nтехнологии",
        description: "3D-диагностика, цифровое планирование улыбки и премиальные имплантационные системы.",
      },
      {
        number: "04",
        title: "Высокие стандарты\nбезопасности",
        description: "Стерильные протоколы, европейские материалы и щадящая анестезия на каждом этапе.",
      },
    ],
    contact: {
      eyebrow: "Запись на прием",
      title1: "Мы готовы",
      titleStrong: "помочь",
      copy: "Оставьте контакты, и мы перезвоним для подбора комфортного времени консультации.",
      doctorLabel: "Ведущий врач",
      phone: "Телефон",
      email: "Электронная почта",
      address: "Адрес клиники",
      addressValue: "Haigla tn 6, 20104 Нарва, Эстония",
    },
    footer: {
      brand: "Стоматология Vitadent",
      legal: "Рег. номер: 11292810 · Haigla tn 6, 20104 Нарва, Эстония",
      privacy: "Политика конфиденциальности",
      terms: "Условия обслуживания",
      cookie: "Cookie",
    },
    modal: {
      close: "Закрыть окно",
      title: "Сайт еще в разработке",
      body: "Мы постепенно обновляем сайт. Для консультации вы можете связаться с нами по телефону.",
      item1Title: "Разделы появятся скоро",
      item1Text: "Услуги и результаты сейчас готовятся к публикации.",
      item2Title: "Информация проверяется",
      item2Text: "Мы аккуратно собираем клинические данные, чтобы показать их корректно.",
      action: "Понятно",
      request: "Записаться",
    },
  },
  fi: {
    brandSubtitle: "Hammaslääkäri",
    navLabel: "Päävalikko",
    nav: {
      home: "Etusivu",
      about: "Klinikasta",
      services: "Palvelut",
      results: "Tulokset",
      contacts: "Yhteystiedot",
    },
    location: "Narva, Haigla tn 6",
    call: "Soita",
    languageLabel: "Kieli",
    languageEt: "Viro",
    languageRu: "Venäjä",
    languageFi: "Suomi",
    languageEn: "Englanti",
    hero: {
      eyebrow: "Vitadent hammashoito",
      line1: "Innovatiivinen",
      strong: "hampaiden palautus",
      middle: "",
      technology: "teknologia",
      forWord: "terveelle",
      healthy: "hymylle",
      cta: "Varaa konsultaatio",
      noteLeft: "Implantin seuranta",
      noteRight: "Premium-materiaalit",
      smilePrefix: "ja",
      smileStrong: "varma",
      smileLine: "hymy",
      patients:
        "Potilaat, joilla on vaativia hammashoidon tarpeita, saavat diagnostiikan, yksilöllisen hoitosuunnitelman ja mukavuuden takaisin.",
      statsLabel: "Vitadent kokemus",
      downLabel: "Siirry klinikan tilastoihin",
      aboutLink: "Klinikasta",
    },
    stats: {
      years: "Vuotta\nkokemusta",
      clinics: "Klinikkaa\nEuroopassa",
    },
    about: {
      kicker: "Klinikasta",
      line1: "Enemmän kuin",
      clinic: "klinikka",
      accent: "Hymysi",
      line3: "kumppani",
      copy: "Caninuksessa saat enemmän kuin hoitoa: saat huolellisen kumppanin suun terveyteen ja varmaan hymyyn.",
      prev: "Edellinen kortti",
      next: "Seuraava kortti",
      cardsLabel: "Klinikan edut",
    },
    serviceCards: [
      {
        number: "01",
        title: "Kokeneet\nasiantuntijat",
        description: "Johtavat hammaskirurgit, joilla on yli 10 vuoden kliininen kokemus Virossa ja EU:ssa.",
      },
      {
        number: "02",
        title: "Yksilöllinen\nlähestymistapa",
        description: "Henkilökohtainen hoitosuunnitelma\njokaiselle potilaalle.",
      },
      {
        number: "03",
        title: "Nykyaikainen\nteknologia",
        description: "3D-diagnostiikka, digitaalinen hymyn suunnittelu ja premium-implanttiratkaisut.",
      },
      {
        number: "04",
        title: "Korkeat turvallisuus-\nstandardit",
        description: "Steriilit protokollat, eurooppalaiset materiaalit ja hellä puudutus jokaisessa vaiheessa.",
      },
    ],
    contact: {
      eyebrow: "Ajanvaraus",
      title1: "Olemme valmiit",
      titleStrong: "auttamaan",
      copy: "Jätä yhteystietosi, niin soitamme takaisin ja sovimme sinulle sopivan konsultaatioajan.",
      doctorLabel: "Johtava lääkäri",
      phone: "Puhelin",
      email: "Sähköposti",
      address: "Klinikan osoite",
      addressValue: "Haigla tn 6, 20104 Narva, Viro",
    },
    footer: {
      brand: "Vitadent hammashoito",
      legal: "Rek. nro: 11292810 · Haigla tn 6, 20104 Narva, Viro",
      privacy: "Tietosuojakäytäntö",
      terms: "Palveluehdot",
      cookie: "Cookie",
    },
    modal: {
      close: "Sulje ikkuna",
      title: "Sivusto on vielä kehitteillä",
      body: "Päivitämme sivustoa vaiheittain. Konsultaatiota varten voit ottaa meihin yhteyttä puhelimitse.",
      item1Title: "Osioita lisätään pian",
      item1Text: "Palvelut ja tulokset valmistellaan parhaillaan julkaistavaksi.",
      item2Title: "Tiedot tarkistetaan",
      item2Text: "Keräämme kliiniset tiedot huolellisesti, jotta ne voidaan esittää oikein.",
      action: "Ymmärrän",
      request: "Varaa aika",
    },
  },
  en: {
    brandSubtitle: "Dental clinic",
    navLabel: "Main menu",
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      results: "Results",
      contacts: "Contacts",
    },
    location: "Narva, Haigla tn 6",
    call: "Call",
    languageLabel: "Language",
    languageEt: "Estonian",
    languageRu: "Russian",
    languageFi: "Finnish",
    languageEn: "English",
    hero: {
      eyebrow: "Vitadent dental care",
      line1: "Innovative",
      strong: "tooth restoration",
      middle: "",
      technology: "technology",
      forWord: "for a",
      healthy: "healthy smile",
      cta: "Book a consultation",
      noteLeft: "Implant follow-up",
      noteRight: "Premium materials",
      smilePrefix: "and",
      smileStrong: "confident",
      smileLine: "smile",
      patients:
        "Patients with complex dental needs receive diagnostics, a personal treatment plan and comfort back.",
      statsLabel: "Vitadent experience",
      downLabel: "Go to clinic statistics",
      aboutLink: "About us",
    },
    stats: {
      years: "Years of\nexperience",
      clinics: "Clinics\nin Europe",
    },
    about: {
      kicker: "About",
      line1: "More than",
      clinic: "a clinic",
      accent: "Your smile",
      line3: "partner",
      copy: "At Vitadent you receive more than treatment: you get an attentive partner for your oral health and confident smile.",
      prev: "Previous card",
      next: "Next card",
      cardsLabel: "Clinic advantages",
    },
    serviceCards: [
      {
        number: "01",
        title: "Experienced\nspecialists",
        description: "Leading dental surgeons with more than 10 years of clinical experience in Estonia and the EU.",
      },
      {
        number: "02",
        title: "Personal\napproach",
        description: "An individual treatment plan\nfor every patient.",
      },
      {
        number: "03",
        title: "Modern\ntechnology",
        description: "3D diagnostics, digital smile planning and premium implant systems.",
      },
      {
        number: "04",
        title: "High safety\nstandards",
        description: "Sterile protocols, European materials and gentle anesthesia at every step.",
      },
    ],
    contact: {
      eyebrow: "Booking",
      title1: "We are ready",
      titleStrong: "to help",
      copy: "Leave your contact details and we will call you back to find a convenient consultation time.",
      doctorLabel: "Lead dentist",
      phone: "Phone",
      email: "Email",
      address: "Clinic address",
      addressValue: "Haigla tn 6, 20104 Narva, Estonia",
    },
    footer: {
      brand: "Vitadent dental clinic",
      legal: "Reg. no: 11292810 · Haigla tn 6, 20104 Narva, Estonia",
      privacy: "Privacy policy",
      terms: "Terms of service",
      cookie: "Cookie",
    },
    modal: {
      close: "Close window",
      title: "The website is still in development",
      body: "We are updating the website step by step. For a consultation, you can contact us by phone.",
      item1Title: "Sections are coming soon",
      item1Text: "Services and results are currently being prepared for publication.",
      item2Title: "Information is being checked",
      item2Text: "We carefully collect clinical data so it can be shown correctly.",
      action: "Got it",
      request: "Book a visit",
    },
  },
} satisfies Record<Language, {
  brandSubtitle: string;
  navLabel: string;
  nav: Record<"home" | "about" | "services" | "results" | "contacts", string>;
  location: string;
  call: string;
  languageLabel: string;
  languageEt: string;
  languageRu: string;
  languageFi: string;
  languageEn: string;
  hero: Record<string, string>;
  stats: Record<"years" | "clinics", string>;
  about: Record<string, string>;
  serviceCards: ServiceCard[];
  contact: Record<string, string>;
  footer: Record<"brand" | "legal" | "privacy" | "terms" | "cookie", string>;
  modal: Record<string, string>;
}>;

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [aboutCardIndex, setAboutCardIndex] = useState(1);
  const [introProgress, setIntroProgress] = useState(0);
  const [introPhase, setIntroPhase] = useState<IntroPhase>("loading");
  const [showHeroNotice, setShowHeroNotice] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areStatsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutCardsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    if (!window.location.hash) return;

    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (introPhase !== "loading") return;

    setIntroProgress(0);
    const startedAt = Date.now();
    const duration = 1100;
    const ease = gsap.parseEase("power3.out");
    let revealTimeout = 0;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(1, elapsed / duration);

      setIntroProgress(Math.round(ease(progress) * 100));

      if (progress < 1) return;

      window.clearInterval(interval);
      setIntroProgress(100);
      revealTimeout = window.setTimeout(() => setIntroPhase("revealing"), 120);
    }, 24);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(revealTimeout);
    };
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "revealing") return;

    const timeout = window.setTimeout(() => setIntroPhase("done"), 380);
    return () => window.clearTimeout(timeout);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "done") {
      setShowHeroNotice(false);
      return;
    }

    const timeout = window.setTimeout(() => setShowHeroNotice(true), 160);
    return () => window.clearTimeout(timeout);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase === "done") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introPhase]);

  useEffect(() => {
    if (!isBookingModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBookingModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenisRef.current?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBookingModalOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStatsVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.2, rootMargin: "0px 0px -18% 0px" }
    );

    observer.observe(stats);
    return () => observer.disconnect();
  }, []);

  const t = copy[language];
  const serviceCards: ServiceCard[] = t.serviceCards.map((card, idx) => ({ ...card, isActive: idx === 1 }));
  const renderLineBreaks = (value: string) =>
    value.split("\n").map((line, idx, lines) => (
      <Fragment key={`${line}-${idx}`}>
        {line}
        {idx < lines.length - 1 && <br />}
      </Fragment>
    ));

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#contact");
  };

  const scrollToHeroNotice = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openBookingModal = () => {
    const scrollTop = window.scrollY;
    setBookingModalOpen(true);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollTop, behavior: "auto" });
    });
    window.setTimeout(() => {
      window.scrollTo({ top: scrollTop, behavior: "auto" });
    }, 80);
  };

  useEffect(() => {
    const cards = aboutCardsRef.current;
    const activeCard = cards?.querySelector<HTMLElement>(".feature-card.is-active");
    if (!cards || !activeCard) return;

    const nextLeft = activeCard.offsetLeft - (cards.clientWidth - activeCard.clientWidth) / 2;

    cards.scrollTo({
      left: Math.max(0, nextLeft),
      behavior: "smooth",
    });
  }, [aboutCardIndex, language]);

  const handleNextCard = () => {
    setAboutCardIndex((prev) => (prev + 1) % serviceCards.length);
  };

  const handlePrevCard = () => {
    setAboutCardIndex((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
  };

  const isIntroRevealing = introPhase === "revealing" || introPhase === "done";
  const siteIntroClass = isIntroRevealing ? "is-intro-complete" : "is-intro-loading";
  const introLayerClass = [
    "intro-loader-screen",
    introPhase === "split" || introPhase === "revealing" ? "is-splitting" : "",
    introPhase === "revealing" ? "is-revealing" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={`site-shell ${siteIntroClass} lang-${language} min-h-screen text-[#202124] font-sans antialiased overflow-x-clip`}>
      {introPhase !== "done" && (
        <div className={introLayerClass} aria-hidden="true">
          <div className="intro-loader-simple">
            <span className="intro-loader-number">{introProgress}</span>
          </div>
        </div>
      )}

      <header className="site-header">
        <button className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Vitadent Hambaravi">
          <img className="brand-logo" src="/vitadent-logo.png" alt="" aria-hidden="true" />
        </button>

        <nav className="site-nav" aria-label={t.navLabel}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{t.nav.home}</button>
          <a href="/hinnakiri">{language === "ru" ? "Цены" : language === "fi" ? "Hinnasto" : language === "en" ? "Price list" : "Hinnakiri"}</a>
          {SHOW_INTRO_SECTIONS && (
            <>
              <button onClick={scrollToAbout}>{t.nav.about}</button>
              <button className="site-nav-dev" onClick={scrollToHeroNotice}>
                <span>{t.nav.services}</span>
                <span className="nav-dev-badge">DEV</span>
              </button>
              <button className="site-nav-dev" onClick={scrollToHeroNotice}>
                <span>{t.nav.results}</span>
                <span className="nav-dev-badge">DEV</span>
              </button>
            </>
          )}
          <button onClick={scrollToContact}>{t.nav.contacts}</button>
        </nav>

        <div className="header-actions">
          <span className="header-location">
            <MapPin className="w-3.5 h-3.5" />
            {t.location}
          </span>
          <div className="language-switch" aria-label={t.languageLabel}>
            {([
              ["et", t.languageEt],
              ["ru", t.languageRu],
              ["fi", t.languageFi],
              ["en", t.languageEn],
            ] as const).map(([code, title]) => (
              <button
                key={code}
                className={language === code ? "is-active" : ""}
                onClick={() => setLanguage(code)}
                aria-pressed={language === code}
                title={title}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="header-call" href="tel:+37258508890">{t.call}</a>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-site-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-site-menu" className={`mobile-site-menu ${isMobileMenuOpen ? "is-open" : ""}`} aria-label={t.navLabel}>
          <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMobileMenuOpen(false); }}>{t.nav.home}</button>
          <a href="/hinnakiri" onClick={() => setMobileMenuOpen(false)}>{language === "ru" ? "Цены" : language === "fi" ? "Hinnasto" : language === "en" ? "Price list" : "Hinnakiri"}</a>
          {SHOW_INTRO_SECTIONS && (
            <>
              <button onClick={() => { scrollToAbout(); setMobileMenuOpen(false); }}>{t.nav.about}</button>
              <button onClick={() => { scrollToHeroNotice(); setMobileMenuOpen(false); }}>{t.nav.services}</button>
              <button onClick={() => { scrollToHeroNotice(); setMobileMenuOpen(false); }}>{t.nav.results}</button>
            </>
          )}
          <button onClick={() => { scrollToContact(); setMobileMenuOpen(false); }}>{t.nav.contacts}</button>
          <a className="mobile-menu-call" href="tel:+37258508890"><Phone aria-hidden="true" />{t.call}</a>
        </nav>
      </header>

      <div className="development-stage">
        <section className="development-landing-section">
          {showHeroNotice && (
            <div className="hero-development-layer is-standalone" aria-labelledby="hero-development-title">
              <div className="development-modal hero-development-notice">
                <div className="development-modal-icon" aria-hidden="true">
                  <ToothIcon className="w-8 h-8" />
                </div>

                <span className="development-modal-kicker">Vitadent hambakliinik</span>
                <h2 id="hero-development-title">{t.modal.title}</h2>
                <p>{t.modal.body}</p>

                <div className="hero-development-actions">
                  <a className="development-modal-phone hero-development-phone" href="tel:+37258508890">
                    <Phone className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                    <span>+372 58 508 890</span>
                  </a>

                  <a className="development-modal-action hero-development-action" href="tel:+37258508890">
                    <Phone className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                    {t.call}
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {SHOW_INTRO_SECTIONS && (
          <section ref={statsRef} className={`stats-section ${areStatsVisible ? "is-stats-visible" : ""}`} aria-label={t.hero.statsLabel}>
            <div className="hero-stat hero-stat-years">
              <strong>10</strong>
              <span>{renderLineBreaks(t.stats.years)}</span>
            </div>

            <div className="hero-stat hero-stat-clinics">
              <span>{renderLineBreaks(t.stats.clinics)}</span>
              <strong>02</strong>
            </div>
          </section>
        )}
      </div>

      {isBookingModalOpen && (
        <div
          className="booking-modal-layer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setBookingModalOpen(false);
            }
          }}
        >
          <div className="booking-modal-shell" data-lenis-prevent>
            <button
              type="button"
              className="booking-modal-close"
              onClick={() => setBookingModalOpen(false)}
              aria-label={t.modal.close}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="booking-modal-heading">
              <span className="section-eyebrow">{t.contact.eyebrow}</span>
              <h3 id="booking-modal-title">
                {t.contact.title1}
                <strong>{t.contact.titleStrong}</strong>
              </h3>
              <p>{t.contact.copy}</p>
            </div>

            <div className="booking-modal-form" data-lenis-prevent>
              <Suspense fallback={<div className="booking-loading-surface" aria-hidden="true" />}>
                <BookingForm language={language} />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {SHOW_INTRO_SECTIONS && (
        <section ref={aboutRef} id="about" className="about-section">
          <div className="about-kicker">{t.about.kicker}</div>

          <div className="about-header">
            <h2 className="about-title">
              <span>
                {t.about.line1} <em>{t.about.clinic}</em>
              </span>
              <span className="about-title-accent">{t.about.accent}</span>
              <span>{t.about.line3}</span>
            </h2>

            <p className="about-copy">
              {t.about.copy}
            </p>
          </div>

          <div className="about-carousel">
            <div className="about-controls">
              <button onClick={handlePrevCard} aria-label={t.about.prev} title={t.about.prev}>
                <ChevronLeft className="w-5 h-5 stroke-[1.2]" />
              </button>
              <button onClick={handleNextCard} aria-label={t.about.next} title={t.about.next}>
                <ChevronRight className="w-5 h-5 stroke-[1.2]" />
              </button>
            </div>

            <div ref={aboutCardsRef} className="about-cards" aria-label={t.about.cardsLabel}>
              {serviceCards.map((card, idx) => {
                const isSelected = aboutCardIndex === idx;

                return (
                  <button
                    key={card.number}
                    onClick={() => setAboutCardIndex(idx)}
                    className={`feature-card ${isSelected ? "is-active" : ""}`}
                    aria-pressed={isSelected}
                  >
                    <span className="feature-card-title">{card.title}</span>
                    <span className="feature-card-description">{card.description}</span>
                    <span className="feature-card-number">{card.number}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="content-shell">
        <section ref={contactRef} id="contact" className="contact-section">
          <div className="contact-grid">
            <div className="contact-details">
              <div>
                <span className="section-eyebrow">{t.contact.eyebrow}</span>
                <h3>
                  {t.contact.title1}
                  <strong>{t.contact.titleStrong}</strong>
                </h3>
                <p>
                  {t.contact.copy}
                </p>
              </div>

              <div className="contact-doctors is-compact">
                <div className="contact-card doctor-card is-lead">
                  <div className="doctor-avatar"><img src="/jevgeni abramovits.png" alt="dr. Jevgeni Abramovits" /></div>
                  <div><span>{t.contact.doctorLabel}</span><strong>dr. Jevgeni Abramovits</strong></div>
                </div>
                {[
                  ["УЛ", "Ульяна Львова"],
                  ["ЭА", "Эвелин Антипенкова"],
                  ["А", "Анжелика"],
                  ["А", "Алина"],
                ].map(([initials, name]) => (
                  <div className="contact-card doctor-card" key={name}>
                    <div className="doctor-avatar doctor-avatar-fallback" aria-hidden="true"><span>{initials}</span></div>
                    <div><span>{t.contact.doctorLabel}</span><strong>{name}</strong></div>
                  </div>
                ))}
              </div>

              <div className="contact-card contact-list">
                <div>
                  <Phone className="w-4 h-4" />
                  <p>
                    <span>{t.contact.phone}</span>
                    <a href="tel:+37258508890">+372 58 508 890</a>
                  </p>
                </div>
                <div>
                  <Mail className="w-4 h-4" />
                  <p>
                    <span>{t.contact.email}</span>
                    <a href="mailto:infovitadent24@gmail.com">infovitadent24@gmail.com</a>
                  </p>
                </div>
                <div>
                  <MapPin className="w-4 h-4" />
                  <p>
                    <span>{t.contact.address}</span>
                    <strong>{t.contact.addressValue}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="booking-panel booking-phone-panel">
              <Phone aria-hidden="true" />
              <span>{t.contact.eyebrow}</span>
              <strong>+372 58 508 890</strong>
              <p>{language === "ru" ? "Запись на приём доступна только по телефону." : language === "et" ? "Vastuvõtule saab praegu broneerida ainult telefoni teel." : language === "fi" ? "Ajanvaraus on tällä hetkellä mahdollista vain puhelimitse." : "Appointments are currently available by phone only."}</p>
              <a href="tel:+37258508890">{t.call}</a>
            </div>
          </div>
        </section>

        <section className="route-section">
          <Suspense fallback={<div className="route-loading-surface" aria-hidden="true" />}>
            <RouteGuide language={language} />
          </Suspense>
        </section>

        <footer className="footer-section">
          <div className="footer-brand">
            <img className="footer-logo" src="/vitadent-logo.png" alt="Vitadent Hambaravi" />
          </div>

          <div className="footer-wordmark">VITADENT</div>

          <div className="footer-legal">
            <p>&copy; 2026 VITADENT OÜ · {t.footer.legal}</p>
            <div>
              <a href="/privacy-policy">{t.footer.privacy}</a>
              <a href="/terms-of-service">{t.footer.terms}</a>
              <a href="/cookie-policy">{t.footer.cookie}</a>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
