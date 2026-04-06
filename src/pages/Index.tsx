import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#hero", label: "Главная" },
    { href: "#services", label: "Услуги" },
    { href: "#portfolio", label: "Портфолио" },
    { href: "#about", label: "О компании" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(14, 12, 9, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201, 168, 76, 0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ border: "1px solid var(--gold)" }}
          >
            <span className="text-xs font-display font-bold" style={{ color: "var(--gold)" }}>БВ</span>
          </div>
          <span className="font-display text-lg" style={{ color: "#e8e0d0", letterSpacing: "0.05em" }}>
            БизнесВверх
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a
            href="#contacts"
            className="px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300"
            style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--dark-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
            }}
          >
            Консультация
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: "var(--gold)" }}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-5"
          style={{ background: "rgba(14, 12, 9, 0.98)", borderBottom: "1px solid rgba(201, 168, 76, 0.12)" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--dark-bg)" }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201, 168, 76, 0.07) 0%, transparent 70%),
          linear-gradient(180deg, transparent 60%, rgba(14, 12, 9, 0.9) 100%)
        `
      }} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-8 w-px h-32 opacity-20" style={{ background: "linear-gradient(180deg, transparent, var(--gold), transparent)" }} />
        <div className="absolute top-1/3 right-8 w-px h-48 opacity-15" style={{ background: "linear-gradient(180deg, transparent, var(--gold), transparent)" }} />
        <div className="absolute bottom-24 left-1/4 h-px w-24 opacity-20" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
        <div className="absolute top-20 right-1/3 h-px w-16 opacity-15" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p
          className="text-xs tracking-widest uppercase mb-8 animate-fade-in"
          style={{ color: "var(--gold)", letterSpacing: "0.25em", animationFillMode: "both" }}
        >
          Digital-агентство
        </p>

        <h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-8 animate-fade-in animate-delay-200"
          style={{ color: "#e8e0d0", letterSpacing: "-0.01em", animationFillMode: "both" }}
        >
          Рост,{" "}
          <em className="italic font-light" style={{ color: "var(--gold)" }}>который</em>
          <br />
          виден в цифрах
        </h1>

        <div
          className="mx-auto mb-10 animate-fade-in animate-delay-400"
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)", animationFillMode: "both" }}
        />

        <p
          className="font-sans text-base md:text-lg font-light max-w-xl mx-auto mb-14 animate-fade-in animate-delay-500"
          style={{ color: "rgba(232, 224, 208, 0.6)", lineHeight: "1.8", animationFillMode: "both" }}
        >
          Создаём сайты, мобильные приложения и digital-инструменты,
          которые привлекают клиентов и автоматизируют ваш бизнес
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-600" style={{ animationFillMode: "both" }}>
          <a
            href="#portfolio"
            className="px-8 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300"
            style={{ background: "var(--gold)", color: "var(--dark-bg)", fontWeight: 500 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-light)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)"; }}
          >
            Смотреть кейсы
          </a>
          <a
            href="#contacts"
            className="px-8 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300"
            style={{ border: "1px solid rgba(201, 168, 76, 0.4)", color: "rgba(232, 224, 208, 0.8)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201, 168, 76, 0.4)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(232, 224, 208, 0.8)";
            }}
          >
            Бесплатная консультация
          </a>
        </div>

        <div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-24 pt-12 animate-fade-in animate-delay-700"
          style={{ borderTop: "1px solid rgba(201, 168, 76, 0.12)", animationFillMode: "both" }}
        >
          {[
            { value: "7+", label: "лет на рынке" },
            { value: "320+", label: "реализованных проектов" },
            { value: "98%", label: "клиентов возвращаются" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-light mb-2" style={{ color: "var(--gold)" }}>
                {s.value}
              </div>
              <div className="font-sans text-xs tracking-wider uppercase" style={{ color: "rgba(232, 224, 208, 0.45)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-sans text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Scroll</span>
        <div className="w-px h-10" style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }} />
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "Globe",
    title: "Создание и продвижение сайтов",
    badge: "Web",
    desc: "Разрабатываем современные сайты и интернет-магазины, продвигаем их в поисковых системах и обеспечиваем стабильный поток клиентов.",
    tags: ["SEO", "Контекстная реклама", "Лендинги", "Интернет-магазины"],
  },
  {
    icon: "ShoppingBag",
    title: "Ведение Авито",
    badge: "Avito",
    desc: "Профессиональное ведение аккаунта на Авито: оформление, публикация объявлений, продвижение и аналитика продаж.",
    tags: ["Объявления", "Продвижение", "Аналитика", "Автозагрузка"],
  },
  {
    icon: "Smartphone",
    title: "Мобильное приложение",
    badge: "iOS & Android",
    desc: "Разрабатываем мобильные приложения для бизнеса с нуля — индивидуальный дизайн, синхронизация с магазином и мощный маркетинг.",
    tags: ["Синхронизация с магазином", "Публикация в сторах", "Push Marketing", "Аналитика", "iOS & Android"],
  },
  {
    icon: "Plug",
    title: "Интеграция",
    badge: "Настроить",
    desc: "Автоматизация онлайн-торговли: заказы в CRM, синхронизация каталога, контроль сотрудников и обмен данными с маркетплейсами.",
    tags: ["CRM", "1С / учёт", "Яндекс / Google", "Маркетплейсы", "B2B порталы", "Готовые решения"],
  },
  {
    icon: "Zap",
    title: "Оптимизация",
    badge: "Быстро",
    desc: "Делаем продукты, которые работают быстро: ускорение сайта, оптимизация медиа, Google PageSpeed и разбор программного кода.",
    tags: ["PageSpeed", "Медиа-контент", "Код", "Загрузка страниц"],
  },
  {
    icon: "Bot",
    title: "Цифровые помощники",
    badge: "Боты",
    desc: "Вспомогательные программные боты любой сложности: чат-боты, боты для рассылок, Telegram, VK и WhatsApp боты.",
    tags: ["Telegram Bot", "VK Bot", "WhatsApp Bot", "Чат-консультант", "Рассылки"],
  },
  {
    icon: "Code2",
    title: "Индивидуальная разработка",
    badge: "Зачем?",
    desc: "Воплотите свою идею в жизнь: интерактивные помощники, нейронные сети, умный маркетинг, калькуляторы и административные панели.",
    tags: ["Нейронные сети", "Калькуляторы", "Аналитика", "Умный маркетинг", "CMS"],
  },
  {
    icon: "Glasses",
    title: "Дополненная реальность",
    badge: "Например",
    desc: "Проекты, которые выходят за рамки дисплея: AR-квесты, виртуальные исследования, интерактивные помощники и разработка под ключ.",
    tags: ["AR квесты", "Виртуальный тур", "Кастомизация", "Под ключ"],
  },
  {
    icon: "Users",
    title: "Социальные сети",
    badge: "#like",
    desc: "Создайте вокруг бизнеса социальное сообщество: продвижение групп, оформление, рассылки, реклама ВКонтакте и создание магазина.",
    tags: ["ВКонтакте", "Telegram", "Реклама", "Кросспостинг", "Магазин"],
  },
  {
    icon: "MousePointerClick",
    title: "Запуск рекламы",
    badge: "Click",
    desc: "Контекстная и таргетированная реклама, рассылки в мессенджерах, email-маркетинг, воронки продаж и аналитика роста.",
    tags: ["Google / Яндекс", "VK Реклама", "Email", "Воронки", "Аналитика"],
  },
  {
    icon: "PenLine",
    title: "Копирайтинг",
    badge: "Text",
    desc: "Оригинальный контент — важная составляющая сайта: уникальные статьи, продающие тексты, описания товаров, 100% уникальность.",
    tags: ["Статьи", "Продающие тексты", "Описания товаров", "Рерайт"],
  },
];

function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="services" className="py-32" style={{ background: "var(--dark-surface)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-20">
          <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Что мы делаем</p>
          <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0" }}>Наши услуги</h2>
          <div className="mt-5 gold-line" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const isOpen = expanded === i;
            return (
              <div
                key={s.title}
                className="reveal dark-card cursor-pointer"
                style={{ transitionDelay: `${i * 0.05}s`, border: isOpen ? "1px solid rgba(201, 168, 76, 0.35)" : undefined }}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className="p-7">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 flex-shrink-0 flex items-center justify-center"
                        style={{ border: "1px solid rgba(201, 168, 76, 0.2)", background: isOpen ? "rgba(201, 168, 76, 0.08)" : "transparent" }}
                      >
                        <Icon name={s.icon} size={18} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <div
                          className="font-sans text-xs tracking-widest uppercase mb-1"
                          style={{ color: "rgba(201, 168, 76, 0.5)" }}
                        >
                          {s.badge}
                        </div>
                        <h3 className="font-display text-xl font-light leading-tight" style={{ color: "#e8e0d0" }}>{s.title}</h3>
                      </div>
                    </div>
                    <div
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      <Icon name="Plus" size={14} style={{ color: "var(--gold)" }} />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(201, 168, 76, 0.1)" }}>
                      <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: "rgba(232, 224, 208, 0.6)" }}>
                        {s.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="font-sans text-xs px-2 py-1"
                            style={{ border: "1px solid rgba(201, 168, 76, 0.18)", color: "rgba(201, 168, 76, 0.7)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
const cases = [
  {
    industry: "Интернет-магазин", company: "StyleHub", tag: "Сайт + приложение",
    challenge: "Устаревший сайт без мобильной версии, заказы принимались только по телефону",
    solution: "Разработали современный интернет-магазин с интеграцией 1С, запустили мобильное приложение для iOS и Android с push-уведомлениями",
    results: [{ metric: "+340%", label: "онлайн-заказов" }, { metric: "×2.8", label: "конверсия в покупку" }, { metric: "18 000", label: "установок приложения" }],
    duration: "3 месяца",
  },
  {
    industry: "Авто-сервис", company: "AutoPro",  tag: "Реклама + SEO",
    challenge: "Нулевой трафик из интернета, все клиенты только по сарафанному радио",
    solution: "Запустили контекстную рекламу в Яндекс и Google, настроили SEO, создали и оформили группы ВКонтакте и Telegram-канал",
    results: [{ metric: "+520%", label: "трафик на сайт" }, { metric: "−60%", label: "стоимость заявки" }, { metric: "×4.1", label: "рост обращений" }],
    duration: "2 месяца",
  },
  {
    industry: "Доставка еды", company: "FoodRun", tag: "Чат-бот + автоматизация",
    challenge: "Менеджеры тратили 6 часов в день на обработку заказов в мессенджерах вручную",
    solution: "Разработали Telegram-бота с меню, приёмом заказов и оплатой, интегрировали с CRM и системой уведомлений курьеров",
    results: [{ metric: "−90%", label: "ручной обработки" }, { metric: "+210%", label: "заказов в месяц" }, { metric: "4 мин", label: "среднее время оформления" }],
    duration: "6 недель",
  },
];

function Portfolio() {
  const [active, setActive] = useState(0);
  const c = cases[active];

  return (
    <section id="portfolio" className="py-32" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-20">
          <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Результаты клиентов</p>
          <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0" }}>Портфолио</h2>
          <div className="mt-5 gold-line" />
        </div>

        <div className="reveal flex flex-col md:flex-row gap-4 mb-12">
          {cases.map((cs, i) => (
            <button
              key={cs.company}
              onClick={() => setActive(i)}
              className="text-left px-6 py-4 transition-all duration-300 font-sans text-sm"
              style={{
                background: active === i ? "rgba(201, 168, 76, 0.1)" : "transparent",
                border: active === i ? "1px solid rgba(201, 168, 76, 0.4)" : "1px solid rgba(201, 168, 76, 0.1)",
                color: active === i ? "var(--gold)" : "rgba(232, 224, 208, 0.5)",
              }}
            >
              <div className="text-xs tracking-widest uppercase mb-1" style={{ opacity: 0.7 }}>{cs.industry}</div>
              <div className="font-medium">{cs.company}</div>
            </button>
          ))}
        </div>

        <div className="reveal dark-card p-10 md:p-14">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div
                className="inline-block font-sans text-xs tracking-widest uppercase px-3 py-1 mb-6"
                style={{ border: "1px solid rgba(201, 168, 76, 0.25)", color: "var(--gold)" }}
              >
                {c.tag}
              </div>
              <h3 className="font-display text-4xl font-light mb-6" style={{ color: "#e8e0d0" }}>{c.company}</h3>

              <div className="mb-6">
                <p className="font-sans text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(201, 168, 76, 0.6)" }}>Задача</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(232, 224, 208, 0.7)" }}>{c.challenge}</p>
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(201, 168, 76, 0.6)" }}>Решение</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(232, 224, 208, 0.7)" }}>{c.solution}</p>
              </div>

              <div
                className="flex items-center gap-2 mt-8 pt-6"
                style={{ borderTop: "1px solid rgba(201, 168, 76, 0.1)" }}
              >
                <Icon name="Clock" size={14} style={{ color: "var(--gold)" }} />
                <span className="font-sans text-xs" style={{ color: "rgba(232, 224, 208, 0.4)" }}>
                  Срок проекта: {c.duration}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-sans text-xs tracking-widest uppercase mb-8" style={{ color: "rgba(201, 168, 76, 0.6)" }}>Результаты</p>
              <div className="flex flex-col gap-6">
                {c.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-6 pb-6"
                    style={{ borderBottom: "1px solid rgba(201, 168, 76, 0.08)" }}
                  >
                    <span className="font-display text-5xl font-light min-w-[110px]" style={{ color: "var(--gold)" }}>
                      {r.metric}
                    </span>
                    <span className="font-sans text-sm" style={{ color: "rgba(232, 224, 208, 0.6)" }}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { num: "01", title: "Заявка", desc: "Оставляете заявку или звоните — отвечаем в течение 30 минут в рабочее время." },
    { num: "02", title: "Бесплатный аудит", desc: "Анализируем ваш бизнес, сайт и конкурентов. Предлагаем решение под ваши задачи и бюджет." },
    { num: "03", title: "Договор и старт", desc: "Согласовываем ТЗ, подписываем договор. Вы всегда знаете, что происходит — личный кабинет с прогрессом." },
    { num: "04", title: "Запуск и рост", desc: "Сдаём проект в срок, обучаем команду, остаёмся на поддержке. Ваш бизнес растёт — мы рядом." },
  ];

  const advantages = [
    { icon: "Clock", title: "Сроки — не пустое слово", desc: "Фиксируем дедлайны в договоре. Не сдали вовремя — компенсируем." },
    { icon: "Eye", title: "Полная прозрачность", desc: "Личный кабинет с задачами, статусами и отчётами. Вы видите каждый этап работы." },
    { icon: "Headphones", title: "Поддержка 7 дней в неделю", desc: "Выделенный менеджер, чат и телефон. Решаем вопросы, а не перекладываем ответственность." },
    { icon: "TrendingUp", title: "Платите за результат", desc: "Оплата поэтапная. Принимаете работу — переходите к следующему этапу." },
    { icon: "Users", title: "Команда под ваш проект", desc: "Не фрилансер-одиночка, а команда: разработчик, дизайнер, маркетолог и менеджер." },
    { icon: "RefreshCw", title: "Правки включены", desc: "До 3 итераций правок на каждом этапе — без доплат. Работаем до вашего «да»." },
  ];

  const whyWe = [
    { label: "Сроки зафиксированы в договоре", us: true, them: false },
    { label: "Прозрачная отчётность и личный кабинет", us: true, them: false },
    { label: "Полный цикл: от идеи до рекламы", us: true, them: false },
    { label: "Поддержка после сдачи проекта", us: true, them: false },
    { label: "Поэтапная оплата", us: true, them: false },
    { label: "Выделенный менеджер проекта", us: true, them: false },
    { label: "Опыт в 10+ отраслях", us: true, them: false },
  ];

  const deliverables = [
    { icon: "Globe", text: "Готовый сайт или приложение под ключ" },
    { icon: "BarChart2", text: "Настроенную аналитику и цели" },
    { icon: "MousePointerClick", text: "Запущенную рекламу с первыми заявками" },
    { icon: "FileText", text: "Инструкции и обучение команды" },
    { icon: "ShieldCheck", text: "Гарантию и техническую поддержку" },
    { icon: "TrendingUp", text: "Отчёт по результатам и план роста" },
  ];

  return (
    <section id="about" className="py-32" style={{ background: "var(--dark-surface)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-28">

        {/* Как начать работу */}
        <div>
          <div className="reveal mb-16">
            <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Просто и понятно</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0" }}>
              Как начать{" "}
              <em className="italic" style={{ color: "var(--gold)" }}>работу</em>
            </h2>
            <div className="mt-5 gold-line" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="reveal card-hover dark-card p-7 cursor-pointer"
                style={{
                  transitionDelay: `${i * 0.08}s`,
                  borderColor: activeStep === i ? "rgba(201, 168, 76, 0.4)" : undefined,
                }}
                onMouseEnter={() => setActiveStep(i)}
              >
                <div
                  className="font-display text-5xl font-light mb-5 leading-none"
                  style={{ color: "rgba(201, 168, 76, 0.2)" }}
                >
                  {s.num}
                </div>
                <div className="font-display text-2xl font-light mb-3" style={{ color: "#e8e0d0" }}>{s.title}</div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(232, 224, 208, 0.55)" }}>{s.desc}</p>
                <div
                  className="mt-5 h-px transition-all duration-500"
                  style={{ background: activeStep === i ? "var(--gold)" : "rgba(201, 168, 76, 0.15)", width: activeStep === i ? "100%" : "30%" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Что вы получите */}
        <div>
          <div className="reveal mb-16">
            <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Результат работы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0" }}>
              Что вы{" "}
              <em className="italic" style={{ color: "var(--gold)" }}>получите</em>
            </h2>
            <div className="mt-5 gold-line" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((d, i) => (
              <div
                key={d.text}
                className="reveal flex items-start gap-5 p-6 dark-card card-hover"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.2)" }}
                >
                  <Icon name={d.icon} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <span className="font-sans text-sm leading-relaxed pt-2" style={{ color: "rgba(232, 224, 208, 0.7)" }}>{d.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Преимущества */}
        <div>
          <div className="reveal mb-16">
            <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Наши принципы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0" }}>
              Почему выбирают{" "}
              <em className="italic" style={{ color: "var(--gold)" }}>нас</em>
            </h2>
            <div className="mt-5 gold-line" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                className="reveal card-hover dark-card p-7"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5"
                  style={{ border: "1px solid rgba(201, 168, 76, 0.2)" }}
                >
                  <Icon name={a.icon} size={18} style={{ color: "var(--gold)" }} />
                </div>
                <div className="font-display text-xl font-light mb-2" style={{ color: "#e8e0d0" }}>{a.title}</div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(232, 224, 208, 0.55)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Мы vs Конкуренты */}
        <div>
          <div className="reveal mb-16">
            <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Сравнение</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0" }}>
              Мы vs{" "}
              <em className="italic" style={{ color: "var(--gold)" }}>конкуренты</em>
            </h2>
            <div className="mt-5 gold-line" />
          </div>

          <div className="reveal dark-card overflow-hidden">
            {/* Header */}
            <div
              className="grid grid-cols-3 px-8 py-4"
              style={{ background: "rgba(201, 168, 76, 0.06)", borderBottom: "1px solid rgba(201, 168, 76, 0.12)" }}
            >
              <div className="font-sans text-xs tracking-widest uppercase" style={{ color: "rgba(232, 224, 208, 0.4)" }}>Критерий</div>
              <div className="text-center font-sans text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>БизнесВверх</div>
              <div className="text-center font-sans text-xs tracking-widest uppercase" style={{ color: "rgba(232, 224, 208, 0.4)" }}>Другие агентства</div>
            </div>
            {whyWe.map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-3 px-8 py-5 items-center"
                style={{ borderBottom: i < whyWe.length - 1 ? "1px solid rgba(201, 168, 76, 0.07)" : "none" }}
              >
                <div className="font-sans text-sm" style={{ color: "rgba(232, 224, 208, 0.65)" }}>{row.label}</div>
                <div className="flex justify-center">
                  <div
                    className="w-7 h-7 flex items-center justify-center"
                    style={{ background: "rgba(201, 168, 76, 0.12)", border: "1px solid rgba(201, 168, 76, 0.3)" }}
                  >
                    <Icon name="Check" size={14} style={{ color: "var(--gold)" }} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div
                    className="w-7 h-7 flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Icon name="X" size={14} style={{ color: "rgba(232, 224, 208, 0.2)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
function Contacts() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });

  return (
    <section id="contacts" className="py-32" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <div className="reveal">
              <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Контакты</p>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-6" style={{ color: "#e8e0d0" }}>
                Начнём <em className="italic" style={{ color: "var(--gold)" }}>диалог</em>
              </h2>
              <div className="gold-line mb-10" />
            </div>

            <div className="reveal flex flex-col gap-8">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", value: "hello@biznessup.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Пресненская набережная, 10" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-5">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center" style={{ border: "1px solid rgba(201, 168, 76, 0.2)" }}>
                    <Icon name={c.icon} size={16} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <div className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(201, 168, 76, 0.6)" }}>{c.label}</div>
                    <div className="font-sans text-sm" style={{ color: "rgba(232, 224, 208, 0.8)" }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="reveal mt-12 p-8"
              style={{ background: "rgba(201, 168, 76, 0.05)", border: "1px solid rgba(201, 168, 76, 0.15)" }}
            >
              <p className="font-display text-2xl font-light mb-3" style={{ color: "#e8e0d0" }}>
                Бесплатный аудит вашего digital
              </p>
              <p className="font-sans text-sm" style={{ color: "rgba(232, 224, 208, 0.5)", lineHeight: "1.8" }}>
                Разберём ваш сайт, рекламу и присутствие в сети — покажем точки роста
                и предложим решение под ваш бюджет без обязательств.
              </p>
            </div>
          </div>

          <div className="reveal dark-card p-10">
            <p className="font-sans text-xs tracking-widest uppercase mb-8" style={{ color: "rgba(201, 168, 76, 0.6)" }}>
              Оставить заявку
            </p>
            <div className="flex flex-col gap-5">
              {[
                { key: "name", label: "Ваше имя", placeholder: "Иван Иванов" },
                { key: "company", label: "Компания", placeholder: "ООО «Ромашка»" },
                { key: "phone", label: "Телефон", placeholder: "+7 (___) ___-__-__" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="font-sans text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(201, 168, 76, 0.6)" }}>
                    {f.label}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-4 py-3 font-sans text-sm outline-none transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201, 168, 76, 0.15)", color: "#e8e0d0" }}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(201, 168, 76, 0.45)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(201, 168, 76, 0.15)"; }}
                  />
                </div>
              ))}
              <div>
                <label className="font-sans text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(201, 168, 76, 0.6)" }}>
                  Опишите задачу
                </label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем бизнесе и задаче..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 font-sans text-sm outline-none resize-none transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201, 168, 76, 0.15)", color: "#e8e0d0" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(201, 168, 76, 0.45)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(201, 168, 76, 0.15)"; }}
                />
              </div>
              <button
                className="w-full py-4 font-sans text-sm tracking-widest uppercase font-medium transition-all duration-300 mt-2"
                style={{ background: "var(--gold)", color: "var(--dark-bg)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--gold-light)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)"; }}
              >
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-12"
      style={{ background: "var(--dark-card)", borderTop: "1px solid rgba(201, 168, 76, 0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center" style={{ border: "1px solid rgba(201, 168, 76, 0.4)" }}>
            <span className="text-xs font-display" style={{ color: "var(--gold)" }}>БВ</span>
          </div>
          <span className="font-display text-base" style={{ color: "rgba(232, 224, 208, 0.6)" }}>БизнесВверх</span>
        </div>

        <p className="font-sans text-xs text-center" style={{ color: "rgba(232, 224, 208, 0.3)" }}>
          © 2026 БизнесВверх. Все права защищены.
        </p>

        <div className="flex gap-6">
          {[
            { label: "Главная", href: "#hero" },
            { label: "Услуги", href: "#services" },
            { label: "Портфолио", href: "#portfolio" },
            { label: "Контакты", href: "#contacts" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-sans text-xs transition-colors duration-200"
              style={{ color: "rgba(232, 224, 208, 0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(232, 224, 208, 0.35)"; }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index() {
  useReveal();

  return (
    <div style={{ background: "var(--dark-bg)" }}>
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contacts />
      <Footer />
    </div>
  );
}