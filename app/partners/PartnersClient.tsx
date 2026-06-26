"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Search } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmokyBackground from "../components/SmokyBackground";
import { type Lang } from "../lib/i18n";

const DISCORD_URL = "https://discord.gg/FwyZdVS5Vq";

const PARTNERS: { name: string; cat: string; url: string; logo?: string }[] = [
  // Магазины (реальные)
  { name: "Ivsofte", cat: "market", url: "https://ivsofte.biz/ru/products/abi-market-bot/", logo: "/ivsofte-logo.png" },
  { name: "DominationCheats", cat: "market", url: "https://domination-cheats.com/en/cheat/koenflow-arena-breakout", logo: "/domination-logo.png" },
  { name: "ArayasCheats", cat: "market", url: "https://arayas-cheats.com/en/game/arena-breakout-infinite/cheat/koenflow-arena-breakout", logo: "/arayas-logo.png" },
  { name: "GetCheats", cat: "market", url: "https://getcheats.io/cheat/koenflow-tradebot-arena-breakout", logo: "/getcheats-logo.png" },
  { name: "UpGame", cat: "market", url: "https://up-game.pro/product/arena-breakout-market-bot/", logo: "/upgame-logo.png" },
  { name: "DragonHack", cat: "market", url: "https://dragon-hack.pro/product/arena-breakout-market-bot/", logo: "/dragonhack-logo.png" },
  { name: "EliteHacks", cat: "market", url: "https://elitehacks.ru/en/arena_breakout_infinite/trade_bot", logo: "/elitehacks-logo.png" },
  { name: "YourCheats", cat: "market", url: "https://yourcheat.shop/product/trade-bot", logo: "/yourcheats-logo.png" },
  { name: "IndustriesCheat", cat: "market", url: "https://industries-cheat.store/ru/product/arenabreakout/marketbot", logo: "/industries-logo.png" },
  { name: "GameBreaker", cat: "market", url: "https://gamebreaker.ru/cheat/market-bot-arena-breakout", logo: "/gamebreaker-logo.png" },
  { name: "CheatHub", cat: "market", url: "https://cheat-hub.net/product/koenflow-abi", logo: "/cheathub-logo.png" },
  { name: "WizeCheats", cat: "market", url: "https://wizecheats.ru/ru/chity-arena-breakout-infinite/koenflow", logo: "/wizecheats-logo.png" },
  // Сообщества (реальные)
  { name: "Elitepvpers", cat: "community", url: "https://www.elitepvpers.com/forum/", logo: "/elitepvpers-logo.png" },
  { name: "Yougame", cat: "community", url: "https://yougame.biz/", logo: "/yougame-logo.png" },
  // FunPay-продавцы (реальные)
  { name: "BatcatEugene", cat: "seller", url: "https://funpay.com/users/5603766/", logo: "/funpay-logo.png" },
  { name: "Geniust", cat: "seller", url: "https://funpay.com/users/11192320/", logo: "/funpay-logo.png" },
  { name: "Versalsky", cat: "seller", url: "https://funpay.com/en/users/2037215/", logo: "/funpay-logo.png" },
  { name: "Unmer11", cat: "seller", url: "https://funpay.com/en/users/1898321/", logo: "/funpay-logo.png" },
  { name: "Kolik525252", cat: "seller", url: "https://funpay.com/users/10454439/", logo: "/funpay-logo.png" },
  { name: "YoungAmazon", cat: "seller", url: "https://funpay.com/en/users/10425783/", logo: "/funpay-logo.png" },
  { name: "Maks291282", cat: "seller", url: "https://funpay.com/en/users/2095403/", logo: "/funpay-logo.png" },
  { name: "Pipidahterka", cat: "seller", url: "https://funpay.com/users/13609498/", logo: "/funpay-logo.png" },
  { name: "Qwizyhacks", cat: "seller", url: "https://funpay.com/users/12077555/", logo: "/funpay-logo.png" },
  // YouTube-медиа (реальные)
  { name: "R1xon", cat: "media", url: "https://www.youtube.com/@R1Xon", logo: "/youtube-logo.png" },
  { name: "Koenflow", cat: "media", url: "https://www.youtube.com/@KoenFlow1", logo: "/youtube-logo.png" },
];

const CAT_KEYS = ["all", "market", "community", "seller", "media"] as const;

const T = {
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Партнёры",
    badge: "Партнёры",
    title: "Станьте партнёром",
    metaProgram: "Партнёрская программа",
    allPartners: "Все партнёры",
    searchPlaceholder: "Поиск партнёра...",
    notFound: "Партнёры не найдены.",
    visit: "Перейти",
    categories: { all: "Все", market: "Магазины", community: "Сообщества", seller: "Продавцы", media: "Медиа" },
    tags: { market: "Магазин", community: "Сообщество", seller: "Продавец", media: "Медиа" },
    tiers: [
      { name: "Affiliate", audience: "Для блогеров и стримеров", price: "Бесплатно", features: ["Реферальная ссылка", "Оплата за просмотры", "Комиссия по договорённости", "Промо-материалы"], cta: "Присоединиться", popular: false },
      { name: "Reseller", audience: "Для индивидуальных продавцов", price: "До 40% скидки", features: ["Ключи на реализацию", "Своя цена продажи", "Совместный маркетинг", "Приоритетная поддержка"], cta: "Стать реселлером", popular: true },
      { name: "Official", audience: "Для платформ и сервисов", price: "Индивидуально", features: ["Размещение на сайте", "API-доступ", "Приятные условия", "Личный менеджер"], cta: "Связаться", popular: false },
    ],
    heroTitle: "Зарабатывайте вместе с Koenflow",
    heroDesc: "Приводите аудиторию, продавайте ключи или интегрируйте бота, и получайте долю с каждой продажи.",
    heroCta: "Подать заявку",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Partners",
    badge: "Partners",
    title: "Become a partner",
    metaProgram: "Partner program",
    allPartners: "All partners",
    searchPlaceholder: "Search partner...",
    notFound: "No partners found.",
    visit: "Visit",
    categories: { all: "All", market: "Shops", community: "Communities", seller: "Sellers", media: "Media" },
    tags: { market: "Shop", community: "Community", seller: "Seller", media: "Media" },
    tiers: [
      { name: "Affiliate", audience: "For bloggers and streamers", price: "Free", features: ["Referral link", "Pay per views", "Negotiable commission", "Promo materials"], cta: "Join", popular: false },
      { name: "Reseller", audience: "For individual sellers", price: "Up to 40% off", features: ["Keys on consignment", "Your own price", "Joint marketing", "Priority support"], cta: "Become a reseller", popular: true },
      { name: "Official", audience: "For platforms and services", price: "Custom", features: ["Listing on the site", "API access", "Better terms", "Personal manager"], cta: "Contact us", popular: false },
    ],
    heroTitle: "Earn together with Koenflow",
    heroDesc: "Bring an audience, sell keys or integrate the bot, and earn a share of every sale.",
    heroCta: "Apply",
  },
} as const;

