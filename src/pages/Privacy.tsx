import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="min-h-screen bg-background font-body">
    <div className="container max-w-3xl py-12 md:py-20 space-y-8">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition">
        ← На главную
      </Link>

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
        Политика конфиденциальности
      </h1>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.</p>
          <p>Оставляя свои данные на сайте, вы соглашаетесь с условиями данной Политики.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">2. Какие данные мы собираем</h2>
          <p>Мы собираем только номер телефона, который вы добровольно указываете в форме заявки на сайте.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">3. Цели обработки данных</h2>
          <p>Ваш номер телефона используется исключительно для:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Связи с вами по вопросу записи на занятие</li>
            <li>Отправки информации о расписании и ближайших наборах</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">4. Защита данных</h2>
          <p>Мы не передаём ваши данные третьим лицам. Данные хранятся на защищённых серверах и используются только в указанных целях.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">5. Удаление данных</h2>
          <p>Вы можете запросить удаление своих данных, написав на <a href="mailto:almaznayaspina@gmail.com" className="text-foreground underline hover:no-underline">almaznayaspina@gmail.com</a>.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">6. Контакты</h2>
          <p>По вопросам обработки данных: <a href="mailto:almaznayaspina@gmail.com" className="text-foreground underline hover:no-underline">almaznayaspina@gmail.com</a></p>
        </section>
      </div>
    </div>
  </div>
);

export default Privacy;
