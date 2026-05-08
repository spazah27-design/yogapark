import { useState } from "react";
import ParkLeadForm from "@/components/ParkLeadForm";
import ThankYou from "@/components/ThankYou";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import trainerImg from "@/assets/trainer.jpeg";
import parkHero from "@/assets/park-hero.jpg";
import parkMat from "@/assets/park-mat.jpg";

const PRICES = {
  trial: "1 500 ₽",
  pack: "5 000 ₽",
  individual: "2 700 ₽",
};

const trackYM = (goal: string) => {
  if (typeof window !== "undefined" && (window as any).ym) {
    (window as any).ym((window as any).YM_ID, "reachGoal", goal);
  }
};

const SectionTitle = ({ children, eyebrow }: { children: React.ReactNode; eyebrow?: string }) => (
  <div className="mb-10 md:mb-12">
    {eyebrow && (
      <div className="text-sm font-medium tracking-wide uppercase text-primary mb-3">{eyebrow}</div>
    )}
    <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight max-w-2xl">
      {children}
    </h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>{children}</div>
);

const Index = () => {
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  const parks = [
    { name: "ВДНХ / Останкино", desc: "Удобно для севера и северо-востока Москвы. Много открытого пространства и зелени." },
    { name: "Парк Горького / Музеон", desc: "Центральная локация для утренних и вечерних занятий." },
    { name: "Сокольники", desc: "Хороший вариант для спокойной практики и небольших групп." },
    { name: "Измайловский парк", desc: "Больше воздуха, пространства и меньше ощущения городского шума." },
    { name: "Центр Москвы / район Зарядья", desc: "Возможен по договорённости и с учётом правил площадки. Для маленького формата без оборудования и громкой музыки." },
    { name: "Другой парк", desc: "Если у вас есть удобный парк рядом с домом или работой, оставьте заявку — обсудим логистику." },
  ];

  const audience = [
    { title: "Много сидите и устаёте от экрана", text: "Когда тело к вечеру сжимается, а движения в жизни стало мало." },
    { title: "Не хочется идти в большую студию", text: "Если комфортнее начать в маленьком формате и без студийного шума." },
    { title: "Нужен свежий воздух и живой ритм", text: "Практика на улице помогает выйти из закрытого пространства и переключиться." },
    { title: "Хотите начать без эзотерики", text: "Без гуру-образа, сложных слов и обещаний чудес. Просто понятная работа с телом." },
  ];

  const steps = [
    { n: "01", title: "Вы выбираете парк", text: "Отмечаете удобную локацию или пишете свой вариант." },
    { n: "02", title: "Оставляете номер", text: "Я связываюсь с вами и уточняю формат: мини-группа или индивидуально." },
    { n: "03", title: "Согласуем окно по погоде", text: "На свежем воздухе важны погода, место встречи и спокойная площадка." },
    { n: "04", title: "Приходите с ковриком", text: "Занятие проходит без лишней теории, громкой музыки и эзотерики." },
  ];

  const formats = [
    { title: "Мини-группа 2–4 человека", text: "Для тех, кому нужна регулярность и небольшая группа без потока.", price: `от ${PRICES.trial}` },
    { title: "Индивидуально в парке", text: "Один на один, если нужно подобрать время, темп и парк под себя.", price: PRICES.individual },
    { title: "Для пары / друзей", text: "Можно собрать свой маленький формат и согласовать парк.", price: "по договорённости" },
  ];

  const faq = [
    { q: "Подойдёт ли мне, если я никогда не занимался?", a: "Да. Формат подходит новичкам. Не нужна идеальная гибкость или спортивная форма." },
    { q: "Что брать с собой?", a: "Удобную одежду, коврик, воду и слой одежды по погоде." },
    { q: "Что если пойдёт дождь?", a: "Переносим занятие или заранее обсуждаем другой вариант. Я не провожу практику в условиях, где некомфортно или небезопасно." },
    { q: "Можно ли заниматься в моём парке?", a: "Да, можно предложить свой парк. Я посмотрю логистику и скажу, удобно ли провести занятие там." },
    { q: "Сколько человек в группе?", a: "Обычно 2–4 человека. Это маленький формат, где проще держать внимание к каждому." },
    { q: "Можно ли индивидуально?", a: `Да. Индивидуальное занятие в парке стоит ${PRICES.individual}.` },
    { q: "Где будет расписание?", a: "После заявки я пришлю приглашение в закрытый Telegram-канал с расписанием, наборами и короткими видео о формате." },
  ];

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <StickyMobileCTA />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(var(--background) / 0.85), hsl(var(--background) / 0.95)), url(${parkHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="container max-w-6xl py-14 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Йога на свежем воздухе в Москве
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                Йога в парке<br className="hidden md:block" /> в Москве
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Мини-группа или индивидуальное занятие на свежем воздухе. Выберите удобный парк, оставьте номер, и я предложу ближайшее окно по погоде и расписанию.
              </p>
              <p className="text-base text-muted-foreground max-w-xl">
                Спокойная, интенсивная практика без эзотерики. Для новичков и тех, кто устал от сидячей работы, зажатого тела и отсутствия регулярного движения. Мини-группа от {PRICES.trial}, индивидуально — {PRICES.individual}.
              </p>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-8" id="hero-form">
              <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-sm p-5 md:p-6 shadow-sm">
                {heroSubmitted ? (
                  <ThankYou />
                ) : (
                  <>
                    <h2 className="font-heading text-xl md:text-2xl font-semibold mb-1">Выбрать парк и оставить номер</h2>
                    <p className="text-sm text-muted-foreground mb-5">
                      После заявки открою доступ в закрытый канал с расписанием.
                    </p>
                    <ParkLeadForm
                      buttonText="Оставить номер"
                      onSuccess={() => setHeroSubmitted(true)}
                      formId="hero-form-fields"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container max-w-6xl">
          <SectionTitle eyebrow="Как это работает">
            Четыре простых шага до первого занятия
          </SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <Card key={s.n} className="space-y-3">
                <div className="text-sm font-medium text-primary">{s.n}</div>
                <h3 className="font-heading text-xl font-semibold">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parks */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <SectionTitle eyebrow="Локации">Выберите удобный парк</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parks.map((p) => (
              <Card key={p.name} className="space-y-2">
                <h3 className="font-heading text-lg font-semibold">{p.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <a href="#hero-form" className="inline-flex items-center text-primary font-medium hover:underline">
              Не нашли свой парк? Напишите свой вариант →
            </a>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container max-w-6xl">
          <SectionTitle eyebrow="Кому подойдёт">Если узнали себя — это ваш формат</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            {audience.map((a) => (
              <Card key={a.title} className="space-y-2">
                <h3 className="font-heading text-lg font-semibold">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <SectionTitle eyebrow="Форматы">Выберите формат под себя</SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            {formats.map((f) => (
              <Card key={f.title} className="space-y-3 flex flex-col">
                <h3 className="font-heading text-xl font-semibold">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.text}</p>
                <div className="text-foreground font-medium pt-2 border-t border-border">{f.price}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How practice goes */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle eyebrow="Практика">Как проходит занятие</SectionTitle>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "встреча в понятной точке парка",
                "короткая настройка внимания",
                "суставная разминка",
                "основная статическая и статодинамическая практика",
                "спокойное завершение",
                "без громкой музыки, реквизита и показухи",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground mt-6 leading-relaxed">
              Практика интенсивная, но спокойная. Не нужно быть гибким, спортивным или подготовленным. Важно прийти, разложить коврик и начать двигаться регулярно.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border">
            <img src={parkMat} alt="Коврик для йоги в парке" loading="lazy" width={1280} height={896} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Trainer */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-border max-w-sm">
              <img src={trainerImg} alt="Тренер по йоге Спартак" loading="lazy" className="w-full h-auto object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <SectionTitle eyebrow="Кто ведёт">Спартак</SectionTitle>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="rounded-lg bg-secondary/60 px-4 py-3">10+ лет личной практики</li>
              <li className="rounded-lg bg-secondary/60 px-4 py-3">Около 5 лет преподавания</li>
              <li className="rounded-lg bg-secondary/60 px-4 py-3">Путь через личный опыт, а не через образ гуру</li>
              <li className="rounded-lg bg-secondary/60 px-4 py-3">Регулярность, уважение к телу, понятная структура</li>
            </ul>
            <p className="text-foreground leading-relaxed max-w-xl">
              Я не обещаю чудес и не играю в духовного наставника. Я веду практику так, чтобы человек постепенно возвращал контакт с телом, силу, собранность и привычку заниматься регулярно.
            </p>
            <blockquote className="border-l-2 border-primary pl-5 py-1 text-foreground italic font-heading text-lg max-w-xl">
              «Мне важно не впечатлить человека, а помочь ему втянуться в практику и почувствовать, что тело снова можно собрать.»
            </blockquote>
          </div>
        </div>
      </section>

      {/* Weather & organization */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container max-w-4xl">
          <SectionTitle eyebrow="Честно">Погода и организация</SectionTitle>
          <ul className="space-y-3 text-muted-foreground mb-6">
            {[
              "если идёт сильный дождь, занятие переносим или обсуждаем другой формат",
              "место встречи уточняется заранее",
              "нужен свой коврик",
              "группа маленькая, без громкой музыки и оборудования",
              "конкретная площадка выбирается с учётом правил парка и ситуации на месте",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="text-foreground leading-relaxed">
            Занятия на свежем воздухе требуют гибкости: погода, правила площадки и спокойное место важнее красивого обещания. Поэтому после заявки я уточняю детали и предлагаю реальное ближайшее окно.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <SectionTitle eyebrow="Цены">Понятные цены, без скрытых пакетов</SectionTitle>
          <div className="rounded-2xl border border-border bg-card divide-y divide-border">
            {[
              { name: "Мини-группа / пробное занятие", price: PRICES.trial },
              { name: "Абонемент 4 занятия", price: PRICES.pack },
              { name: "Индивидуальное занятие в парке", price: PRICES.individual },
              { name: "Свой маленький формат (пара / друзья)", price: "по договорённости" },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5">
                <span className="text-foreground">{row.name}</span>
                <span className="font-heading text-lg font-semibold whitespace-nowrap">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container max-w-3xl">
          <SectionTitle eyebrow="FAQ">Частые вопросы</SectionTitle>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section id="final-cta" className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-10">
            <div className="text-sm font-medium tracking-wide uppercase text-primary mb-3">Заявка</div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-tight mb-3">
              Выберите парк, и я предложу ближайшее окно
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Оставьте номер. Я свяжусь с вами, уточню удобный парк, формат занятия и погодные условия.
            </p>
            {ctaSubmitted ? (
              <ThankYou />
            ) : (
              <ParkLeadForm
                buttonText="Получить вариант по расписанию"
                onSuccess={() => setCtaSubmitted(true)}
                formId="cta-form-fields"
              />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-10">
        <div className="container max-w-6xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-heading text-lg font-semibold text-foreground mb-2">Спартак</div>
              <p className="text-muted-foreground">Йога в парках Москвы. Мини-группы и индивидуальные занятия.</p>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <a
                href="tel:+79969971527"
                onClick={() => trackYM("click_phone")}
                className="block hover:text-foreground transition"
              >
                +7 996 997-15-27
              </a>
              <a href="mailto:almaznayaspina@gmail.com" className="block hover:text-foreground transition">
                almaznayaspina@gmail.com
              </a>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <a
                href="https://t.me/yogavdnh"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackYM("click_telegram")}
                className="block hover:text-foreground transition"
              >
                Telegram-канал
              </a>
              <a
                href="https://max.ru/join/-5rZSTR_Yu0HQJAsQgOwVJAo-hZlt1rS7_Fu8UsOmnc"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackYM("click_max")}
                className="block hover:text-foreground transition"
              >
                Max
              </a>
              <a href="/privacy" className="block hover:text-foreground transition">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;