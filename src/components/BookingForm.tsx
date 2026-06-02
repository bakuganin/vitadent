import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookingData } from "../types";
import {
  Activity,
  Annoyed,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Frown,
  Gauge,
  HeartPulse,
  Loader2,
  Meh,
  MessageSquare,
  Phone,
  Send,
  Smile,
  SmilePlus,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type BookingFormProps = {
  language: "et" | "ru";
};

type SingleField = "previousVisit" | "painFrequency" | "painIntensity";
type MultiField = "visitGoals" | "concerns";
type StepId = "contacts" | "visit" | "symptoms" | "pain";

type StepConfig = {
  id: StepId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const initialFormData: BookingData = {
  fullName: "",
  phone: "",
  previousVisit: "",
  visitGoals: [],
  concerns: [],
  painFrequency: "",
  painIntensity: "",
  problem: "",
};

const painIntensityIcons: LucideIcon[] = [SmilePlus, Smile, Meh, Annoyed, Frown];

const bookingCopy = {
  et: {
    required: "Palun täitke nimi ja telefoninumber.",
    fullName: "Nimi",
    phone: "Kontakttelefon",
    previousVisit: "Kas olete varem meie kliinikus käinud?",
    previousVisitOptions: ["Jah, olen käinud", "Ei, tulen esimest korda"],
    visitGoal: "Visiidi eesmärk",
    visitGoals: [
      "Kiire abi (erakorraline vastuvõtt)",
      "Hambavalu ravi",
      "Trauma",
      "Ennetav kontroll / konsultatsioon",
      "Kaariese ravi",
      "Tarkusehamba eemaldamine",
      "Professionaalne suuhügieen",
      "Proteesimine",
      "Implantatsioon",
      "Hammaste valgendamine / esteetiline hambaravi",
    ],
    concerns: "Mis teid täpsemalt häirib?",
    concernOptions: [
      "Valu",
      "Hammaste tundlikkus",
      "Igemete veritsus",
      "Ebameeldiv hingeõhk",
      "Puuduv hammas / puuduvad hambad",
      "Muu",
    ],
    painFrequency: "Kui sageli valu tekib?",
    painFrequencyOptions: ["Pidevalt", "Närimisel", "Külma tarbimisel", "Kuuma tarbimisel", "Magusa / hapu tarbimisel"],
    painIntensity: "Valu tugevus",
    painIntensityOptions: [
      "0 - valu puudub",
      "1-3 - nõrk, ei sega igapäevaelu",
      "4-5 - mõõdukas, ebamugav, kuid talutav",
      "6-7 - tugev, segab söömist ja rääkimist",
      "8-10 - väga tugev, vajab kiiret abi",
    ],
    complaint: "Kirjeldage oma kaebust",
    multiHint: "Valige üks või mitu varianti, et arst saaks vastuvõtuks paremini valmistuda.",
    painHint: "Kui valu on väga tugev, helistage kiirema aja kokkuleppimiseks kliinikusse.",
    requiredStep: "Valige vastus, et jätkata.",
    requiredContactStep: "Sisestage nimi, telefon ja valige, kas olete varem kliinikus käinud.",
    requiredPainFrequency: "Valige, kui sageli valu tekib.",
    requiredPainIntensity: "Valige valu tugevus.",
    progress: "Samm",
    back: "Tagasi",
    continue: "Edasi",
    submit: "Saada päring",
    sending: "Saatmine...",
    error: "Päringu saatmine ebaõnnestus. Palun proovige uuesti või helistage meile.",
    successTitle: "Päring on vastu võetud",
    successText:
      "Saime teie konsultatsioonipäringu. Päringuid on praegu palju, kuid vaatame kõik võimalikult kiiresti üle. Vabandame juba ette võimaliku ootamise pärast.",
    patient: "Patsient:",
    contactPhone: "Kontakttelefon:",
    previousVisitLabel: "Varasem külastus:",
    visitGoalLabel: "Visiidi eesmärk:",
    concernsLabel: "Kaebused:",
    painFrequencyLabel: "Valu sagedus:",
    painIntensityLabel: "Valu tugevus:",
    problemLabel: "Kaebuse kirjeldus:",
    note:
      "Dr. Jevgeni Abramovits võtab teiega ühendust, et kinnitada täpne vastuvõtuaeg. Täname usalduse eest Caninuse kliiniku vastu.",
    reset: "Broneeri veel kord",
    steps: {
      contacts: {
        title: "Kontaktid",
        subtitle: "Jätke nimi ja telefon, et saaksime teiega aja täpsustamiseks ühendust võtta.",
      },
      visit: {
        title: "Visiidi eesmärk",
        subtitle: "Märkige, millega soovite kliinikusse tulla.",
      },
      symptoms: {
        title: "Kaebus",
        subtitle: "Valige sümptomid ja millal valu kõige sagedamini tekib.",
      },
      pain: {
        title: "Valu hinnang",
        subtitle: "Lisage valu tugevus ja lühike kirjeldus.",
      },
    },
  },
  ru: {
    required: "Пожалуйста, заполните имя и контактный телефон.",
    fullName: "Имя",
    phone: "Контактный телефон",
    previousVisit: "Вы были ранее в нашей клинике?",
    previousVisitOptions: ["Да, был(а)", "Нет, буду впервые"],
    visitGoal: "Цель визита",
    visitGoals: [
      "Срочная помощь (экстренный прием)",
      "Лечение зубной боли",
      "Травма",
      "Профилактический осмотр / консультация",
      "Лечение кариеса",
      "Удаление зуба мудрости",
      "Профессиональная гигиена полости рта",
      "Протезирование",
      "Имплантация",
      "Отбеливание зубов / эстетическая стоматология",
    ],
    concerns: "Что именно вас беспокоит?",
    concernOptions: [
      "Боль",
      "Чувствительность зубов",
      "Кровоточивость десен",
      "Неприятный запах изо рта",
      "Отсутствие зуба(-ов)",
      "Другое",
    ],
    painFrequency: "Как часто возникает боль?",
    painFrequencyOptions: ["Постоянно", "При жевании", "При приеме холодного", "При приеме горячего", "При сладком / кислом"],
    painIntensity: "Оцените интенсивность боли",
    painIntensityOptions: [
      "0 - боли нет",
      "1-3 - слабая, не мешает в повседневной жизни",
      "4-5 - умеренная, доставляет дискомфорт, но терпима",
      "6-7 - сильная, мешает есть и говорить",
      "8-10 - очень сильная, нужна срочная помощь",
    ],
    complaint: "Опишите жалобу",
    multiHint: "Можно выбрать один или несколько вариантов, чтобы врачу было проще подготовиться к приему.",
    painHint: "Если боль очень сильная, лучше сразу позвонить в клинику для срочной записи.",
    requiredStep: "Выберите ответ, чтобы продолжить.",
    requiredContactStep: "Введите имя, телефон и выберите, были ли вы раньше в клинике.",
    requiredPainFrequency: "Выберите, как часто возникает боль.",
    requiredPainIntensity: "Выберите интенсивность боли.",
    progress: "Шаг",
    back: "Назад",
    continue: "Далее",
    submit: "Отправить заявку",
    sending: "Отправка...",
    error: "Не удалось отправить заявку. Попробуйте еще раз или позвоните нам.",
    successTitle: "Заявка принята!",
    successText:
      "Мы получили вашу заявку. Сейчас заявок много, и мы стараемся как можно скорее рассмотреть всех. Заранее извиняемся за ожидание.",
    patient: "Пациент:",
    contactPhone: "Телефон для связи:",
    previousVisitLabel: "Ранее в клинике:",
    visitGoalLabel: "Цель визита:",
    concernsLabel: "Что беспокоит:",
    painFrequencyLabel: "Частота боли:",
    painIntensityLabel: "Интенсивность боли:",
    problemLabel: "Описание жалобы:",
    note:
      "Д-р Евгений Абрамовитс свяжется с вами по указанному телефону в ближайшее время для подтверждения точного времени приема. Благодарим за доверие к клинике Caninus!",
    reset: "Записаться еще раз",
    steps: {
      contacts: {
        title: "Контакты",
        subtitle: "Оставьте имя и телефон, чтобы мы могли быстро связаться и подобрать время.",
      },
      visit: {
        title: "Цель визита",
        subtitle: "Отметьте, с чем вы хотите обратиться в клинику.",
      },
      symptoms: {
        title: "Жалоба",
        subtitle: "Выберите симптомы и когда боль проявляется чаще всего.",
      },
      pain: {
        title: "Оценка боли",
        subtitle: "Укажите интенсивность и коротко опишите, что беспокоит.",
      },
    },
  },
};

export default function BookingForm({ language }: BookingFormProps) {
  const t = bookingCopy[language];
  const [formData, setFormData] = useState<BookingData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [attemptedStep, setAttemptedStep] = useState<StepId | null>(null);

  const steps = useMemo<StepConfig[]>(
    () => [
      { id: "contacts", title: t.steps.contacts.title, subtitle: t.steps.contacts.subtitle, icon: User },
      { id: "visit", title: t.steps.visit.title, subtitle: t.steps.visit.subtitle, icon: HeartPulse },
      { id: "symptoms", title: t.steps.symptoms.title, subtitle: t.steps.symptoms.subtitle, icon: Activity },
      { id: "pain", title: t.steps.pain.title, subtitle: t.steps.pain.subtitle, icon: Gauge },
    ],
    [t],
  );

  const currentStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const painConcernValues = useMemo(() => [t.concernOptions[0], t.concernOptions[1]], [t]);
  const requiresPainFrequency = painConcernValues.some((value) => formData.concerns.includes(value));
  const isContactStepValid = Boolean(formData.fullName.trim() && formData.phone.trim() && formData.previousVisit);
  const isVisitStepValid = formData.visitGoals.length > 0;
  const isSymptomsStepValid = formData.concerns.length > 0 && (!requiresPainFrequency || Boolean(formData.painFrequency));
  const isPainStepValid = Boolean(formData.painIntensity);
  const isFormReady = isContactStepValid && isVisitStepValid && isSymptomsStepValid && isPainStepValid;
  const currentStepValid =
    currentStep.id === "contacts"
      ? isContactStepValid
      : currentStep.id === "visit"
        ? isVisitStepValid
        : currentStep.id === "symptoms"
          ? isSymptomsStepValid
          : isPainStepValid;
  const validationMessage =
    currentStep.id === "contacts"
      ? t.requiredContactStep
      : currentStep.id === "symptoms" && requiresPainFrequency && !formData.painFrequency
        ? t.requiredPainFrequency
        : currentStep.id === "pain"
          ? t.requiredPainIntensity
          : t.requiredStep;

  useEffect(() => {
    if (requiresPainFrequency) return;
    if (!formData.painFrequency) return;
    setFormData((current) => ({ ...current, painFrequency: "" }));
  }, [formData.painFrequency, requiresPainFrequency]);

  const updateField = <K extends keyof BookingData>(field: K, value: BookingData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const updateSingleField = (field: SingleField, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleArrayValue = (field: MultiField, value: string) => {
    setFormData((current) => {
      const currentValues = current[field];
      return {
        ...current,
        [field]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const submitBookingRequest = async () => {
    if (status === "loading") return;

    if (!isFormReady) {
      const firstInvalidStep = !isContactStepValid ? 0 : !isVisitStepValid ? 1 : !isSymptomsStepValid ? 2 : 3;
      setStepIndex(firstInvalidStep);
      setAttemptedStep(steps[firstInvalidStep].id);
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitBookingRequest();
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setStepIndex(0);
    setAttemptedStep(null);
    setStatus("idle");
  };

  const goNext = () => {
    if (!currentStepValid) {
      setAttemptedStep(currentStep.id);
      return;
    }

    setAttemptedStep(null);
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setAttemptedStep(null);
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const renderSingleChoices = (options: string[], field: SingleField) => (
    <div className="booking-option-list">
      {options.map((option) => {
        const selected = formData[field] === option;

        return (
          <button
            key={option}
            type="button"
            className={`booking-choice-card ${selected ? "is-selected" : ""}`}
            aria-pressed={selected}
            onClick={() => updateSingleField(field, option)}
          >
            <span className="booking-choice-check" aria-hidden="true">
              <Check />
            </span>
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );

  const renderMultiChoices = (options: string[], field: MultiField) => (
    <div className="booking-option-list is-compact">
      {options.map((option) => {
        const selected = formData[field].includes(option);

        return (
          <button
            key={option}
            type="button"
            className={`booking-choice-card ${selected ? "is-selected" : ""}`}
            aria-pressed={selected}
            onClick={() => toggleArrayValue(field, option)}
          >
            <span className="booking-choice-check" aria-hidden="true">
              <Check />
            </span>
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );

  const formatList = (items: string[]) => items.join(", ");
  const StepIcon = currentStep.icon;
  const isLastStep = stepIndex === steps.length - 1;

  return (
    <div className="w-full max-w-full">
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.form
            key="booking-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="booking-form booking-step-form"
          >
            <div className="booking-step-top">
              <div className="booking-progress-meta">
                <span>
                  {t.progress} {stepIndex + 1} / {steps.length}
                </span>
                <strong>{Math.round(progress)}%</strong>
              </div>
              <div className="booking-progress-track" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.section
                key={currentStep.id}
                className="booking-step"
                initial={{ opacity: 0, x: 22, filter: "blur(7px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -18, filter: "blur(7px)" }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <header className="booking-step-heading">
                  <span className="booking-step-icon" aria-hidden="true">
                    <StepIcon />
                  </span>
                  <div>
                    <span className="booking-step-kicker">Caninus Hambaravi</span>
                    <h4>{currentStep.title}</h4>
                    <p>{currentStep.subtitle}</p>
                  </div>
                </header>

                {currentStep.id === "contacts" && (
                  <div className="booking-step-fields">
                    <div className="booking-field-grid">
                      <label className="booking-line-field">
                        <span>{t.fullName}</span>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          autoComplete="name"
                        />
                        <User aria-hidden="true" />
                      </label>

                      <label className="booking-line-field">
                        <span>{t.phone}</span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          autoComplete="tel"
                        />
                        <Phone aria-hidden="true" />
                      </label>
                    </div>

                    <div className="booking-step-question">
                      <p className="booking-question-label">
                        <ClipboardList aria-hidden="true" />
                        {t.previousVisit}
                      </p>
                      {renderSingleChoices(t.previousVisitOptions, "previousVisit")}
                    </div>
                  </div>
                )}

                {currentStep.id === "visit" && (
                  <div className="booking-step-fields">
                    <div className="booking-step-question">
                      <p className="booking-question-label">
                        <HeartPulse aria-hidden="true" />
                        {t.visitGoal}
                      </p>
                      {renderMultiChoices(t.visitGoals, "visitGoals")}
                    </div>
                    <p className="booking-step-note">
                      <CheckCircle2 aria-hidden="true" />
                      {t.multiHint}
                    </p>
                  </div>
                )}

                {currentStep.id === "symptoms" && (
                  <div className="booking-step-fields">
                    <div className="booking-step-question">
                      <p className="booking-question-label">
                        <Activity aria-hidden="true" />
                        {t.concerns}
                      </p>
                      {renderMultiChoices(t.concernOptions, "concerns")}
                    </div>

                    {requiresPainFrequency && (
                      <motion.div
                        className="booking-step-question"
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="booking-question-label">
                          <Clock3 aria-hidden="true" />
                          {t.painFrequency}
                        </p>
                        {renderSingleChoices(t.painFrequencyOptions, "painFrequency")}
                      </motion.div>
                    )}
                  </div>
                )}

                {currentStep.id === "pain" && (
                  <div className="booking-step-fields">
                    <div className="booking-step-question">
                      <p className="booking-question-label">
                        <Gauge aria-hidden="true" />
                        {t.painIntensity}
                      </p>
                      <div className="booking-option-list is-wide">
                        {t.painIntensityOptions.map((option, index) => {
                          const selected = formData.painIntensity === option;
                          const PainIcon = painIntensityIcons[index] ?? Gauge;

                          return (
                            <button
                              key={option}
                              type="button"
                              className={`booking-choice-card is-pain pain-level-${index} ${selected ? "is-selected" : ""}`}
                              aria-pressed={selected}
                              onClick={() => updateSingleField("painIntensity", option)}
                            >
                              <span className="booking-choice-check" aria-hidden="true">
                                <Check />
                              </span>
                              <span>{option}</span>
                              <span className="booking-pain-state" aria-hidden="true">
                                <PainIcon />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <label className="booking-line-field is-textarea">
                      <span>{t.complaint}</span>
                      <textarea
                        value={formData.problem}
                        onChange={(e) => updateField("problem", e.target.value)}
                        rows={3}
                      />
                      <MessageSquare aria-hidden="true" />
                    </label>

                    <p className="booking-step-note">
                      <Phone aria-hidden="true" />
                      {t.painHint}
                    </p>
                  </div>
                )}
              </motion.section>
            </AnimatePresence>

            <div className="booking-nav-row">
              <button
                type="button"
                className="booking-nav-button"
                onClick={goBack}
                disabled={stepIndex === 0 || status === "loading"}
              >
                <ArrowLeft aria-hidden="true" />
                {t.back}
              </button>

              {isLastStep ? (
                <button type="submit" className="booking-nav-button is-primary" disabled={status === "loading"}>
                  {status === "loading" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
                  {status === "loading" ? t.sending : t.submit}
                </button>
              ) : (
                <button
                  type="button"
                  className="booking-nav-button is-primary"
                  onClick={goNext}
                  disabled={status === "loading"}
                >
                  {t.continue}
                  <ArrowRight aria-hidden="true" />
                </button>
              )}
            </div>

            {attemptedStep === currentStep.id && !currentStepValid && status !== "loading" && (
              <p className="booking-validation-note" role="status">
                {validationMessage}
              </p>
            )}

            {status === "error" && (
              <p role="alert" className="booking-error">
                {t.error}
              </p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/60 p-8 text-center shadow-xl flex flex-col items-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-905">{t.successTitle}</h3>
              <p className="text-sm text-stone-500 max-w-sm">{t.successText}</p>
            </div>

            <div className="w-full border-t border-stone-100 pt-5 space-y-3 text-left text-xs text-stone-600">
              <div className="flex justify-between gap-4">
                <span>{t.patient}</span>
                <strong className="text-stone-850 text-right">{formData.fullName}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span>{t.contactPhone}</span>
                <strong className="text-stone-850 text-right">{formData.phone}</strong>
              </div>
              {formData.previousVisit && (
                <div className="flex justify-between gap-4">
                  <span>{t.previousVisitLabel}</span>
                  <strong className="text-stone-500 text-right">{formData.previousVisit}</strong>
                </div>
              )}
              {formData.visitGoals.length > 0 && (
                <div className="flex flex-col gap-1 pt-1 border-t border-dashed border-stone-100 text-stone-500">
                  <span>{t.visitGoalLabel}</span>
                  <p className="text-stone-700 bg-stone-50 p-2 rounded border border-stone-100/50 mt-1">
                    {formatList(formData.visitGoals)}
                  </p>
                </div>
              )}
              {formData.concerns.length > 0 && (
                <div className="flex flex-col gap-1 pt-1 border-t border-dashed border-stone-100 text-stone-500">
                  <span>{t.concernsLabel}</span>
                  <p className="text-stone-700 bg-stone-50 p-2 rounded border border-stone-100/50 mt-1">
                    {formatList(formData.concerns)}
                  </p>
                </div>
              )}
              {formData.painFrequency && (
                <div className="flex justify-between gap-4">
                  <span>{t.painFrequencyLabel}</span>
                  <strong className="text-stone-500 text-right">{formData.painFrequency}</strong>
                </div>
              )}
              {formData.painIntensity && (
                <div className="flex flex-col gap-1 pt-1 border-t border-dashed border-stone-100 text-stone-500">
                  <span>{t.painIntensityLabel}</span>
                  <p className="text-stone-700 bg-stone-50 p-2 rounded border border-stone-100/50 mt-1">
                    {formData.painIntensity}
                  </p>
                </div>
              )}
              {formData.problem && (
                <div className="flex flex-col gap-1 pt-1 border-t border-dashed border-stone-100 text-stone-500">
                  <span>{t.problemLabel}</span>
                  <p className="italic text-stone-700 bg-stone-50 p-2 rounded border border-stone-100/50 mt-1">
                    "{formData.problem}"
                  </p>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-400 pt-2 leading-relaxed">{t.note}</p>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 border border-stone-300 hover:border-stone-900 rounded-full text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all font-medium cursor-pointer"
            >
              {t.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
