const ThankYou = () => (
  <div className="text-center space-y-5 py-6 px-4">
    <h3 className="font-heading text-2xl font-semibold text-foreground">Спасибо, заявка принята</h3>
    <p className="text-muted-foreground font-body leading-relaxed max-w-md mx-auto">
      Я свяжусь с вами, чтобы предложить ближайшее время занятия. Если Telegram у вас не открывается, можно сразу перейти в Max.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href="https://t.me/yogavdnh"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition hover:opacity-90"
      >
        Войти в Telegram-канал
      </a>
      <a
        href="https://max.ru/join/-5rZSTR_Yu0HQJAsQgOwVJAo-hZlt1rS7_Fu8UsOmnc"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium transition hover:bg-secondary"
      >
        Открыть Max
      </a>
    </div>
    <p className="text-sm text-muted-foreground">
      Там удобно посмотреть расписание, задать вопрос и быстро договориться по времени.
    </p>
  </div>
);

export default ThankYou;
