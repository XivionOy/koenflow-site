import type { Metadata } from "next";
import { type Lang } from "./i18n";

// Production origin. Change this if the site deploys on a different domain.
export const SITE_URL = "https://koenflow.com";

type Copy = { title: string; description: string };

export const SEO: Record<"home" | "instructions" | "partners", Record<Lang, Copy>> = {
  home: {
    en: {
      title: "KoenFlow · Automated Arena Breakout trading bot",
      description:
        "KoenFlow runs the Arena Breakout: Infinite market for you. It lists items, undercuts the competition and flips ammo and gear around the clock, fully on autopilot.",
    },
    ru: {
      title: "KoenFlow · Автоторговый бот для Arena Breakout",
      description:
        "KoenFlow ведёт рынок Arena Breakout: Infinite за вас. Он выставляет предметы, обходит конкурентов по цене и крутит патроны и снаряжение круглосуточно, полностью на автопилоте.",
    },
  },
  instructions: {
    en: {
      title: "Setup guide",
      description:
        "Get KoenFlow running in minutes. Prepare Windows, activate your key, set the game up correctly and launch the bot, step by step.",
    },
    ru: {
      title: "Инструкция",
      description:
        "Запустите KoenFlow за несколько минут. Подготовка Windows, активация ключа, правильная настройка игры и запуск бота, шаг за шагом.",
    },
  },
  partners: {
    en: {
      title: "Partner program",
      description:
        "Become a KoenFlow partner. Resell keys, bring an audience or integrate the bot, and earn a share of every sale. Explore trusted shops, sellers, communities and media.",
    },
    ru: {
      title: "Партнёрская программа",
      description:
        "Станьте партнёром KoenFlow. Перепродавайте ключи, приводите аудиторию или интегрируйте бота и зарабатывайте долю с каждой продажи. Проверенные магазины, продавцы, сообщества и медиа.",
    },
  },
};

// Builds per-page Metadata for sub-pages (title gets the "%s · KoenFlow"
// template from the root layout; OG/Twitter carry the full title).
export function pageMetadata(
  page: "instructions" | "partners",
  lang: Lang,
  path: string,
): Metadata {
  const c = SEO[page][lang];
  const fullTitle = `${c.title} · KoenFlow`;
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "KoenFlow",
      title: fullTitle,
      description: c.description,
      url: path,
      locale: lang === "ru" ? "ru_RU" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: c.description,
    },
  };
}
