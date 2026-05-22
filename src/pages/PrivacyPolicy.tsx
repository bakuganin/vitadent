import React from "react";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div
      className="min-h-screen text-[#212121] selection:bg-slate-800 selection:text-[#EAEFF5] overflow-x-hidden font-sans relative antialiased"
      style={{
        background: `
          radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 55%),
          radial-gradient(circle at 90% 10%, rgba(242, 247, 251, 1) 0%, rgba(242, 247, 251, 0) 50%),
          radial-gradient(circle at 50% 100%, rgba(235, 241, 248, 1) 0%, rgba(235, 241, 248, 0) 60%),
          #C2D3E3
        `,
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Back Navigation */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          На главную
        </a>

        {/* Page Title */}
        <header className="mb-16">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8DA2B3] font-bold block mb-4 select-none">
            Юридическая информация
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-stone-900 tracking-tight leading-[0.95]">
            Политика{" "}
            <span className="font-semibold">Конфиденциальности</span>
          </h1>
          <p className="mt-6 text-sm text-stone-500 leading-relaxed">
            Дата вступления в силу: 22 мая 2026 г. · Последнее обновление: 22 мая 2026 г.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-14">
          {/* 1. Контролёр данных */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              1. Контролёр персональных данных
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Контролёром ваших персональных данных является:
              </p>
              <div className="bg-white/50 border border-stone-200/60 rounded-2xl p-6 space-y-1.5 text-sm">
                <p className="font-semibold text-stone-900">CANINUS HAMBAKLIINIK OÜ</p>
                <p>Регистрационный номер: 14044544</p>
                <p>Адрес: Tatari 6, Таллинн, Эстония</p>
                <p>
                  Электронная почта:{" "}
                  <a href="mailto:caninushambakliinik@gmail.com" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
                    caninushambakliinik@gmail.com
                  </a>
                </p>
                <p>
                  Телефон:{" "}
                  <a href="tel:+37256155030" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
                    +372 56 155 030
                  </a>
                </p>
              </div>
              <p>
                Мы обрабатываем ваши персональные данные в соответствии с Общим регламентом по защите данных
                (Регламент (ЕС) 2016/679, далее — GDPR), Законом Эстонской Республики о защите персональных данных
                (<em>Isikuandmete kaitse seadus</em>) и иным применимым законодательством Европейского Союза и
                Эстонской Республики.
              </p>
            </div>
          </section>

          {/* 2. Какие данные мы собираем */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              2. Какие персональные данные мы собираем
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                В процессе использования нашего веб-сайта и обращения в клинику мы можем собирать и обрабатывать
                следующие категории персональных данных:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">2.1. Данные, предоставляемые вами добровольно</h3>
                  <ul className="list-disc list-outside ml-5 space-y-1 text-stone-600">
                    <li>Имя и фамилия</li>
                    <li>Номер телефона</li>
                    <li>Адрес электронной почты</li>
                    <li>Содержание вашего сообщения или описание стоматологической проблемы, указанное в форме записи на приём</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">2.2. Данные, собираемые автоматически</h3>
                  <ul className="list-disc list-outside ml-5 space-y-1 text-stone-600">
                    <li>IP-адрес и приблизительное местоположение</li>
                    <li>Тип и версия браузера, операционная система</li>
                    <li>Страницы, которые вы посещаете, время и продолжительность визита</li>
                    <li>Источник перехода (реферер)</li>
                    <li>Данные файлов cookie и аналогичных технологий отслеживания (см. раздел 7)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Цели обработки и правовые основания */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              3. Цели обработки и правовые основания
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Мы обрабатываем ваши персональные данные исключительно на законных основаниях, предусмотренных
                статьёй 6 GDPR:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-300">
                      <th className="text-left py-3 pr-4 font-semibold text-stone-900">Цель обработки</th>
                      <th className="text-left py-3 font-semibold text-stone-900">Правовое основание</th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-600">
                    <tr className="border-b border-stone-200/60">
                      <td className="py-3 pr-4">Обработка заявок на запись через форму на сайте</td>
                      <td className="py-3">Выполнение договорных обязательств и преддоговорных мер (ст. 6(1)(b) GDPR)</td>
                    </tr>
                    <tr className="border-b border-stone-200/60">
                      <td className="py-3 pr-4">Связь с вами по телефону или электронной почте для подтверждения записи</td>
                      <td className="py-3">Выполнение договорных обязательств (ст. 6(1)(b) GDPR)</td>
                    </tr>
                    <tr className="border-b border-stone-200/60">
                      <td className="py-3 pr-4">Улучшение работы веб-сайта и анализ посещаемости</td>
                      <td className="py-3">Законный интерес (ст. 6(1)(f) GDPR)</td>
                    </tr>
                    <tr className="border-b border-stone-200/60">
                      <td className="py-3 pr-4">Отправка маркетинговых сообщений и информации об акциях</td>
                      <td className="py-3">Ваше явное согласие (ст. 6(1)(a) GDPR)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Выполнение юридических обязательств (бухгалтерский учёт, налоговая отчётность)</td>
                      <td className="py-3">Юридическая обязанность (ст. 6(1)(c) GDPR)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. Ваши права */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              4. Ваши права в отношении персональных данных
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                В соответствии с GDPR вы имеете следующие права в отношении ваших персональных данных:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-stone-800">Право на доступ</strong> (ст. 15 GDPR) — вы вправе получить подтверждение
                    того, обрабатываются ли ваши данные, и запросить копию обрабатываемых данных.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-stone-800">Право на исправление</strong> (ст. 16 GDPR) — вы вправе потребовать
                    исправления неточных или дополнения неполных персональных данных.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-stone-800">Право на удаление</strong> (ст. 17 GDPR) — вы вправе потребовать
                    удаления ваших персональных данных при наличии оснований, предусмотренных GDPR.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-stone-800">Право на ограничение обработки</strong> (ст. 18 GDPR) — вы вправе
                    потребовать ограничения обработки ваших данных в определённых случаях.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-stone-800">Право на переносимость данных</strong> (ст. 20 GDPR) — вы вправе получить
                    свои данные в структурированном, машиночитаемом формате и передать их другому контролёру.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-stone-800">Право на возражение</strong> (ст. 21 GDPR) — вы вправе возразить против
                    обработки данных, основанной на законном интересе, включая профилирование.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-stone-800">Право на отзыв согласия</strong> (ст. 7(3) GDPR) — если обработка
                    основана на вашем согласии, вы вправе отозвать его в любое время, что не влияет на законность
                    обработки до момента отзыва.
                  </div>
                </li>
              </ul>
              <p>
                Для реализации любого из вышеуказанных прав свяжитесь с нами по электронной почте:{" "}
                <a href="mailto:caninushambakliinik@gmail.com" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
                  caninushambakliinik@gmail.com
                </a>
                . Мы ответим на ваш запрос в течение 30 (тридцати) календарных дней.
              </p>
            </div>
          </section>

          {/* 5. Сроки хранения */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              5. Сроки хранения персональных данных
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Мы храним ваши персональные данные только в течение периода, необходимого для достижения целей,
                для которых они были собраны, или в течение срока, установленного законодательством:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-stone-800">Данные формы записи</strong> — в течение 3 (трёх) лет с момента последнего обращения
                    или до отзыва вашего согласия.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-stone-800">Бухгалтерские и налоговые документы</strong> — в течение 7 (семи) лет в соответствии
                    с требованиями законодательства Эстонской Республики.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-stone-800">Данные аналитики и cookies</strong> — не более 26 месяцев с момента сбора.
                  </span>
                </li>
              </ul>
              <p>
                По истечении указанных сроков персональные данные удаляются или обезличиваются безвозвратно.
              </p>
            </div>
          </section>

          {/* 6. Передача данных третьим лицам */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              6. Передача данных третьим лицам
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Мы не продаём и не передаём ваши персональные данные третьим лицам в маркетинговых целях. Однако мы
                можем передавать данные следующим категориям получателей:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-stone-800">Хостинг-провайдеры и IT-поставщики</strong> — для обеспечения
                    работоспособности веб-сайта и хранения данных на защищённых серверах в пределах ЕС/ЕЭЗ.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-stone-800">Сервисы аналитики</strong> (например, Google Analytics) — для анализа
                    посещаемости сайта в обезличенной и агрегированной форме.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-stone-800">Государственные органы</strong> — в случаях, когда это предусмотрено
                    законодательством Эстонской Республики или Европейского Союза.
                  </span>
                </li>
              </ul>
              <p>
                Все третьи лица, получающие доступ к вашим данным, обязаны обеспечивать их защиту в соответствии
                с GDPR. При передаче данных за пределы ЕС/ЕЭЗ мы применяем надлежащие механизмы защиты
                (стандартные договорные условия Европейской комиссии).
              </p>
            </div>
          </section>

          {/* 7. Файлы cookie */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              7. Файлы cookie и аналогичные технологии
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Наш веб-сайт использует файлы cookie — небольшие текстовые файлы, сохраняемые на вашем устройстве.
                Мы используем следующие типы cookie:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Строго необходимые cookie</h3>
                  <p>
                    Обеспечивают базовую функциональность веб-сайта (навигация, безопасность). Не требуют вашего
                    согласия и не могут быть отключены.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Аналитические cookie</h3>
                  <p>
                    Позволяют нам анализировать использование веб-сайта, определять наиболее популярные страницы и
                    улучшать пользовательский опыт. Устанавливаются только с вашего согласия.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Маркетинговые cookie</h3>
                  <p>
                    Используются для отслеживания посетителей на веб-сайтах с целью отображения релевантной
                    рекламы. Устанавливаются только с вашего явного согласия.
                  </p>
                </div>
              </div>
              <p>
                Вы можете управлять настройками cookie через баннер согласия при первом посещении сайта, а также
                через настройки вашего браузера. Отключение cookie может повлиять на функциональность сайта.
              </p>
            </div>
          </section>

          {/* 8. Безопасность данных */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              8. Безопасность данных
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Мы применяем надлежащие технические и организационные меры для защиты ваших персональных данных
                от несанкционированного доступа, утраты, изменения или уничтожения. К таким мерам относятся:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>Шифрование передаваемых данных по протоколу SSL/TLS</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>Ограничение доступа к персональным данным на основе принципа минимальной необходимости</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA2B3]/60 shrink-0 mt-1.5" />
                  <span>Регулярное обновление программного обеспечения и систем безопасности</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 9. Контакт по вопросам защиты данных */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              9. Контакт по вопросам защиты данных
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                По всем вопросам, связанным с обработкой и защитой ваших персональных данных, вы можете
                связаться с нами:
              </p>
              <div className="bg-white/50 border border-stone-200/60 rounded-2xl p-6 space-y-1.5 text-sm">
                <p className="font-semibold text-stone-900">CANINUS HAMBAKLIINIK OÜ</p>
                <p>Tatari 6, Таллинн, Эстония</p>
                <p>
                  Электронная почта:{" "}
                  <a href="mailto:caninushambakliinik@gmail.com" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
                    caninushambakliinik@gmail.com
                  </a>
                </p>
                <p>
                  Телефон:{" "}
                  <a href="tel:+37256155030" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
                    +372 56 155 030
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* 10. Право на подачу жалобы */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              10. Право на подачу жалобы в надзорный орган
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Если вы считаете, что обработка ваших персональных данных нарушает требования GDPR или
                законодательства Эстонской Республики, вы имеете право подать жалобу в надзорный орган по
                защите данных:
              </p>
              <div className="bg-white/50 border border-stone-200/60 rounded-2xl p-6 space-y-1.5 text-sm">
                <p className="font-semibold text-stone-900">Andmekaitse Inspektsioon</p>
                <p>(Инспекция по защите данных Эстонии)</p>
                <p>Адрес: Tatari 39, 10134 Tallinn, Эстония</p>
                <p>
                  Электронная почта:{" "}
                  <a href="mailto:info@aki.ee" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
                    info@aki.ee
                  </a>
                </p>
                <p>
                  Веб-сайт:{" "}
                  <a href="https://www.aki.ee" target="_blank" rel="noopener noreferrer" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
                    www.aki.ee
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* 11. Изменения */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
              11. Изменения настоящей Политики
            </h2>
            <div className="text-sm text-stone-600 leading-relaxed space-y-3">
              <p>
                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности в любое
                время. Обновлённая версия публикуется на данной странице с указанием даты последнего обновления.
                При существенных изменениях мы предпримем разумные меры для уведомления вас, в том числе путём
                размещения заметного уведомления на веб-сайте.
              </p>
              <p>
                Продолжая использовать наш веб-сайт после публикации изменений, вы подтверждаете своё согласие с
                обновлённой Политикой конфиденциальности.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Separator */}
        <div className="mt-20 pt-10 border-t border-stone-200/50">
          <p className="text-[11px] text-stone-400 leading-relaxed">
            © 2026 CANINUS HAMBAKLIINIK OÜ · Рег. номер: 14044544 · Tatari 6, Tallinn, Эстония
          </p>
        </div>
      </div>
    </div>
  );
}
