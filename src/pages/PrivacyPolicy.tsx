import LegalPage, { type LegalCopy } from "./LegalPage";

const documents = {
  et: {
    type: "privacy",
    eyebrow: "Juriidiline info",
    title: "Privaatsuspoliitika",
    lead: "Selgitame, milliseid isikuandmeid CANINUS HAMBAKLIINIK OÜ kogub, miks neid kasutatakse ja kuidas patsient saab oma õigusi kasutada.",
    updated: "Kehtib alates 2. juunist 2026. Viimati uuendatud 2. juunil 2026.",
    sections: [
      {
        title: "Vastutav töötleja",
        body: [
          "Isikuandmete vastutav töötleja on CANINUS HAMBAKLIINIK OÜ, registrikood 14044544, aadress Tatari 6, Tallinn, Eesti.",
          "Küsimuste korral saab meiega ühendust võtta e-posti aadressil caninushambakliinik@gmail.com või telefonil +372 56 155 030.",
        ],
      },
      {
        title: "Milliseid andmeid kogume",
        body: [
          "Kogume ainult andmeid, mis on vajalikud päringu käsitlemiseks, visiidi broneerimiseks ja teenuse korraldamiseks.",
        ],
        bullets: [
          "nimi, telefoninumber ja e-posti aadress, kui patsient need edastab;",
          "päringu või kaebuse sisu, valitud visiidi eesmärk ja sümptomite kirjeldus;",
          "varasema kliinikukülastuse info ning patsiendi poolt vabatahtlikult esitatud terviseandmed;",
          "veebilehe tehnilised andmed, nagu brauseri info ja küpsiste eelistused.",
        ],
      },
      {
        title: "Andmete kasutamise eesmärgid",
        body: [
          "Kasutame andmeid selleks, et võtta patsiendiga ühendust, leida sobiv vastuvõtuaeg, valmistada ette konsultatsioon ning vastata esitatud küsimustele.",
          "Tervisega seotud andmeid kasutatakse ainult patsiendi enda algatusel esitatud päringu käsitlemiseks ja võimaliku visiidi ettevalmistamiseks.",
        ],
      },
      {
        title: "Õiguslik alus",
        body: [
          "Andmete töötlemise aluseks on lepingu ettevalmistamine ja täitmine, kliiniku õigustatud huvi turvalise ja toimiva veebilehe vastu, seadusest tulenevad kohustused ning vajaduse korral patsiendi nõusolek.",
        ],
      },
      {
        title: "Säilitamine ja edastamine",
        body: [
          "Säilitame andmeid ainult nii kaua, kui see on vajalik päringu lahendamiseks, teenuse osutamiseks või seadusest tulenevate kohustuste täitmiseks.",
          "Me ei müü patsientide andmeid. Andmeid võidakse edastada üksnes teenusepakkujatele, kes aitavad veebilehte, e-posti või kliiniku töökorraldust hallata, ning ametiasutustele, kui seadus seda nõuab.",
        ],
      },
      {
        title: "Patsiendi õigused",
        body: [
          "Patsiendil on õigus küsida juurdepääsu oma andmetele, nõuda parandamist, kustutamist või töötlemise piiramist ning esitada vastuväide, kui selleks on seadusest tulenev alus.",
          "Kui leiate, et andmeid on töödeldud ebaõigesti, on teil õigus pöörduda Andmekaitse Inspektsiooni poole.",
        ],
      },
    ],
  },
  ru: {
    type: "privacy",
    eyebrow: "Юридическая информация",
    title: "Политика конфиденциальности",
    lead: "Объясняем, какие персональные данные обрабатывает CANINUS HAMBAKLIINIK OÜ, зачем они нужны и как пациент может воспользоваться своими правами.",
    updated: "Действует с 2 июня 2026 года. Последнее обновление: 2 июня 2026 года.",
    sections: [
      {
        title: "Контролер данных",
        body: [
          "Контролером персональных данных является CANINUS HAMBAKLIINIK OÜ, регистрационный номер 14044544, адрес Tatari 6, Таллинн, Эстония.",
          "По вопросам обработки данных можно написать на caninushambakliinik@gmail.com или позвонить по номеру +372 56 155 030.",
        ],
      },
      {
        title: "Какие данные мы собираем",
        body: [
          "Мы собираем только те данные, которые нужны для обработки заявки, записи на визит и организации стоматологической услуги.",
        ],
        bullets: [
          "имя, номер телефона и e-mail, если пациент их указывает;",
          "текст заявки или жалобы, цель визита и описание симптомов;",
          "информацию о предыдущем посещении клиники и добровольно указанные медицинские сведения;",
          "технические данные сайта, например информацию о браузере и настройках cookie.",
        ],
      },
      {
        title: "Цели обработки",
        body: [
          "Мы используем данные, чтобы связаться с пациентом, подобрать удобное время приема, подготовить консультацию и ответить на вопросы.",
          "Данные о здоровье используются только для обработки заявки, которую пациент отправил сам, и для подготовки возможного визита.",
        ],
      },
      {
        title: "Правовое основание",
        body: [
          "Обработка основана на подготовке и исполнении договора, законном интересе клиники в безопасной работе сайта, юридических обязанностях и, при необходимости, согласии пациента.",
        ],
      },
      {
        title: "Хранение и передача",
        body: [
          "Мы храним данные только столько, сколько необходимо для обработки заявки, оказания услуги или выполнения требований закона.",
          "Мы не продаем данные пациентов. Данные могут передаваться только поставщикам, которые помогают поддерживать сайт, e-mail и рабочие процессы клиники, а также госорганам, если это требуется законом.",
        ],
      },
      {
        title: "Права пациента",
        body: [
          "Пациент может запросить доступ к своим данным, их исправление, удаление, ограничение обработки или возразить против обработки, если для этого есть законное основание.",
          "Если вы считаете, что данные обработаны неправильно, вы можете обратиться в Инспекцию по защите данных Эстонии.",
        ],
      },
    ],
  },
} satisfies Record<"et" | "ru", LegalCopy>;

export default function PrivacyPolicy() {
  return <LegalPage documents={documents} />;
}
