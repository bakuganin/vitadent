import LegalPage, { type LegalCopy } from "./LegalPage";

const documents = {
  et: {
    type: "cookie",
    eyebrow: "Veebilehe eelistused",
    title: "Cookie poliitika",
    lead: "Selgitame, kuidas VITADENT OÜ kasutab küpsiseid ja sarnaseid tehnoloogiaid veebilehe toimimiseks ning kasutuskogemuse parandamiseks.",
    updated: "Kehtib alates 2. juunist 2026. Viimati uuendatud 2. juunil 2026.",
    sections: [
      {
        title: "Mis on cookie",
        body: [
          "Cookie ehk küpsis on väike tekstifail, mis salvestatakse teie seadmesse veebilehe külastamisel. Küpsised aitavad lehel töötada, mäletada eelistusi ja mõista, kuidas lehte kasutatakse.",
        ],
      },
      {
        title: "Milliseid küpsiseid kasutame",
        body: ["Võime kasutada järgmisi küpsiste kategooriaid."],
        bullets: [
          "hädavajalikud küpsised, mis tagavad veebilehe tehnilise toimimise;",
          "eelistuste küpsised, näiteks valitud keele mäletamiseks;",
          "analüütilised küpsised, mis aitavad mõista veebilehe kasutust üldistatud kujul;",
          "kolmandate osapoolte küpsised, näiteks kaarditeenuse kuvamisel.",
        ],
      },
      {
        title: "Google Maps ja välised teenused",
        body: [
          "Kui veebilehel kuvatakse kaarditeenust või muud välise teenuse sisu, võib teenusepakkuja salvestada oma küpsiseid. Nende küpsiste kasutamist juhivad vastava teenusepakkuja tingimused.",
        ],
      },
      {
        title: "Küpsiste haldamine",
        body: [
          "Saate küpsiseid hallata brauseri seadetes. Küpsiste piiramine võib mõjutada veebilehe mugavust või mõne funktsiooni toimimist.",
          "Kui kasutame tulevikus eraldi küpsiste nõusoleku bännerit, saab seal mittevajalike küpsiste eelistusi muuta.",
        ],
      },
      {
        title: "Säilitamise aeg",
        body: [
          "Seansiküpsised kustutatakse tavaliselt brauseri sulgemisel. Püsiküpsised säilivad piiratud aja või kuni kasutaja need brauserist eemaldab.",
        ],
      },
      {
        title: "Kontakt",
        body: [
          "Cookie poliitika või privaatsusega seotud küsimuste korral võtke ühendust aadressil infovitadent24@gmail.com.",
        ],
      },
    ],
  },
  ru: {
    type: "cookie",
    eyebrow: "Настройки сайта",
    title: "Политика Cookie",
    lead: "Объясняем, как VITADENT OÜ использует cookie и похожие технологии для работы сайта и улучшения пользовательского опыта.",
    updated: "Действует с 2 июня 2026 года. Последнее обновление: 2 июня 2026 года.",
    sections: [
      {
        title: "Что такое cookie",
        body: [
          "Cookie - это небольшой текстовый файл, который сохраняется на вашем устройстве при посещении сайта. Cookie помогают сайту работать, запоминать настройки и понимать, как используется страница.",
        ],
      },
      {
        title: "Какие cookie мы используем",
        body: ["Мы можем использовать следующие категории cookie."],
        bullets: [
          "обязательные cookie, которые обеспечивают техническую работу сайта;",
          "cookie настроек, например для запоминания выбранного языка;",
          "аналитические cookie, которые помогают понимать использование сайта в обобщенном виде;",
          "cookie третьих сторон, например при отображении карты.",
        ],
      },
      {
        title: "Google Maps и внешние сервисы",
        body: [
          "Если на сайте отображается карта или другой контент внешнего сервиса, поставщик такого сервиса может сохранять собственные cookie. Их использование регулируется условиями соответствующего поставщика.",
        ],
      },
      {
        title: "Управление cookie",
        body: [
          "Вы можете управлять cookie в настройках браузера. Ограничение cookie может повлиять на удобство сайта или работу отдельных функций.",
          "Если в будущем будет добавлен отдельный баннер согласия, в нем можно будет менять настройки необязательных cookie.",
        ],
      },
      {
        title: "Срок хранения",
        body: [
          "Сессионные cookie обычно удаляются после закрытия браузера. Постоянные cookie хранятся ограниченное время или до тех пор, пока пользователь не удалит их в браузере.",
        ],
      },
      {
        title: "Контакт",
        body: [
          "По вопросам политики Cookie или конфиденциальности можно написать на infovitadent24@gmail.com.",
        ],
      },
    ],
  },
} satisfies Record<"et" | "ru", LegalCopy>;

export default function CookiePolicy() {
  return <LegalPage documents={documents} />;
}
