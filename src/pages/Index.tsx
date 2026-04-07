import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import ThankYou from "@/components/ThankYou";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import trainerImg from "@/assets/trainer.jpeg";
import spaceImg from "@/assets/space.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8 md:mb-10">
    {children}
  </h2>
);

const Index = () => {
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body">
      <StickyMobileCTA />

      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="container max-w-3xl text-center space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-foreground leading-tight">
            Йога рядом с&nbsp;метро ВДНХ для&nbsp;тех, кто&nbsp;устал жить в&nbsp;зажатом теле
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Мини-группа до 4 человек. Спокойная, интенсивная практика без эзотерики для тех, кто много сидит, устаёт и хочет снова чувствовать тело.
          </p>
          <p className="text-base text-muted-foreground">
            Небольшой зал в 7–8 минутах от метро ВДНХ. Подходит новичкам и тем, кто давно откладывал.
          </p>

          <div className="flex justify-center pt-4">
            {heroSubmitted ? (
              <ThankYou />
            ) : (
              <div className="w-full max-w-md space-y-3">
                <LeadForm buttonText="Оставить номер и записаться на пробное" onSuccess={() => setHeroSubmitted(true)} />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  После заявки я свяжусь с вами, пришлю расписание ближайшего набора и ссылки на Telegram/Max.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Для кого */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container">
          <SectionTitle>Для кого эта практика</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Сидячая работа и зажатая спина", text: "Если к вечеру тело как будто сжалось, а шея и спина постоянно забирают внимание." },
              { title: "Постоянная усталость и мало движения", text: "Если день проходит в кресле, а сил на тело и себя уже не остаётся." },
              { title: "Хочется вернуть осанку и собранность", text: "Если хочется двигаться увереннее, держать корпус ровнее и снова чувствовать внутренний стержень." },
              { title: "Нужна практика без эзотерики и лишней болтовни", text: "Если вам нужен не образ гуру, а понятная работа с телом в маленькой группе." },
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-lg bg-background border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что даёт */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionTitle>Что даёт регулярная практика</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              "Больше подвижности и ощущения тела",
              "Меньше зажатости после рабочего дня",
              "Ровнее осанка и лучше контроль тела",
              "Регулярность и ощущение внутренней собранности",
            ].map((text, i) => (
              <div key={i} className="p-6 rounded-lg bg-card border border-border text-center">
                <p className="text-foreground font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как проходят */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container max-w-3xl">
          <SectionTitle>Как проходят занятия</SectionTitle>
          <div className="space-y-4 mb-8">
            {[
              "1 час",
              "Мини-группа до 4 человек",
              "Настройка и включение внимания",
              "Разогрев",
              "Основная статическая и статодинамическая практика",
              "Завершение и выдох",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed border-l-2 border-primary pl-4">
            Формат интенсивный, но без показухи. Не нужно быть гибким, идеальным или подготовленным. Важно только прийти и начать заниматься регулярно.
          </p>
        </div>
      </section>

      {/* Кто ведёт */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionTitle>Кто ведёт</SectionTitle>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shrink-0 mx-auto md:mx-0">
              <img src={trainerImg} alt="Спартак — тренер по йоге рядом с метро ВДНХ" className="w-full h-full object-cover object-top" />
            </div>
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-semibold text-foreground">Спартак</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">10+ лет личной практики</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">~5 лет преподавания</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Я не обещаю чудес. Я веду практику так, чтобы человек постепенно возвращал контакт с телом, силу, собранность и привычку заниматься регулярно.
              </p>
              <blockquote className="border-l-2 border-accent pl-4 text-foreground italic">
                «Мне важно не впечатлить человека, а помочь ему втянуться в практику и почувствовать, что тело снова можно собрать.»
              </blockquote>
              <p className="text-sm text-muted-foreground">
                Путь через личный опыт, а не через образ гуру. Ценности: регулярность, уважение к телу, понятная структура занятий, работа без эзотерики.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Где проходят */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container">
          <SectionTitle>Где проходят занятия</SectionTitle>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={spaceImg} alt="Зал для занятий йогой рядом с метро ВДНХ" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-5 md:w-1/2">
              <p className="text-foreground leading-relaxed">
                Небольшой зал недалеко от метро ВДНХ. Формат до 4 человек позволяет работать внимательнее и без ощущения, что вы потерялись в потоке.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "7–8 минут от метро ВДНХ",
                  "Мини-группа до 4 человек",
                  "Спокойная обстановка",
                  "Не потоковая студия",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-background border border-border">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форматы и цены */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionTitle>Форматы и цены</SectionTitle>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Разовое / пробное", price: "1 500 ₽", note: null },
              { title: "Абонемент 4 занятия", price: "5 000 ₽", note: "1 250 ₽ за занятие" },
              { title: "Абонемент 8 занятий", price: "9 000 ₽", note: "1 125 ₽ за занятие" },
            ].map((plan, i) => (
              <div key={i} className="p-6 rounded-lg bg-card border border-border text-center space-y-2">
                <h3 className="font-heading text-lg font-semibold text-foreground">{plan.title}</h3>
                <p className="text-3xl font-heading font-bold text-foreground">{plan.price}</p>
                {plan.note && <p className="text-xs text-muted-foreground">{plan.note}</p>}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-5 text-center">Индивидуальный формат обсуждается отдельно.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container max-w-3xl">
          <SectionTitle>Частые вопросы</SectionTitle>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: "Подойдёт ли мне, если я никогда не занимался?", a: "Да. Формат рассчитан на людей без подготовки. Вы начнёте с базовых форм, и нагрузка будет адаптирована под ваш уровень." },
              { q: "Это мягкая или интенсивная практика?", a: "Скорее интенсивная, но без надрыва. Нагрузка ощутимая, но безопасная — вы работаете в своём темпе." },
              { q: "Если у меня слабая подготовка?", a: "Это нормально. Маленькая группа позволяет уделять внимание каждому и корректировать нагрузку." },
              { q: "Сколько человек в группе?", a: "Максимум 4 человека. Это принципиальное ограничение формата." },
              { q: "Как записаться на первое занятие?", a: "Оставьте номер телефона в форме на этой странице. Я свяжусь с вами и согласуем удобное время для пробного занятия." },
              { q: "Что будет после заявки?", a: "Я свяжусь с вами лично, пришлю расписание ближайшего набора и ссылки на закрытый канал в Telegram и Max." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-background">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section id="final-cta" className="py-16 md:py-20">
        <div className="container max-w-2xl text-center space-y-6">
          <SectionTitle>Запишитесь на пробное занятие</SectionTitle>
          <p className="text-muted-foreground leading-relaxed">
            Оставьте номер — я свяжусь с вами, расскажу про ближайшие окна в группе и пришлю ссылки на Telegram и Max.
          </p>
          {ctaSubmitted ? (
            <ThankYou />
          ) : (
            <div className="flex justify-center">
              <LeadForm buttonText="Записаться на пробное занятие" onSuccess={() => setCtaSubmitted(true)} />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container text-center space-y-3 text-sm text-muted-foreground">
          <p className="font-heading text-lg font-semibold text-foreground">Спартак</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <a href="tel:+79969971527" className="hover:text-foreground transition">+7 996 997-15-27</a>
            <a href="mailto:almaznayaspina@gmail.com" className="hover:text-foreground transition">almaznayaspina@gmail.com</a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <a href="https://t.me/yogavdnh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">Telegram</a>
            <a href="https://max.ru/join/-5rZSTR_Yu0HQJAsQgOwVJAo-hZlt1rS7_Fu8UsOmnc" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">Max</a>
          </div>
          <a href="/privacy" className="text-xs hover:text-foreground transition">Политика конфиденциальности</a>
        </div>
      </footer>

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default Index;
