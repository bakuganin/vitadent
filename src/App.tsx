import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { Calendar, ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "lucide-react";

import ScrollVideoPlayer from "./components/ScrollVideoPlayer";
import { ServiceCard } from "./types";

const BookingForm = lazy(() => import("./components/BookingForm"));
const RouteGuide = lazy(() => import("./components/RouteGuide"));

type Language = "et" | "ru";
type IntroPhase = "loading" | "split" | "revealing" | "done";
const LANGUAGE_STORAGE_KEY = "caninus-language";
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
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "ru" ? "ru" : "et";
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
    location: "Tallinn, Tatari 6",
    call: "Helista",
    languageLabel: "Keel",
    languageEt: "Eesti",
    languageRu: "Vene",
    hero: {
      eyebrow: "Caninus hambaravi",
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
      statsLabel: "Caninuse kogemus",
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
      copy: "Caninuses saate rohkem kui ravi: saate tähelepaneliku partneri oma suu tervise ja kindla naeratuse jaoks.",
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
      addressValue: "Tatari 6, Tallinn, Eesti",
    },
    footer: {
      brand: "Caninus hambaravi",
      legal: "Reg. nr: 14044544 · Tatari 6, Tallinn, Eesti",
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
    location: "Таллинн, Tatari 6",
    call: "Позвонить",
    languageLabel: "Язык",
    languageEt: "Эстонский",
    languageRu: "Русский",
    hero: {
      eyebrow: "Стоматология Caninus",
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
      statsLabel: "Опыт Caninus",
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
      copy: "В Caninus вы получаете не просто лечение, а внимательного партнера в здоровье и уверенности вашей улыбки.",
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
      addressValue: "Tatari 6, Таллинн, Эстония",
    },
    footer: {
      brand: "Стоматология Caninus",
      legal: "Рег. номер: 14044544 · Tatari 6, Tallinn, Эстония",
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
} satisfies Record<Language, {
  brandSubtitle: string;
  navLabel: string;
  nav: Record<"home" | "about" | "services" | "results" | "contacts", string>;
  location: string;
  call: string;
  languageLabel: string;
  languageEt: string;
  languageRu: string;
  hero: Record<string, string>;
  stats: Record<"years" | "clinics", string>;
  about: Record<string, string>;
  serviceCards: ServiceCard[];
  contact: Record<string, string>;
  footer: Record<"brand" | "legal" | "privacy" | "terms" | "cookie", string>;
  modal: Record<string, string>;
}>;

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [aboutCardIndex, setAboutCardIndex] = useState(1);
  const [introProgress, setIntroProgress] = useState(0);
  const [introPhase, setIntroPhase] = useState<IntroPhase>("loading");
  const [showHeroNotice, setShowHeroNotice] = useState(false);
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
    const duration = 2750;
    const ease = gsap.parseEase("power3.out");
    let splitTimeout = 0;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(1, elapsed / duration);

      setIntroProgress(Math.round(ease(progress) * 100));

      if (progress < 1) return;

      window.clearInterval(interval);
      setIntroProgress(100);
      splitTimeout = window.setTimeout(() => setIntroPhase("split"), 170);
    }, 24);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(splitTimeout);
    };
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "split") return;

    const timeout = window.setTimeout(() => setIntroPhase("revealing"), 1180);
    return () => window.clearTimeout(timeout);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "revealing") return;

    const timeout = window.setTimeout(() => setIntroPhase("done"), 980);
    return () => window.clearTimeout(timeout);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "done") {
      setShowHeroNotice(false);
      return;
    }

    const timeout = window.setTimeout(() => setShowHeroNotice(true), 280);
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
          <div className="intro-loader-implant">
            <div className="intro-progress-layer">
              <span className="intro-loader-number">{introProgress}</span>
              <span className="intro-split-number intro-split-one">1</span>
              <span className="intro-split-number intro-split-zeroes">00</span>
            </div>
            <img className="intro-implant-fallback" src="/implant-fallback.png" alt="" />
            <video autoPlay loop muted playsInline preload="auto">
              <source src="/implant-anim.webm?v=clean-20260601" type="video/webm" />
            </video>
          </div>
        </div>
      )}

      <header className="site-header">
        <button className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Caninus Hambaravi">
          <img className="brand-logo" src="/caninus-wordmark-clean.png" alt="" aria-hidden="true" />
        </button>

        <nav className="site-nav" aria-label={t.navLabel}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{t.nav.home}</button>
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
            <button
              className={language === "et" ? "is-active" : ""}
              onClick={() => setLanguage("et")}
              aria-pressed={language === "et"}
              title={t.languageEt}
            >
              ET
            </button>
            <button
              className={language === "ru" ? "is-active" : ""}
              onClick={() => setLanguage("ru")}
              aria-pressed={language === "ru"}
              title={t.languageRu}
            >
              RU
            </button>
          </div>
          <a className="header-call" href="tel:+37256155030">{t.call}</a>
        </div>
      </header>

      <div className="hero-stats-stage">
        <ScrollVideoPlayer className="hero-shared-implant" />

        <section className="hero-section">
          <div className="hero-title-block">
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <h1 className="hero-title">
              <span className="hero-title-line hero-title-line-offset">{t.hero.line1}</span>
              <span className="hero-title-line">
                <strong>{t.hero.strong}</strong> {t.hero.middle} <em>{t.hero.technology}</em>
              </span>
              <span className="hero-title-line">
                {t.hero.forWord} <em className="hero-healthy-word">{t.hero.healthy}</em>
              </span>
            </h1>

            <button className="hero-cta" onClick={scrollToContact}>
              {t.hero.cta}
            </button>
          </div>

          <svg className="hero-orbit hero-orbit-back" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
            <path d="M68 156C232 52 728 36 930 116" />
          </svg>
          <svg className="hero-orbit hero-orbit-front" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
            <path d="M252 170C386 218 614 214 748 166" />
          </svg>

          <div className="implant-note implant-note-left">
            <span className="implant-dot" />
            <p>{t.hero.noteLeft}</p>
          </div>

          <div className="implant-note implant-note-right">
            <span className="implant-dot" />
            <p>{t.hero.noteRight}</p>
          </div>

          <div className="hero-smile-block">
            <p>
              {t.hero.smilePrefix} <strong>{t.hero.smileStrong}</strong>
            </p>
            <p>{t.hero.smileLine}</p>
          </div>

          <div className="hero-patient-copy">
            <div className="hero-mini-stat">
              <span>✦</span>
              <strong>1350+</strong>
            </div>
            <p>
              {t.hero.patients}
            </p>
          </div>

          {SHOW_INTRO_SECTIONS && (
            <>
              <button className="hero-down-button" onClick={scrollToStats} aria-label={t.hero.downLabel}>
                ↓
              </button>

              <button className="hero-about-link" onClick={scrollToAbout}>
                {t.hero.aboutLink}
              </button>
            </>
          )}

          {showHeroNotice && (
            <div className="hero-development-layer" aria-labelledby="hero-development-title">
              <div className="development-modal hero-development-notice">
                <div className="development-modal-icon" aria-hidden="true">
                  <ToothIcon className="w-8 h-8" />
                </div>

                <span className="development-modal-kicker">Caninus hambakliinik</span>
                <h2 id="hero-development-title">{t.modal.title}</h2>
                <p>{t.modal.body}</p>

                <div className="hero-development-actions">
                  <a className="development-modal-phone hero-development-phone" href="tel:+37256155030">
                    <Phone className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                    <span>+372 56 155 030</span>
                  </a>

                  <a
                    className="development-modal-action hero-development-action"
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToContact();
                    }}
                  >
                    <Calendar className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                    {t.modal.request}
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
        <section className="route-section">
          <Suspense fallback={<div className="route-loading-surface" aria-hidden="true" />}>
            <RouteGuide language={language} />
          </Suspense>
        </section>

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

              <div className="contact-card doctor-card">
                <div className="doctor-avatar">
                  <img src="/jevgeni abramovits.png" alt="dr. Jevgeni Abramovits" />
                </div>
                <div>
                  <span>{t.contact.doctorLabel}</span>
                  <strong>dr. Jevgeni Abramovits</strong>
                </div>
              </div>

              <div className="contact-card contact-list">
                <div>
                  <Phone className="w-4 h-4" />
                  <p>
                    <span>{t.contact.phone}</span>
                    <a href="tel:+37256155030">+372 56 155 030</a>
                  </p>
                </div>
                <div>
                  <Mail className="w-4 h-4" />
                  <p>
                    <span>{t.contact.email}</span>
                    <a href="mailto:caninushambakliinik@gmail.com">caninushambakliinik@gmail.com</a>
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

            <div className="booking-panel">
              <Suspense fallback={<div className="booking-loading-surface" aria-hidden="true" />}>
                <BookingForm language={language} />
              </Suspense>
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <div className="footer-brand">
            <img className="footer-logo" src="/caninus-wordmark-clean.png" alt="Caninus Hambaravi" />
          </div>

          <div className="footer-wordmark">CANINUS</div>

          <div className="footer-legal">
            <p>&copy; 2026 CANINUS HAMBAKLIINIK OÜ · {t.footer.legal}</p>
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
