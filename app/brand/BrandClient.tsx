"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmokyBackground from "../components/SmokyBackground";
import { type Lang } from "../lib/i18n";

// Both lists below mix rules with prohibitions ("do not recolour", "do not host a
// copy"), so they get a neutral marker. A check mark next to "do not do X" reads
// as the opposite of what it says.
function Bullet() {
  return <span aria-hidden className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-brand" />;
}

// Both endpoints are already public on the backend. The 443 path in front of
// them is what makes the link usable from a shop's storefront; see
// deploy/koenflow-site.conf.
const DOWNLOAD_URL = "https://koenflow.com/api/public/launcher/download";
const MANIFEST_URL = "https://koenflow.com/api/public/launcher/manifest";

const SNIPPET = `<a href="${DOWNLOAD_URL}">Download KoenFlow Launcher</a>`;

const LOGOS: { file: string; label: string; on: "dark" | "light" }[] = [
  { file: "koenflow-mark-on-dark.svg", label: "Mark, on dark", on: "dark" },
  { file: "koenflow-mark-on-light.svg", label: "Mark, on light", on: "light" },
  { file: "koenflow-lockup-on-dark.svg", label: "Lockup, on dark", on: "dark" },
  { file: "koenflow-lockup-on-light.svg", label: "Lockup, on light", on: "light" },
];

const T = {
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Логотипы",
    badge: "Для партнёров",
    title: "Логотипы и ссылка на скачивание",
    lead: "Всё, что нужно магазину, чтобы поставить у себя карточку KoenFlow: логотипы в нужных вариантах и прямая ссылка на лаунчер.",
    logosTitle: "Логотипы",
    logosLead: "SVG для сайта, PNG на прозрачном фоне для маркетплейсов. Версия «on dark» для тёмных страниц, «on light» для светлых.",
    downloadAll: "Скачать все файлы",
    rulesTitle: "Как использовать",
    rules: [
      "Не перекрашивайте знак и не добавляйте обводку или тень.",
      "Не растягивайте: меняйте размер только пропорционально.",
      "Минимальная высота знака 24 px, вокруг оставляйте свободное поле не меньше половины его высоты.",
      "Берите вариант под фон: светлый знак на тёмном, тёмный на светлом.",
      "Не встраивайте знак в свой логотип и не делайте из него составной знак.",
    ],
    linkTitle: "Кнопка скачивания",
    linkLead: "Обычная ссылка. Файл отдаётся с заголовком Content-Disposition: attachment, поэтому скачивание начинается сразу и покупатель остаётся на вашей странице. Редиректа на koenflow.com не будет.",
    copy: "Скопировать",
    copied: "Скопировано",
    manifestTitle: "Версия и размер",
    manifestLead: "Не прописывайте версию руками, она устареет. Запросите манифест и покажите то, что в нём:",
    manifestNote: "Отвечает JSON с полями version, fileSizeBytes, sha256Hash, releasedAt и releaseNotes. Обновляется сам, как только мы публикуем новый релиз.",
    notesTitle: "Что важно знать",
    notes: [
      "Ссылка всегда отдаёт актуальный стабильный релиз. Отдельная ссылка на конкретную версию не нужна.",
      "Не размещайте копию файла у себя. Она устареет, и у покупателя сломается автообновление лаунчера.",
      "Лаунчер бесплатный, ключ он спрашивает при первом запуске. Скачивание можно открывать всем, не только после оплаты.",
      "Если нужен свой домен вида dl.вашмагазин.com, напишите нам, настроим CNAME на нашу сторону.",
    ],
    contact: "Вопросы по интеграции — в Discord.",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Brand",
    badge: "For partners",
    title: "Brand kit and download link",
    lead: "Everything a shop needs to put a KoenFlow listing on its storefront: logos in the right variants and a direct link to the launcher.",
    logosTitle: "Logos",
    logosLead: "SVG for the web, transparent PNG for marketplaces. Use the on-dark version on dark pages and the on-light version on light ones.",
    downloadAll: "Download all files",
    rulesTitle: "How to use them",
    rules: [
      "Do not recolour the mark, and do not add an outline or a shadow.",
      "Do not stretch it: scale proportionally only.",
      "Minimum mark height is 24 px, and keep clear space of at least half its height around it.",
      "Pick the variant that matches your background: light mark on dark, dark mark on light.",
      "Do not build the mark into a logo of your own or make it part of a combined mark.",
    ],
    linkTitle: "Download button",
    linkLead: "A plain link. The file is served with Content-Disposition: attachment, so the download starts immediately and your customer stays on your page. There is no redirect to koenflow.com.",
    copy: "Copy",
    copied: "Copied",
    manifestTitle: "Version and size",
    manifestLead: "Do not hard-code the version, it will go stale. Request the manifest and show what it returns:",
    manifestNote: "Responds with JSON carrying version, fileSizeBytes, sha256Hash, releasedAt and releaseNotes. It updates itself the moment we publish a new release.",
    notesTitle: "Worth knowing",
    notes: [
      "The link always serves the current stable release. You do not need a separate link per version.",
      "Do not host a copy of the file yourself. It will go stale and it breaks the launcher's self-update for your customer.",
      "The launcher is free and asks for a key on first run, so the download can be open to everyone, not only to buyers.",
      "If you want your own domain such as dl.yourshop.com, tell us and we will set up a CNAME on our side.",
    ],
    contact: "Integration questions go to Discord.",
  },
} as const;

