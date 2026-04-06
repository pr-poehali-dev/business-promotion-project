import { useEffect, useRef, useState } from "react";
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
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    const onHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hovering = t.closest("a,button,[data-hover]") !== null;
      dotRef.current?.classList.toggle("hovering", hovering);
      ringRef.current?.classList.toggle("hovering", hovering);
    };
    let raf: number;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHover);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─── Marquee strip ────────────────────────────────────────────────────────────
const marqueeItems = [
  "Сайты под ключ", "Мобильные приложения", "SEO продвижение",
  "Реклама Яндекс / Google", "Telegram боты", "Авито", "Автоматизация",
  "Дизайн интерфейсов", "CRM интеграции", "Соцсети",
];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{ borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)", background: "rgba(201,168,76,0.03)" }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8 pr-8 flex-shrink-0">
            <span className="font-sans text-xs tracking-widest uppercase whitespace-nowrap" style={{ color: "rgba(201,168,76,0.55)" }}>
              {item}
            </span>
            <span style={{ color: "rgba(201,168,76,0.25)", fontSize: "6px" }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
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
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--dark-bg)" }}
    >
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at ${30 + mousePos.x * 40}% ${20 + mousePos.y * 30}%, rgba(201,168,76,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at ${70 - mousePos.x * 20}% ${70 - mousePos.y * 20}%, rgba(201,168,76,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(14,12,9,1) 0%, transparent 70%)
          `
        }}
      />

      {/* SVG animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {/* Animated grid lines */}
          {[0,1,2,3,4].map(i => (
            <line key={`v${i}`} x1={200 + i * 200} y1="0" x2={200 + i * 200} y2="800"
              stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
          ))}
          {[0,1,2,3].map(i => (
            <line key={`h${i}`} x1="0" y1={150 + i * 170} x2="1200" y2={150 + i * 170}
              stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
          ))}
          {/* Large spinning circle */}
          <circle cx="900" cy="200" r="280" fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth="1"
            style={{ transformOrigin: "900px 200px", animation: "spin-slow 30s linear infinite" }} />
          <circle cx="900" cy="200" r="180" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1"
            strokeDasharray="8 16"
            style={{ transformOrigin: "900px 200px", animation: "spin-reverse 20s linear infinite" }} />
          {/* Floating diamond */}
          <polygon points="900,80 960,200 900,320 840,200"
            fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1"
            style={{ transformOrigin: "900px 200px", animation: "spin-slow 25s linear infinite" }} />
          {/* Left accent geometry */}
          <circle cx="150" cy="500" r="120" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1"
            strokeDasharray="4 12"
            style={{ transformOrigin: "150px 500px", animation: "spin-reverse 18s linear infinite" }} />
          {/* Diagonal accent line */}
          <line x1="0" y1="750" x2="400" y2="350" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
          <line x1="1200" y1="50" x2="800" y2="450" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
        </svg>

        {/* Floating orbs */}
        <div className="absolute animate-float-slow animate-delay-0"
          style={{ top: "15%", right: "12%", width: 280, height: 280,
            background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
            borderRadius: "50%" }} />
        <div className="absolute animate-float animate-delay-1500"
          style={{ bottom: "20%", left: "8%", width: 200, height: 200,
            background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
            borderRadius: "50%" }} />
        <div className="absolute animate-float-slow animate-delay-3000"
          style={{ top: "50%", left: "50%", width: 400, height: 400, marginLeft: -200, marginTop: -200,
            background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
            borderRadius: "50%" }} />
      </div>

      {/* Right-side decorative visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block" style={{ width: 360, marginRight: -40 }}>
        <div className="relative w-full h-[360px]">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border animate-spin-slow"
            style={{ borderColor: "rgba(201,168,76,0.1)", borderStyle: "dashed" }} />
          {/* Middle ring */}
          <div className="absolute inset-10 rounded-full border animate-spin-reverse"
            style={{ borderColor: "rgba(201,168,76,0.12)" }} />
          {/* Inner circle */}
          <div className="absolute inset-20 rounded-full animate-pulse-gold"
            style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)" }} />
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse-gold"
            style={{ background: "var(--gold)" }} />
          {/* Orbiting dots */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <div key={deg} className="absolute top-1/2 left-1/2 w-2 h-2"
              style={{
                marginTop: -4, marginLeft: -4,
                animation: `orbit ${10 + i}s linear infinite`,
                animationDelay: `${-i * 2}s`,
              }}>
              <div className="w-2 h-2 rounded-full" style={{ background: i % 2 === 0 ? "var(--gold)" : "rgba(201,168,76,0.4)" }} />
            </div>
          ))}
          {/* Floating cards */}
          <div className="absolute glass-card px-4 py-3 animate-float"
            style={{ top: "8%", left: "-10%", animationDelay: "0.5s", minWidth: 140 }}>
            <div className="font-sans text-xs mb-1" style={{ color: "rgba(201,168,76,0.6)" }}>Новый проект</div>
            <div className="font-display text-lg" style={{ color: "#e8e0d0" }}>StyleHub</div>
            <div className="font-sans text-xs mt-1 flex items-center gap-1" style={{ color: "rgba(201,168,76,0.8)" }}>
              <span>↑</span> +340% заказов
            </div>
          </div>
          <div className="absolute glass-card px-4 py-3 animate-float-slow"
            style={{ bottom: "12%", left: "-15%", animationDelay: "2s", minWidth: 130 }}>
            <div className="font-sans text-xs mb-1" style={{ color: "rgba(201,168,76,0.6)" }}>Запущено</div>
            <div className="font-sans text-sm" style={{ color: "#e8e0d0" }}>18 000 установок</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center lg:text-left lg:max-w-3xl lg:mr-auto lg:ml-16 xl:ml-32">
        <div className="flex items-center gap-3 justify-center lg:justify-start mb-8 animate-fade-in" style={{ animationFillMode: "both" }}>
          <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
          <p className="text-xs tracking-widest uppercase font-sans" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
            Digital-агентство
          </p>
        </div>

        <h1
          className="font-display font-light leading-none mb-8 animate-fade-in animate-delay-200"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: "#e8e0d0", letterSpacing: "-0.02em", animationFillMode: "both" }}
        >
          Рост,{" "}
          <em className="italic shimmer-text">который</em>
          <br />
          виден в цифрах
        </h1>

        <p
          className="font-sans font-light max-w-lg mb-12 animate-fade-in animate-delay-400"
          style={{ fontSize: "1.1rem", color: "rgba(232,224,208,0.58)", lineHeight: "1.85", animationFillMode: "both" }}
        >
          Создаём сайты, мобильные приложения и digital-инструменты,
          которые привлекают клиентов и автоматизируют ваш бизнес
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animate-delay-500" style={{ animationFillMode: "both" }}>
          <a href="#portfolio" className="btn-gold px-8 py-4 font-sans text-sm tracking-widest uppercase font-medium">
            Смотреть кейсы
          </a>
          <a
            href="#contacts"
            className="px-8 py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 group"
            style={{ border: "1px solid rgba(201,168,76,0.35)", color: "rgba(232,224,208,0.75)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(232,224,208,0.75)";
            }}
          >
            Бесплатный аудит
          </a>
        </div>

        <div
          className="grid grid-cols-3 gap-8 max-w-md mt-20 pt-10 animate-fade-in animate-delay-700 mx-auto lg:mx-0"
          style={{ borderTop: "1px solid rgba(201,168,76,0.1)", animationFillMode: "both" }}
        >
          {[
            { value: "7+", label: "лет на рынке" },
            { value: "320+", label: "проектов" },
            { value: "98%", label: "возвращаются" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl font-light mb-1" style={{ color: "var(--gold)" }}>
                {s.value}
              </div>
              <div className="font-sans text-xs tracking-wider uppercase" style={{ color: "rgba(232,224,208,0.4)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.45 }}>
        <div className="w-px h-12 relative overflow-hidden" style={{ background: "rgba(201,168,76,0.2)" }}>
          <div className="absolute top-0 left-0 w-full h-1/2 animate-float"
            style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }} />
        </div>
        <span className="font-sans text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Scroll</span>
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

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Сколько стоят ваши услуги?",
    a: "Стоимость зависит от задачи. Лендинг — от 25 000 ₽, интернет-магазин — от 80 000 ₽, мобильное приложение — от 150 000 ₽. На бесплатном аудите называем точную цену под ваш проект — без скрытых платежей.",
  },
  {
    q: "Как долго делается сайт?",
    a: "Лендинг — 7–14 дней, корпоративный сайт — 3–4 недели, интернет-магазин — 4–6 недель. Сроки фиксируются в договоре. Не успели — компенсируем.",
  },
  {
    q: "Вы работаете с небольшим бизнесом?",
    a: "Да, это наша основная аудитория. Мы понимаем, что каждый рубль на счету, поэтому предлагаем решения под бюджет и поэтапную оплату. Минимальный проект — от 15 000 ₽.",
  },
  {
    q: "Что если результат мне не понравится?",
    a: "До сдачи каждого этапа — до 3 итераций правок бесплатно. Работаем до вашего «да». Если после старта что-то пойдёт не так — гарантийная поддержка 3 месяца включена в каждый проект.",
  },
  {
    q: "Нужно ли мне разбираться в технологиях?",
    a: "Совсем нет. Вы ставите задачу бизнес-языком — мы переводим в техническое решение. После сдачи обучаем управлять сайтом самостоятельно и оставляем видео-инструкции.",
  },
  {
    q: "Вы занимаетесь продвижением после запуска?",
    a: "Да. SEO, контекстная реклама, соцсети, Авито — всё это наши услуги. Многие клиенты начинают с сайта, а потом подключают продвижение. Можем работать в связке.",
  },
  {
    q: "Можно ли доработать уже существующий сайт?",
    a: "Конечно. Доработки, редизайн, ускорение, интеграции — берёмся за любые задачи с существующими проектами. Сначала делаем аудит и называем стоимость.",
  },
  {
    q: "Как проходит общение в процессе работы?",
    a: "У вас будет личный менеджер, чат в мессенджере и доступ к онлайн-доске с задачами. Регулярные созвоны по статусу — по желанию. Никаких «мы вам перезвоним».",
  },
];

function FaqList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="reveal flex flex-col gap-3 max-w-4xl">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="dark-card cursor-pointer transition-all duration-300"
            style={{ borderColor: isOpen ? "rgba(201, 168, 76, 0.3)" : undefined }}
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <div className="flex items-start justify-between gap-6 px-8 py-6">
              <span
                className="font-display text-xl font-light leading-snug"
                style={{ color: isOpen ? "#e8e0d0" : "rgba(232, 224, 208, 0.75)" }}
              >
                {f.q}
              </span>
              <div
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-300 mt-0.5"
                style={{
                  border: "1px solid rgba(201, 168, 76, 0.25)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  background: isOpen ? "rgba(201, 168, 76, 0.1)" : "transparent",
                }}
              >
                <Icon name="Plus" size={13} style={{ color: "var(--gold)" }} />
              </div>
            </div>

            {isOpen && (
              <div
                className="px-8 pb-6"
                style={{ borderTop: "1px solid rgba(201, 168, 76, 0.08)" }}
              >
                <p
                  className="font-sans text-sm leading-relaxed pt-5"
                  style={{ color: "rgba(232, 224, 208, 0.6)" }}
                >
                  {f.a}
                </p>
              </div>
            )}
          </div>
        );
      })}

      <div
        className="mt-6 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{ background: "rgba(201, 168, 76, 0.05)", border: "1px solid rgba(201, 168, 76, 0.15)" }}
      >
        <div>
          <p className="font-display text-2xl font-light mb-1" style={{ color: "#e8e0d0" }}>Не нашли ответ?</p>
          <p className="font-sans text-sm" style={{ color: "rgba(232, 224, 208, 0.5)" }}>Напишите нам — ответим в течение 30 минут</p>
        </div>
        <a
          href="#contacts"
          className="flex-shrink-0 px-7 py-3 font-sans text-sm tracking-widest uppercase font-medium transition-all duration-300"
          style={{ background: "var(--gold)", color: "var(--dark-bg)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-light)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)"; }}
        >
          Написать
        </a>
      </div>
    </div>
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

        {/* FAQ */}
        <div>
          <div className="reveal mb-16">
            <p className="text-xs tracking-widest uppercase mb-4 font-sans" style={{ color: "var(--gold)" }}>Частые вопросы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0" }}>
              Отвечаем{" "}
              <em className="italic" style={{ color: "var(--gold)" }}>честно</em>
            </h2>
            <div className="mt-5 gold-line" />
          </div>

          <FaqList />
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
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <div className="section-divider" />
      <Portfolio />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Contacts />
      <Footer />
    </div>
  );
}