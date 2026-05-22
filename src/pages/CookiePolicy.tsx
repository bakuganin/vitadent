import React from "react";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div
      className="min-h-screen text-[#212121] selection:bg-slate-800 selection:text-[#EAEFF5] font-sans antialiased"
      style={{
        background: `
          radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 55%),
          radial-gradient(circle at 90% 10%, rgba(242, 247, 251, 1) 0%, rgba(242, 247, 251, 0) 50%),
          radial-gradient(circle at 50% 100%, rgba(235, 241, 248, 1) 0%, rgba(235, 241, 248, 0) 60%),
          #C2D3E3
        `,
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          На главную
        </a>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-light text-stone-900 tracking-tight mb-4">
          Политика использования{" "}
          <span className="font-semibold">файлов Cookie</span>
        </h1>

        <p className="text-stone-400 text-sm mb-12">
          Последнее обновление: 22 мая 2026 г.
        </p>

        <div className="space-y-12 text-stone-600 text-sm leading-relaxed">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              1. Общие сведения
            </h2>
            <p>
              Настоящая Политика использования файлов cookie (далее — «Политика»)
              описывает, каким образом{" "}
              <strong className="text-stone-800">CANINUS HAMBAKLIINIK OÜ</strong>{" "}
              (регистрационный номер: 14044544, юридический адрес: Tatari 6,
              Tallinn, Эстония; далее — «Клиника», «мы», «наш») использует
              файлы cookie и аналогичные технологии на веб-сайте{" "}
              <strong className="text-stone-800">caninus.ee</strong> (далее —
              «Сайт»).
            </p>
            <p className="mt-3">
              Используя наш Сайт, вы подтверждаете, что ознакомились с настоящей
              Политикой и соглашаетесь с использованием файлов cookie в
              соответствии с её условиями. Данная Политика является составной
              частью нашей{" "}
              <a
                href="/privacy-policy"
                className="text-stone-800 underline underline-offset-2 hover:text-stone-950 transition-colors"
              >
                Политики конфиденциальности
              </a>
              .
            </p>
          </section>

          {/* 2. What are cookies */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              2. Что такое файлы cookie
            </h2>
            <p>
              Файлы cookie — это небольшие текстовые файлы, которые сохраняются
              на вашем устройстве (компьютере, смартфоне, планшете) при
              посещении веб-сайтов. Они широко используются для обеспечения
              корректной работы сайтов, повышения эффективности их
              функционирования, а также для предоставления информации
              владельцам сайта.
            </p>
            <p className="mt-3">
              Файлы cookie могут быть «сеансовыми» (временными) — они
              автоматически удаляются после закрытия браузера, либо
              «постоянными» — они сохраняются на вашем устройстве в течение
              определённого периода времени или до момента их удаления вручную.
            </p>
          </section>

          {/* 3. Types of cookies */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              3. Типы используемых файлов cookie
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-stone-800 mb-2">
                  3.1. Строго необходимые файлы cookie
                </h3>
                <p>
                  Эти файлы cookie необходимы для работы Сайта и не могут быть
                  отключены в наших системах. Они обычно устанавливаются в ответ
                  на ваши действия, такие как настройка параметров
                  конфиденциальности, вход в систему или заполнение форм. Без
                  этих файлов cookie Сайт не может функционировать корректно.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-stone-800 mb-2">
                  3.2. Аналитические файлы cookie
                </h3>
                <p>
                  Эти файлы cookie позволяют нам подсчитывать количество
                  посещений и источники трафика, чтобы оценивать и улучшать
                  работу нашего Сайта. Они помогают нам определить, какие
                  страницы наиболее и наименее популярны, и увидеть, как
                  посетители перемещаются по Сайту. Вся информация, собираемая
                  этими файлами cookie, агрегирована и, следовательно, анонимна.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-stone-800 mb-2">
                  3.3. Функциональные файлы cookie
                </h3>
                <p>
                  Эти файлы cookie позволяют Сайту обеспечивать расширенную
                  функциональность и персонализацию, например, запоминание
                  выбранного языка, региона или предпочтений пользователя. Они
                  могут устанавливаться как нами, так и сторонними поставщиками,
                  услуги которых мы интегрировали на наших страницах.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Specific cookies table */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              4. Перечень используемых файлов cookie
            </h2>
            <p className="mb-6">
              Ниже приведён перечень файлов cookie, которые могут использоваться
              на нашем Сайте:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-stone-200/60">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-stone-100/80 text-stone-900">
                    <th className="text-left px-4 py-3 font-semibold">
                      Название
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Тип
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Срок хранения
                    </th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Назначение
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-stone-800">
                      cookie_consent
                    </td>
                    <td className="px-4 py-3">Необходимый</td>
                    <td className="px-4 py-3">12 месяцев</td>
                    <td className="px-4 py-3">
                      Сохраняет ваш выбор относительно согласия на использование
                      файлов cookie
                    </td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-stone-800">
                      _ga
                    </td>
                    <td className="px-4 py-3">Аналитический</td>
                    <td className="px-4 py-3">24 месяца</td>
                    <td className="px-4 py-3">
                      Google Analytics — используется для различения уникальных
                      пользователей
                    </td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-stone-800">
                      _ga_*
                    </td>
                    <td className="px-4 py-3">Аналитический</td>
                    <td className="px-4 py-3">24 месяца</td>
                    <td className="px-4 py-3">
                      Google Analytics 4 — используется для сохранения и
                      подсчёта просмотров страниц
                    </td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-stone-800">
                      _gid
                    </td>
                    <td className="px-4 py-3">Аналитический</td>
                    <td className="px-4 py-3">24 часа</td>
                    <td className="px-4 py-3">
                      Google Analytics — используется для различения
                      пользователей
                    </td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-stone-800">
                      NID
                    </td>
                    <td className="px-4 py-3">Функциональный</td>
                    <td className="px-4 py-3">6 месяцев</td>
                    <td className="px-4 py-3">
                      Google Maps — сохраняет пользовательские настройки и
                      информацию при просмотре страниц с картами Google
                    </td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-stone-800">
                      CONSENT
                    </td>
                    <td className="px-4 py-3">Функциональный</td>
                    <td className="px-4 py-3">24 месяца</td>
                    <td className="px-4 py-3">
                      Google — сохраняет статус согласия пользователя для
                      сервисов Google на текущем домене
                    </td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-stone-800">
                      lang
                    </td>
                    <td className="px-4 py-3">Функциональный</td>
                    <td className="px-4 py-3">Сеанс</td>
                    <td className="px-4 py-3">
                      Сохраняет предпочитаемый язык пользователя на Сайте
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Managing cookies */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              5. Управление файлами cookie
            </h2>
            <p>
              Вы можете в любой момент изменить или отозвать своё согласие на
              использование файлов cookie на нашем Сайте. Большинство
              веб-браузеров позволяют контролировать файлы cookie через настройки
              браузера. Ниже приведены ссылки на инструкции для наиболее
              распространённых браузеров:
            </p>
            <ul className="mt-4 space-y-2 pl-1">
              {[
                {
                  name: "Google Chrome",
                  url: "https://support.google.com/chrome/answer/95647",
                },
                {
                  name: "Mozilla Firefox",
                  url: "https://support.mozilla.org/ru/kb/uluchshennaya-zashita-ot-otslezhivaniya-v-firefox",
                },
                {
                  name: "Apple Safari",
                  url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac",
                },
                {
                  name: "Microsoft Edge",
                  url: "https://support.microsoft.com/ru-ru/microsoft-edge/удаление-файлов-cookie-в-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                },
              ].map((browser) => (
                <li key={browser.name} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                  <a
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-800 underline underline-offset-2 hover:text-stone-950 transition-colors"
                  >
                    {browser.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Обращаем ваше внимание, что отключение или удаление файлов cookie
              может повлиять на функциональность Сайта. Некоторые функции и
              разделы Сайта могут стать недоступными или работать некорректно.
            </p>
            <p className="mt-3">
              Для удаления файлов cookie, которые уже были сохранены на вашем
              устройстве, обратитесь к разделу справки вашего браузера. Также вы
              можете настроить браузер таким образом, чтобы он блокировал
              определённые или все файлы cookie в будущем.
            </p>
          </section>

          {/* 6. Third-party cookies */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              6. Сторонние файлы cookie
            </h2>
            <p>
              На нашем Сайте используются сервисы третьих сторон, которые могут
              устанавливать собственные файлы cookie на вашем устройстве. Мы не
              контролируем использование этих файлов cookie и рекомендуем вам
              ознакомиться с политиками конфиденциальности соответствующих
              сервисов:
            </p>
            <ul className="mt-4 space-y-4">
              <li>
                <strong className="text-stone-800 block mb-1">
                  Google Analytics
                </strong>
                <p>
                  Мы используем Google Analytics для анализа использования
                  нашего Сайта. Google Analytics генерирует статистические и
                  иные сведения о посещении сайта с помощью файлов cookie.
                  Собранная информация используется для формирования отчётов о
                  работе Сайта. Политика конфиденциальности Google доступна по
                  адресу:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-800 underline underline-offset-2 hover:text-stone-950 transition-colors break-all"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </p>
              </li>
              <li>
                <strong className="text-stone-800 block mb-1">
                  Google Maps
                </strong>
                <p>
                  Мы используем встроенные карты Google Maps для отображения
                  расположения нашей клиники. При загрузке карты Google может
                  устанавливать файлы cookie на вашем устройстве. Подробнее о
                  том, как Google обрабатывает данные:{" "}
                  <a
                    href="https://policies.google.com/technologies/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-800 underline underline-offset-2 hover:text-stone-950 transition-colors break-all"
                  >
                    policies.google.com/technologies/cookies
                  </a>
                  .
                </p>
              </li>
            </ul>
          </section>

          {/* 7. Cookie consent */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              7. Согласие на использование файлов cookie
            </h2>
            <p>
              При первом посещении нашего Сайта вам предоставляется возможность
              принять или отклонить использование необязательных файлов cookie
              (аналитических и функциональных) посредством баннера cookie.
            </p>
            <p className="mt-3">
              Строго необходимые файлы cookie устанавливаются автоматически, так
              как они необходимы для обеспечения работы Сайта, и не требуют
              вашего отдельного согласия в соответствии с положениями Регламента
              (ЕС) 2016/679 (Общий регламент по защите данных, GDPR) и
              Директивы 2002/58/EC (Директива о конфиденциальности и
              электронных коммуникациях).
            </p>
            <p className="mt-3">
              Вы можете в любой момент изменить свои предпочтения относительно
              файлов cookie, удалив их через настройки вашего браузера (см.
              раздел 5 настоящей Политики).
            </p>
          </section>

          {/* 8. Legal basis */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              8. Правовые основания
            </h2>
            <p>
              Обработка данных с помощью строго необходимых файлов cookie
              осуществляется на основании нашего законного интереса в обеспечении
              надлежащего функционирования Сайта (ст. 6(1)(f) GDPR).
            </p>
            <p className="mt-3">
              Обработка данных с помощью аналитических и функциональных файлов
              cookie осуществляется на основании вашего согласия (ст. 6(1)(a)
              GDPR), которое вы предоставляете через баннер cookie при первом
              посещении Сайта.
            </p>
          </section>

          {/* 9. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              9. Контактная информация
            </h2>
            <p>
              Если у вас возникли вопросы относительно использования файлов
              cookie на нашем Сайте, вы можете связаться с нами:
            </p>
            <div className="mt-4 p-5 rounded-2xl border border-stone-200/60 bg-white/30 space-y-2.5 text-sm">
              <p>
                <strong className="text-stone-800">Компания:</strong> CANINUS
                HAMBAKLIINIK OÜ
              </p>
              <p>
                <strong className="text-stone-800">Рег. номер:</strong>{" "}
                14044544
              </p>
              <p>
                <strong className="text-stone-800">Адрес:</strong> Tatari 6,
                Tallinn, Эстония
              </p>
              <p>
                <strong className="text-stone-800">Электронная почта:</strong>{" "}
                <a
                  href="mailto:caninushambakliinik@gmail.com"
                  className="text-stone-800 underline underline-offset-2 hover:text-stone-950 transition-colors"
                >
                  caninushambakliinik@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-stone-800">Телефон:</strong>{" "}
                <a
                  href="tel:+37256155030"
                  className="text-stone-800 underline underline-offset-2 hover:text-stone-950 transition-colors"
                >
                  +372 56 155 030
                </a>
              </p>
            </div>
          </section>

          {/* 10. Updates */}
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">
              10. Изменения настоящей Политики
            </h2>
            <p>
              Мы оставляем за собой право периодически обновлять настоящую
              Политику использования файлов cookie для отражения изменений в
              используемых нами файлах cookie, а также по иным операционным,
              юридическим или нормативным причинам.
            </p>
            <p className="mt-3">
              Рекомендуем периодически просматривать эту страницу для получения
              актуальной информации об использовании файлов cookie. Дата
              последнего обновления указана в начале данного документа.
            </p>
            <p className="mt-3">
              В случае существенных изменений мы уведомим вас путём размещения
              соответствующего уведомления на Сайте или иным надлежащим
              способом.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-stone-200/40 text-[10px] text-stone-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            &copy; 2026 CANINUS HAMBAKLIINIK OÜ · Рег. номер: 14044544 ·
            Tatari 6, Tallinn, Эстония
          </p>
          <div className="flex space-x-6">
            <a
              href="/privacy-policy"
              className="hover:text-stone-900 transition-colors"
            >
              Политика Конфиденциальности
            </a>
            <a
              href="/terms-of-service"
              className="hover:text-stone-900 transition-colors"
            >
              Условия обслуживания
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
