import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerLang } from "./lib/i18n.server";
import { SEO, SITE_URL } from "./lib/seo";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter-src",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  const c = SEO.home[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.title, template: "%s · KoenFlow" },
    description: c.description,
    applicationName: "KoenFlow",
    keywords:
      lang === "ru"
        ? ["KoenFlow", "Arena Breakout бот", "торговый бот", "маркет бот", "Arena Breakout Infinite", "автоторговля"]
        : ["KoenFlow", "Arena Breakout bot", "trading bot", "market bot", "Arena Breakout Infinite", "auto trading"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "KoenFlow",
      title: c.title,
      description: c.description,
      url: SITE_URL,
      locale: lang === "ru" ? "ru_RU" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getServerLang();
  return (
    <html lang={lang} className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://db.onlinewebfonts.com" />
        <link
          href="https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