export default function BrandClient({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1800);
    });
  };

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

        <span className="mt-sm inline-block rounded-full bg-brand/15 px-sm py-2xs font-inter text-label uppercase text-brand">
          {t.badge}
        </span>

        <h1 className="mt-sm font-podium text-h1 text-ink">{t.title}</h1>
        <p className="mt-xs max-w-[52rem] font-inter text-body-sm text-muted">{t.lead}</p>

        {/* ---------------------------------------------------------- Logos */}
        <section className="mt-3xl">
          <div className="flex flex-wrap items-end justify-between gap-sm">
            <div>
              <h2 className="font-inter text-h1 text-ink">{t.logosTitle}</h2>
              <p className="mt-2xs max-w-[46rem] font-inter text-body-sm text-muted">
                {t.logosLead}
              </p>
            </div>
            <a
              href="/brand/koenflow-brand-kit.zip"
              download
              className="inline-flex h-xl items-center justify-center gap-2xs rounded-lg bg-brand px-md font-inter text-button uppercase text-white transition-colors hover:bg-brand/90"
            >
              <Download className="h-4 w-4" />
              {t.downloadAll}
            </a>
          </div>

          <div className="mt-md grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-4">
            {LOGOS.map((l) => (
              <a
                key={l.file}
                href={`/brand/${l.file}`}
                download
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/25"
              >
                <span
                  className={`flex h-40 items-center justify-center px-sm ${
                    l.on === "dark" ? "bg-white/5" : "bg-white"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/brand/${l.file}`}
                    alt={l.label}
                    className={l.file.includes("lockup") ? "h-10 w-auto" : "h-24 w-auto"}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="flex items-center justify-between gap-2xs bg-white/5 px-sm py-xs font-inter text-caption uppercase text-muted transition-colors group-hover:text-ink">
                  {l.label}
                  <Download className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-sm rounded-2xl border border-white/10 bg-white/5 p-lg">
            <h3 className="font-inter text-body font-semibold text-ink">{t.rulesTitle}</h3>
            <ul className="mt-xs flex flex-col gap-2xs">
              {t.rules.map((r) => (
                <li key={r} className="flex gap-xs">
                  <Bullet />
                  <span className="font-inter text-body-sm text-muted">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------- Download button */}
        <section className="mt-3xl">
          <h2 className="font-inter text-h1 text-ink">{t.linkTitle}</h2>
          <p className="mt-2xs max-w-[52rem] font-inter text-body-sm text-muted">{t.linkLead}</p>

          <div className="mt-md overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between gap-sm border-b border-white/10 px-sm py-xs">
              <span className="font-inter text-caption uppercase text-muted">HTML</span>
              <button
                type="button"
                onClick={() => copy(SNIPPET, "snippet")}
                className="inline-flex items-center gap-3xs font-inter text-caption uppercase text-muted transition-colors hover:text-ink"
              >
                {copied === "snippet" ? (
                  <Check className="h-3.5 w-3.5 text-brand" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied === "snippet" ? t.copied : t.copy}
              </button>
            </div>
            <pre className="overflow-x-auto px-sm py-sm font-mono text-body-sm text-ink">
              {SNIPPET}
            </pre>
          </div>

          <a
            href={DOWNLOAD_URL}
            className="mt-sm inline-flex h-xl items-center justify-center gap-2xs rounded-lg border border-white/15 bg-white/5 px-md font-inter text-button uppercase text-ink transition-colors hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            {lang === "ru" ? "Проверить ссылку" : "Try the link"}
          </a>
        </section>

        {/* ------------------------------------------------------- Manifest */}
        <section className="mt-3xl">
          <h2 className="font-inter text-h1 text-ink">{t.manifestTitle}</h2>
          <p className="mt-2xs max-w-[52rem] font-inter text-body-sm text-muted">
            {t.manifestLead}
          </p>

          <div className="mt-md overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between gap-sm border-b border-white/10 px-sm py-xs">
              <span className="font-inter text-caption uppercase text-muted">GET</span>
              <button
                type="button"
                onClick={() => copy(MANIFEST_URL, "manifest")}
                className="inline-flex items-center gap-3xs font-inter text-caption uppercase text-muted transition-colors hover:text-ink"
              >
                {copied === "manifest" ? (
                  <Check className="h-3.5 w-3.5 text-brand" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied === "manifest" ? t.copied : t.copy}
              </button>
            </div>
            <pre className="overflow-x-auto px-sm py-sm font-mono text-body-sm text-ink">
              {MANIFEST_URL}
            </pre>
          </div>
          <p className="mt-xs max-w-[52rem] font-inter text-body-sm text-muted">
            {t.manifestNote}
          </p>
        </section>

        {/* ---------------------------------------------------------- Notes */}
        <section className="mt-3xl">
          <h2 className="font-inter text-h1 text-ink">{t.notesTitle}</h2>
          <div className="mt-md rounded-2xl border border-white/10 bg-white/5 p-lg">
            <ul className="flex flex-col gap-xs">
              {t.notes.map((n) => (
                <li key={n} className="flex gap-xs">
                  <Bullet />
                  <span className="font-inter text-body-sm text-muted">{n}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-sm font-inter text-body-sm text-muted">{t.contact}</p>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
