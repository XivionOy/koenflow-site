"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe, X } from "lucide-react";

import { NAV, LANG_COOKIE, type Lang } from "../lib/i18n";
import { PRODUCTS, PRODUCT_ORDER } from "../instructions/products";

const DISCORD_URL = "https://discord.gg/FwyZdVS5Vq";

export default function Navbar({ lang }: { lang: Lang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [instrOpen, setInstrOpen] = useState(false);
  const instrRef = useRef<HTMLDivElement>(null);
  const t = NAV[lang];

  const switchLang = () => {
    const next: Lang = lang === "ru" ? "en" : "ru";
    document.cookie = `${LANG_COOKIE}=${next};path=/;max-age=31536000`;
    window.location.reload();
  };

  // Клик вне и Esc закрывают дропдаун инструкций.
  useEffect(() => {
    if (!instrOpen) return;
    const onDown = (e: MouseEvent) => {
      if (instrRef.current && !instrRef.current.contains(e.target as Node)) setInstrOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInstrOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [instrOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 h-18 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="container-page flex h-full items-center justify-between px-sm sm:px-lg">
          <a href="/" className="font-podium text-wordmark uppercase text-white">
            KoenFlow
          </a>

          <div className="hidden items-center gap-xl md:flex">
            {/* Инструкции — дропдаун выбора продукта */}
            <div ref={instrRef} className="relative">
              <button
                type="button"
                onClick={() => setInstrOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={instrOpen}
                className="flex items-center gap-2xs font-inter text-nav uppercase text-white/80 transition-colors hover:text-white"
              >
                {t.instructions}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${instrOpen ? "rotate-180" : ""}`}
                />
              </button>

              {instrOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-[calc(100%+14px)] z-50 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#0c0912] p-3xs shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
                >
                  {PRODUCT_ORDER.map((id) => (
                    <a
                      key={id}
                      href={`/instructions?p=${id}`}
                      role="menuitem"
                      onClick={() => setInstrOpen(false)}
                      className="block rounded-lg px-sm py-xs font-inter text-body-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {PRODUCTS[id].label[lang]}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/partners"
              className="font-inter text-nav uppercase text-white/80 transition-colors hover:text-white"
            >
              {t.partners}
            </a>
          </div>

          <div className="hidden items-center gap-xs md:flex">
            <button
              type="button"
              onClick={switchLang}
              aria-label={`${t.langLabel}: ${lang.toUpperCase()}`}
              title={`${t.langLabel}: ${lang.toUpperCase()}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              <Globe className="h-5 w-5" />
            </button>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-lg items-center gap-xs rounded-lg border border-white/30 px-sm font-inter text-button uppercase text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              {t.getInTouch}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex flex-col space-y-1.5 md:hidden"
          >
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-4 bg-white" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-page flex items-center justify-between px-sm py-sm">
          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-podium text-wordmark uppercase text-white"
          >
            KoenFlow
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-7 w-7 text-white" />
          </button>
        </div>

        <div className="container-page flex flex-1 flex-col items-start justify-center gap-sm px-sm">
          {/* Инструкции с подпунктами продуктов */}
          <div
            style={{
              transitionDelay: "100ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            }}
            className="flex flex-col gap-xs transition-all duration-500"
          >
            <span className="font-podium text-menu uppercase text-white">{t.instructions}</span>
            <div className="flex flex-col gap-2xs pl-sm">
              {PRODUCT_ORDER.map((id) => (
                <a
                  key={id}
                  href={`/instructions?p=${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-inter text-body uppercase text-white/70 transition-colors hover:text-white"
                >
                  {PRODUCTS[id].short[lang]}
                </a>
              ))}
            </div>
          </div>

          <a
            href="/partners"
            onClick={() => setMenuOpen(false)}
            style={{
              transitionDelay: "180ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            }}
            className="font-podium text-menu uppercase text-white transition-all duration-500"
          >
            {t.partners}
          </a>

          <div
            style={{
              transitionDelay: "260ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            }}
            className="mt-md flex items-center gap-xs transition-all duration-500"
          >
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2xs rounded-lg border border-white/30 px-sm py-xs font-inter text-button uppercase text-white"
            >
              {t.getInTouch}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={switchLang}
              aria-label={`${t.langLabel}: ${lang.toUpperCase()}`}
              className="inline-flex items-center gap-2xs rounded-lg border border-white/30 px-sm py-xs font-inter text-button uppercase text-white"
            >
              <Globe className="h-4 w-4" />
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
