import { NAV, type Lang } from "../lib/i18n";

const DISCORD_URL = "https://discord.gg/FwyZdVS5Vq";

const FOOTER: Record<Lang, { tagline: string; rights: string }> = {
  en: {
    tagline: "Automated trading for Arena Breakout: Infinite.",
    rights: "All rights reserved.",
  },
  ru: {
    tagline: "Автоматическая торговля для Arena Breakout: Infinite.",
    rights: "Все права защищены.",
  },
};

export default function Footer({ lang }: { lang: Lang }) {
  const nav = NAV[lang];
  const f = FOOTER[lang];
  return (
    <footer className="relative z-10 mt-3xl border-t border-white/10">
      <div className="container-page flex flex-col gap-md px-sm py-lg sm:px-lg">
        <div className="flex flex-col justify-between gap-md sm:flex-row sm:items-center">
          <div>
            <a href="/" className="font-podium text-wordmark uppercase text-ink">
              KoenFlow
            </a>
            <p className="mt-2xs font-inter text-body-sm text-muted">{f.tagline}</p>
          </div>
          <nav
            aria-label={nav.langLabel === "Язык" ? "Подвал" : "Footer"}
            className="flex flex-wrap items-center gap-md font-inter text-nav uppercase text-muted"
          >
            <a href="/instructions" className="transition-colors hover:text-ink">
              {nav.instructions}
            </a>
            <a href="/partners" className="transition-colors hover:text-ink">
              {nav.partners}
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              Discord
            </a>
          </nav>
        </div>
        <div className="border-t border-white/5 pt-md font-inter text-nav uppercase text-muted">
          © 2026 KoenFlow. {f.rights}
        </div>
      </div>
    </footer>
  );
}