export default function PartnersClient({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = PARTNERS.filter(
    (p) =>
      (active === "all" || p.cat === active) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="relative min-h-screen text-ink">
      <SmokyBackground />
      <Navbar lang={lang} />

      <main className="relative z-10 container-page px-sm py-3xl sm:px-lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2xs font-inter text-label uppercase text-muted">
          <a href="/" className="transition-colors hover:text-ink">
            {t.breadcrumbHome}
          </a>
          <span className="text-white/25">/</span>
          <span className="text-brand">{t.breadcrumbCurrent}</span>
        </nav>

        {/* Badge */}
        <span className="mt-sm inline-block rounded-full bg-brand/15 px-sm py-2xs font-inter text-label uppercase text-brand">
          {t.badge}
        </span>

        {/* Title */}
        <h1 className="mt-sm font-podium text-h1 text-ink">{t.title}</h1>

        {/* Meta */}
        <div className="mt-xs flex flex-wrap items-center gap-2xs font-inter text-label uppercase text-muted">
          <span>KoenFlow</span>
          <span className="text-white/25">·</span>
          <span>{t.metaProgram}</span>
        </div>

        {/* Pricing tiers */}
        <div className="mt-lg grid grid-cols-1 gap-sm lg:grid-cols-3">
          {t.tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-lg"
            >
              <span className="font-inter text-body font-semibold text-ink">
                {tier.name}
              </span>
              <span className="mt-3xs font-inter text-body-sm text-muted">
                {tier.audience}
              </span>

              <span className="mt-sm font-inter text-h1 text-ink">{tier.price}</span>

              <ul className="mt-md flex flex-col gap-xs">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-xs">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span className="font-inter text-body-sm text-ink/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className={`mt-lg inline-flex h-xl w-full items-center justify-center rounded-lg px-sm font-inter text-button uppercase transition-colors ${
                  tier.popular
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "border border-white/15 bg-white/5 text-ink hover:bg-white/10"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Section header */}
        <h2 className="mt-3xl font-inter text-h1 text-ink">{t.allPartners}</h2>

        {/* Filters + search */}
        <div className="mt-md flex flex-col gap-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2xs">
            {CAT_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`rounded-full border px-sm py-2xs font-inter text-label uppercase transition-colors ${
                  active === key
                    ? "border-brand/30 bg-brand/15 text-brand"
                    : "border-white/10 bg-white/5 text-muted hover:text-ink"
                }`}
              >
                {t.categories[key]}
              </button>
            ))}
          </div>

          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute left-sm top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-lg w-full rounded-lg border border-white/10 bg-white/5 pl-xl pr-sm font-inter text-body-sm text-ink placeholder:text-muted focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="mt-md overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {filtered.length === 0 ? (
            <p className="px-sm py-lg text-center font-inter text-body-sm text-muted">
              {t.notFound}
            </p>
          ) : (
            filtered.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-sm border-b border-white/10 px-sm py-sm transition-colors last:border-0 hover:bg-white/5"
              >
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt=""
                    width={32}
                    height={32}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-8 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 font-inter text-body-sm font-semibold text-ink">
                    {p.name[0]}
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <div className="font-inter text-body font-semibold text-ink">
                    {p.name}
                  </div>
                  <div className="mt-3xs font-inter text-caption uppercase text-muted sm:hidden">
                    {t.tags[p.cat as keyof typeof t.tags]}
                  </div>
                </div>

                <span className="hidden w-44 font-inter text-label uppercase text-muted sm:block">
                  {t.tags[p.cat as keyof typeof t.tags]}
                </span>

                <span className="inline-flex shrink-0 items-center gap-3xs font-inter text-body-sm text-muted transition-colors group-hover:text-brand">
                  {t.visit}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))
          )}
        </div>

        {/* Hero: become a partner — full-bleed image, copy overlaid */}
        <div className="mt-3xl relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/partners-hero.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-right-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="relative z-10 flex min-h-80 max-w-[36rem] flex-col justify-center gap-sm p-lg lg:min-h-[26rem] lg:p-xl">
            <h2 className="font-inter text-h1 text-ink">{t.heroTitle}</h2>
            <p className="font-inter text-body text-white/80">{t.heroDesc}</p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2xs inline-flex h-xl w-fit items-center justify-center rounded-lg bg-brand px-md font-inter text-button uppercase text-white transition-colors hover:bg-brand/90"
            >
              {t.heroCta}
            </a>
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
