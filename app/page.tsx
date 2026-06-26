import { Crown } from "lucide-react";
import Navbar from "./components/Navbar";
import { getServerLang } from "./lib/i18n.server";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4";

const DOWNLOAD_URL = "/downloads/KoenFlowLauncher-latest.exe";
const DISCORD_URL = "https://discord.gg/FwyZdVS5Vq";

const CONTENT = {
  ru: {
    tagline: "Полная автоматизация.",
    h1: ["Скачать", "Лаунчер"],
    leadPre: "Мы делаем то, чего не смогли другие. Наша цель, ",
    leadStrong: "полная автоматизация.",
    download: "Скачать лаунчер",
    discord: "Наш Discord",
  },
  en: {
    tagline: "Full Automation, By Design.",
    h1: ["Download", "Launcher"],
    leadPre: "We’re building what others couldn’t, our goal is ",
    leadStrong: "full automation.",
    download: "Download Launcher",
    discord: "Join Discord",
  },
} as const;

export default async function Page() {
  const lang = await getServerLang();
  const c = CONTENT[lang];

  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* Legibility overlay (left-darkened so the left-aligned copy stays readable) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

      <Navbar lang={lang} />

      {/* ---- Hero ---- */}
      <section className="relative z-10 flex flex-1 items-center">
        <div className="container-page px-sm sm:px-lg">
          <div className="col-content">
            {/* Tagline */}
            <div className="animate-fade-up mb-sm flex items-center gap-xs lg:mb-md">
              <Crown className="h-4 w-4 text-white/70" />
              <span className="font-inter text-overline uppercase text-white/70">
                {c.tagline}
              </span>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-up-delay-1 font-podium text-hero uppercase text-white">
              <span className="block">{c.h1[0]}</span>
              <span className="block">{c.h1[1]}</span>
            </h1>

            {/* Subtext */}
            <p className="animate-fade-up-delay-2 col-measure mt-sm font-inter text-lead text-white/70 lg:mt-md">
              {c.leadPre}
              <span className="font-bold text-white">{c.leadStrong}</span>
            </p>

            {/* CTA row */}
            <div className="animate-fade-up-delay-3 mt-md flex flex-wrap items-center gap-xs sm:gap-sm lg:mt-lg">
              <a
                href={DOWNLOAD_URL}
                className="group inline-flex h-xl items-center justify-center gap-xs rounded-lg bg-black px-sm font-inter text-button uppercase text-white transition-colors hover:bg-neutral-900 sm:px-md"
              >
                {c.download}
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-xl items-center justify-center gap-xs rounded-lg border border-white/20 bg-white/5 px-sm font-inter text-button uppercase text-white transition-colors hover:bg-white/10 sm:px-md"
              >
                {c.discord}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
