import LegalPage, { type LegalCopy } from "./LegalPage";

const documents = {
  et: {
    type: "terms",
    eyebrow: "Teenuse tingimused",
    title: "Teenustingimused",
    lead: "Need tingimused kirjeldavad, kuidas toimub CANINUS HAMBAKLIINIK OÜ veebilehe kasutamine, päringu saatmine ja visiidi kokkuleppimine.",
    updated: "Kehtib alates 2. juunist 2026. Viimati uuendatud 2. juunil 2026.",
    sections: [
      {
        title: "Üldsätted",
        body: [
          "Veebilehte ja selle vorme kasutades nõustute nende tingimustega. Kui te tingimustega ei nõustu, palume mitte saata veebivormi kaudu päringut.",
          "Veebilehel olev info on üldine ega asenda hambaarsti konsultatsiooni, diagnoosi ega raviplaani.",
        ],
      },
      {
        title: "Päring ja broneerimine",
        body: [
          "Kontaktvormi saatmine ei tähenda automaatselt kinnitatud visiidiaega. Kliinik võtab patsiendiga ühendust telefoni või e-posti teel ja lepib aja eraldi kokku.",
          "Palume esitada õiged kontaktandmed ning kirjeldada muret nii täpselt, kui see on patsiendi jaoks mugav.",
        ],
      },
      {
        title: "Meditsiiniline teenus",
        body: [
          "Kõik ravisoovitused, protseduurid ja hinnangud antakse pärast spetsialisti läbivaatust ning vajaduse korral diagnostikat.",
          "Kliinik võib teenuse osutamisest keelduda või visiidi ümber planeerida, kui see on meditsiiniliselt, tehniliselt või töökorralduslikult põhjendatud.",
        ],
      },
      {
        title: "Patsiendi kohustused",
        body: ["Patsient vastutab enda esitatud info õigsuse eest ning teavitab kliinikut olulistest terviseandmetest."],
        bullets: [
          "saabuda kokkulepitud ajaks või teavitada aegsasti, kui visiit ei sobi;",
          "järgida arsti soovitusi ja ravijuhiseid;",
          "teavitada allergiatest, ravimitest ja varasematest terviseprobleemidest;",
          "tasuda osutatud teenuste eest vastavalt kokkuleppele.",
        ],
      },
      {
        title: "Hinnad ja maksmine",
        body: [
          "Teenuse lõplik hind sõltub konsultatsioonist, diagnostikast ja kokkulepitud raviplaanist. Patsienti teavitatakse hinnast enne ravi alustamist.",
        ],
      },
      {
        title: "Vastutus ja vaidlused",
        body: [
          "Kliinik osutab teenuseid professionaalselt ja kehtivate nõuete järgi, kuid ravitulemus sõltub patsiendi seisundist, ravijuhiste järgimisest ja muudest individuaalsetest asjaoludest.",
          "Küsimuste või pretensioonide korral palume esmalt võtta ühendust kliinikuga. Kohaldatakse Eesti Vabariigi õigust.",
        ],
      },
    ],
  },
  ru: {
    type: "terms",
    eyebrow: "Условия сервиса",
    title: "Условия обслуживания",
    lead: "Эти условия описывают использование сайта CANINUS HAMBAKLIINIK OÜ, отправку заявки и согласование визита в клинику.",
    updated: "Действует с 2 июня 2026 года. Последнее обновление: 2 июня 2026 года.",
    sections: [
      {
        title: "Общие положения",
        body: [
          "Используя сайт и формы на нем, вы соглашаетесь с этими условиями. Если вы не согласны с условиями, пожалуйста, не отправляйте заявку через сайт.",
          "Информация на сайте носит общий характер и не заменяет консультацию стоматолога, диагностику или индивидуальный план лечения.",
        ],
      },
      {
        title: "Заявка и запись",
        body: [
          "Отправка контактной формы не означает автоматическое подтверждение визита. Клиника свяжется с пациентом по телефону или e-mail и отдельно согласует время приема.",
          "Пожалуйста, указывайте корректные контактные данные и описывайте проблему настолько подробно, насколько вам удобно.",
        ],
      },
      {
        title: "Медицинская услуга",
        body: [
          "Все рекомендации, процедуры и оценки даются после осмотра специалиста и, при необходимости, диагностики.",
          "Клиника может отказать в оказании услуги или перенести визит, если для этого есть медицинские, технические или организационные причины.",
        ],
      },
      {
        title: "Обязанности пациента",
        body: ["Пациент отвечает за достоверность предоставленной информации и сообщает клинике важные сведения о здоровье."],
        bullets: [
          "приходить в согласованное время или заранее предупреждать, если визит невозможен;",
          "следовать рекомендациям врача и инструкциям по лечению;",
          "сообщать об аллергиях, лекарствах и предыдущих медицинских проблемах;",
          "оплачивать оказанные услуги согласно договоренности.",
        ],
      },
      {
        title: "Цены и оплата",
        body: [
          "Итоговая стоимость услуги зависит от консультации, диагностики и согласованного плана лечения. Пациента информируют о цене до начала лечения.",
        ],
      },
      {
        title: "Ответственность и споры",
        body: [
          "Клиника оказывает услуги профессионально и в соответствии с применимыми требованиями, но результат лечения зависит от состояния пациента, соблюдения рекомендаций и индивидуальных обстоятельств.",
          "При вопросах или претензиях просим сначала связаться с клиникой. Применяется право Эстонской Республики.",
        ],
      },
    ],
  },
} satisfies Record<"et" | "ru", LegalCopy>;

export default function TermsOfService() {
  return <LegalPage documents={documents} />;
}
