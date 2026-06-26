// Shared i18n primitives — safe to import from BOTH server and client
// components (no server-only imports here; the cookie reader lives in
// i18n.server.ts).

export type Lang = "ru" | "en";

export const LANG_COOKIE = "lang";

// Shared chrome strings (navbar). Page-specific copy lives in each page.
export const NAV: Record<Lang, { instructions: string; partners: string; getInTouch: string; langLabel: string }> = {
  ru: { instructions: "Инструкции", partners: "Партнёры", getInTouch: "Связаться", langLabel: "Язык" },
  en: { instructions: "Instructions", partners: "Partners", getInTouch: "Get in touch", langLabel: "Language" },
};
