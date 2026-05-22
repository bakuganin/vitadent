import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { CalendarClock, ChevronLeft, ChevronRight, Layers, Mail, MapPin, Phone, ShieldCheck, X } from "lucide-react";

import BookingForm from "./components/BookingForm";
import RouteGuide from "./components/RouteGuide";
import ScrollVideoPlayer from "./components/ScrollVideoPlayer";
import { ServiceCard } from "./types";

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

  const [aboutCardIndex, setAboutCardIndex] = useState(1);
  const [isDevelopmentModalOpen, setDevelopmentModalOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = window.location.hash === "#about" ? aboutRef : window.location.hash === "#contact" ? contactRef : null;
    if (!target) return;

    const timeout = window.setTimeout(() => {
      target.current?.scrollIntoView({ block: "start" });
    }, 120);

    return () => window.clearTimeout(timeout);
  }, []);

  const serviceCards: ServiceCard[] = [
    {
      number: "01",
      title: "Опытные\nспециалисты",
      description: "Ведущие хирурги-стоматологи с опытом более 12 лет клинической практики в Эстонии и странах ЕС.",
    },
    {
      number: "02",
      title: "Персональный\nподход",
      description: "Индивидуальные планы\nлечения для каждого пациента.",
      isActive: true,
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
  ];

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openDevelopmentModal = () => {
    setDevelopmentModalOpen(true);
  };

  const closeDevelopmentModal = () => {
    setDevelopmentModalOpen(false);
  };

  useEffect(() => {
    if (!isDevelopmentModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDevelopmentModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDevelopmentModalOpen]);

  const handleNextCard = () => {
    setAboutCardIndex((prev) => (prev + 1) % serviceCards.length);
  };

  const handlePrevCard = () => {
    setAboutCardIndex((prev) => (prev - 1 + serviceCards.length) % serviceCards.length);
  };

  return (
    <div className="site-shell min-h-screen text-[#202124] font-sans antialiased overflow-x-clip">
      <header className="site-header">
        <button className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Caninus">
          <span className="brand-icon">C</span>
          <span>
            <strong>CANINUS</strong>
            <small>Стоматология</small>
          </span>
        </button>

        <nav className="site-nav" aria-label="Основное меню">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Главная</button>
          <button onClick={scrollToAbout}>О клинике</button>
          <button className="site-nav-dev" onClick={openDevelopmentModal}>
            <span>Услуги</span>
            <span className="nav-dev-badge">DEV</span>
          </button>
          <button className="site-nav-dev" onClick={openDevelopmentModal}>
            <span>Результаты</span>
            <span className="nav-dev-badge">DEV</span>
          </button>
          <button onClick={scrollToContact}>Контакты</button>
        </nav>

        <div className="header-actions">
          <span className="header-location">
            <MapPin className="w-3.5 h-3.5" />
            Таллинн, Tatari 6
          </span>
          <a className="header-call" href="tel:+37256155030">Позвонить</a>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-spark" aria-hidden="true">✦</div>

        <div className="hero-title-block">
          <p className="hero-eyebrow">Стоматология Caninus</p>
          <h1 className="hero-title">
            <span className="hero-title-line hero-title-line-offset">Инновационная</span>
            <span className="hero-title-line">
              <strong>реставрация</strong> зубов <em>технология</em>
            </span>
            <span className="hero-title-line">
              для <em className="hero-healthy-word">здоровой</em>
            </span>
          </h1>

          <button className="hero-cta" onClick={scrollToContact}>
            Записаться на консультацию
          </button>
        </div>

        <ScrollVideoPlayer />

        <svg className="hero-orbit hero-orbit-back" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
          <path d="M42 154C178 42 632-14 920 82C1110 145 830 232 512 212C212 194-74 212 42 154Z" />
        </svg>
        <svg className="hero-orbit hero-orbit-front" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
          <path d="M376 181C450 202 552 205 640 188" />
        </svg>

        <div className="implant-note implant-note-left">
          <span className="implant-dot" />
          <p>Контроль приживления</p>
        </div>

        <div className="implant-note implant-note-right">
          <span className="implant-dot" />
          <p>Премиальные материалы</p>
        </div>

        <div className="hero-smile-block">
          <p>
            и <strong>Уверенной</strong>
          </p>
          <p>Улыбки</p>
        </div>

        <div className="hero-patient-copy">
          <div className="hero-mini-stat">
            <span>✦</span>
            <strong>1350+</strong>
          </div>
          <p>
            Пациентов с комплексными стоматологическими задачами прошли диагностику,
            получили персональный план лечения и вернули комфорт при жевании.
          </p>
        </div>

        <div className="hero-stat hero-stat-years">
          <strong>10</strong>
          <span>Лет<br />опыта</span>
        </div>

        <div className="hero-stat hero-stat-clinics">
          <span>Клиники<br />в Европе</span>
          <strong>02</strong>
        </div>

        <button className="hero-down-button" onClick={scrollToAbout} aria-label="Перейти к разделу о клинике">
          ↓
        </button>

        <button className="hero-about-link" onClick={scrollToAbout}>
          О нас
        </button>
      </section>

      <section ref={aboutRef} id="about" className="about-section">
        <div className="about-kicker">О нас</div>

        <div className="about-header">
          <h2 className="about-title">
            <span>
              Больше, чем <em>клиника</em>
            </span>
            <span className="about-title-accent">Ваш партнер</span>
            <span>улыбки</span>
          </h2>

          <p className="about-copy">
            В Caninus вы получаете не просто лечение, а внимательного партнера
            в здоровье и уверенности вашей улыбки.
          </p>
        </div>

        <div className="about-carousel">
          <div className="about-controls">
            <button onClick={handlePrevCard} aria-label="Предыдущая карточка" title="Предыдущая карточка">
              <ChevronLeft className="w-5 h-5 stroke-[1.2]" />
            </button>
            <button onClick={handleNextCard} aria-label="Следующая карточка" title="Следующая карточка">
              <ChevronRight className="w-5 h-5 stroke-[1.2]" />
            </button>
          </div>

          <div className="about-cards" aria-label="Преимущества клиники">
            {serviceCards.map((card, idx) => {
              const isSelected = aboutCardIndex === idx;

              return (
                <button
                  key={card.number}
                  onClick={() => setAboutCardIndex(idx)}
                  className={`feature-card ${isSelected ? "is-active" : ""}`}
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

      <div className="content-shell">
        <section className="route-section">
          <RouteGuide />
        </section>

        <section ref={contactRef} id="contact" className="contact-section">
          <div className="contact-grid">
            <div className="contact-details">
              <div>
                <span className="section-eyebrow">Запись на прием</span>
                <h3>
                  Мы готовы
                  <strong>помочь</strong>
                </h3>
                <p>
                  Оставьте контакты, и мы перезвоним для подбора комфортного
                  времени консультации.
                </p>
              </div>

              <div className="contact-card doctor-card">
                <div className="doctor-avatar">
                  <img src="/jevgeni abramovits.png" alt="dr. Jevgeni Abramovits" />
                </div>
                <div>
                  <span>Ведущий врач</span>
                  <strong>dr. Jevgeni Abramovits</strong>
                </div>
              </div>

              <div className="contact-card contact-list">
                <div>
                  <Phone className="w-4 h-4" />
                  <p>
                    <span>Телефон</span>
                    <a href="tel:+37256155030">+372 56 155 030</a>
                  </p>
                </div>
                <div>
                  <Mail className="w-4 h-4" />
                  <p>
                    <span>Электронная почта</span>
                    <a href="mailto:caninushambakliinik@gmail.com">caninushambakliinik@gmail.com</a>
                  </p>
                </div>
                <div>
                  <MapPin className="w-4 h-4" />
                  <p>
                    <span>Адрес клиники</span>
                    <strong>Tatari 6, Таллинн, Эстония</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="booking-panel">
              <BookingForm onDevelopmentClick={openDevelopmentModal} />
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <div className="footer-brand">
            <span>CANINUS</span>
            <p>Стоматология Caninus</p>
          </div>

          <div className="footer-wordmark">CANINUS</div>

          <div className="footer-legal">
            <p>&copy; 2026 CANINUS HAMBAKLIINIK OÜ · Рег. номер: 14044544 · Tatari 6, Tallinn, Эстония</p>
            <div>
              <a href="/privacy-policy">Политика конфиденциальности</a>
              <a href="/terms-of-service">Условия обслуживания</a>
              <a href="/cookie-policy">Cookie</a>
            </div>
          </div>
        </footer>
      </div>

      {isDevelopmentModalOpen && (
        <div className="development-modal-layer" role="presentation" onMouseDown={closeDevelopmentModal}>
          <div
            className="development-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="development-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="development-modal-close" onClick={closeDevelopmentModal} aria-label="Закрыть окно">
              <X className="w-4 h-4" />
            </button>

            <div className="development-modal-icon" aria-hidden="true">
              <Layers className="w-8 h-8 stroke-[1.4]" />
            </div>

            <span className="development-modal-kicker">Caninus hambakliinik</span>
            <h2 id="development-modal-title">Сайт еще в разработке</h2>
            <p>
              Мы дорабатываем разделы сайта и постепенно добавляем материалы. Запись на консультацию уже доступна
              по телефону и через контактную форму.
            </p>

            <div className="development-modal-list">
              <div>
                <CalendarClock className="w-5 h-5 stroke-[1.6]" />
                <p>
                  <strong>Разделы появятся скоро</strong>
                  <span>Услуги и результаты сейчас готовятся к публикации.</span>
                </p>
              </div>
              <div>
                <ShieldCheck className="w-5 h-5 stroke-[1.6]" />
                <p>
                  <strong>Информация проверяется</strong>
                  <span>Мы аккуратно собираем клинические данные, чтобы показать их корректно.</span>
                </p>
              </div>
            </div>

            <button className="development-modal-action" onClick={closeDevelopmentModal}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
