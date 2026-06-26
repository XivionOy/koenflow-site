import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmokyBackground from "../components/SmokyBackground";
import TocList from "../components/TocList";
import { getServerLang } from "../lib/i18n.server";
import { pageMetadata } from "../lib/seo";
import { type Lang } from "../lib/i18n";

const DOWNLOAD_URL = "/downloads/KoenFlowLauncher-latest.exe";
const DISCORD_URL = "https://discord.gg/FwyZdVS5Vq";

export async function generateMetadata() {
  const lang = await getServerLang();
  return pageMetadata("instructions", lang, "/instructions");
}

const SECTION_META = [
  { id: "defender", n: "01" },
  { id: "after-purchase", n: "02" },
  { id: "download", n: "03" },
  { id: "activate", n: "04" },
  { id: "game", n: "05" },
  { id: "settings", n: "06" },
  { id: "regions", n: "07" },
  { id: "support", n: "08" },
];

type SettingItem = { name: string; def: string; desc: string };

const CONTENT: Record<
  Lang,
  {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    badge: string;
    title: string;
    metaUpdated: string;
    metaRead: string;
    sidebarLabel: string;
    sidebarTitle: string;
    sidebarDesc: string;
    sidebarDownload: string;
    tocLabel: string;
    lead: string;
    important: string;
    leadCallout: string;
    defaultLabel: string;
    toc: Record<string, string>;
    head: Record<string, string>;
    s01p: string;
    s01path: string[];
    s02p: string;
    s03p: string;
    s04p: string;
    s05p: string;
    s05subRes: string;
    s05card1label: string;
    s05card1val: string;
    s05card2label: string;
    s05card2val: string;
    s05callout: string;
    s05subLang: string;
    s05langPre: string;
    s05langPost: string;
    s06p: string;
    s06subSpeed: string;
    s06subAmmo: string;
    s06subTrading: string;
    s06subLang: string;
    speed: SettingItem[];
    ammo: SettingItem[];
    trading: SettingItem[];
    language: SettingItem[];
    s07p: string;
    s07subDo: string;
    s07p2: string;
    s07steps: string[];
    s07imgAlt: string;
    s07callout: string;
    s08p: string;
    s08steps: string[];
    s08button: string;
    s08p2: string;
  }
> = {
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Инструкция",
    badge: "Инструкция",
    title: "Подготовка, запуск и настройка",
    metaUpdated: "Обновлено 24.06.2026",
    metaRead: "5 мин чтения",
    sidebarLabel: "Лаунчер",
    sidebarTitle: "Скачать KoenFlow",
    sidebarDesc: "Активируйте ключ и запускайте.",
    sidebarDownload: "Скачать",
    tocLabel: "Содержание",
    lead: "Эта инструкция проведёт вас от подготовки системы до первого запуска бота. Пройдите шаги по порядку, это займёт несколько минут.",
    important: "Важно.",
    leadCallout: "Ознакомьтесь с инструкцией полностью перед выполнением. Большинство проблем возникает из-за пропущенных шагов.",
    defaultLabel: "По умолчанию:",
    toc: {
      defender: "Отключите защиту",
      "after-purchase": "Получение ключа",
      download: "Скачивание",
      activate: "Активация ключа",
      game: "Подготовка игры",
      settings: "Настройка бота",
      regions: "Сканирование",
      support: "Поддержка",
    },
    head: {
      defender: "Отключите защиту в реальном времени",
      "after-purchase": "Действия после покупки",
      download: "Скачивание программы",
      activate: "Активация ключа",
      game: "Подготовка игры",
      settings: "Настройка бота",
      regions: "Регионы сканирования",
      support: "Поддержка",
    },
    s01p: "Перед установкой отключите защиту Windows в реальном времени. Делайте это вручную через системные настройки:",
    s01path: ["Параметры", "Обновление и безопасность", "Безопасность Windows", "Защита от вирусов и угроз", "Управление настройками", "Выключить защиту в реальном времени"],
    s02p: "После оплаты вы получите ключ активации и эту инструкцию. Ключ выглядит так:",
    s03p: "Скачайте лаунчер кнопкой «Скачать» в блоке лаунчера и после загрузки установите или запустите приложение.",
    s04p: "Вернитесь в программу и вставьте полученный ключ активации в соответствующее поле.",
    s05p: "Перед настройкой бота правильно настройте игру.",
    s05subRes: "Разрешение и режим экрана",
    s05card1label: "Монитор Full HD (1920×1080)",
    s05card1val: "1920×1080 · полноэкранный режим в окне",
    s05card2label: "Монитор выше Full HD",
    s05card2val: "1920×1080 · оконный режим",
    s05callout: "В настройках Windows установите масштаб (Display Scaling) 100%. При значениях выше 100% программа может работать некорректно.",
    s05subLang: "Язык игры",
    s05langPre: "Установите язык игры: ",
    s05langPost: ".",
    s06p: "После активации бот уже готов к работе: все настройки выставлены автоматически на оптимальные значения. Можно запускать сразу, без дополнительной конфигурации. Этот раздел для тех, кто хочет тонко настроить поведение бота. Не уверены, оставляйте значения по умолчанию.",
    s06subSpeed: "Ускорение · Speed",
    s06subAmmo: "Настройки патронов · Ammo Settings",
    s06subTrading: "Настройки торговли · Trading Settings",
    s06subLang: "Настройки языка · Language Settings",
    speed: [
      { name: "Faster auctions & shorter delays", def: "Выключено", desc: "Новая функция (ей около месяца): ускоряет цикл бота, аукционы выставляются быстрее, а паузы между действиями короче. Использовать безопасно, можно смело включать для большей скорости работы." },
    ],
    ammo: [
      { name: "Modify price before listing", def: "Включено", desc: "Перед выставлением предмета бот сверяет цены на рынке и автоматически снижает свою на 1%, чтобы обойти конкурентов и продать быстрее. Рекомендуется держать включённым: быстрее оборот." },
      { name: "Skip item if target price is not found", def: "1m", desc: "Время ожидания целевой цены продажи. Если за этот период никто не покупает по нужной цене, бот пропускает предмет, чтобы не зависать на одной позиции." },
      { name: "Ammo purchase budget limit", def: "30kk", desc: "Максимальная сумма, которую бот потратит на закупку патронов за сессию. Защита от слива всего баланса в патроны." },
      { name: "Minimum remaining balance", def: "15kk", desc: "Минимальный остаток на счёте, ниже которого бот не совершает новых покупок. Гарантия, что у вас всегда останется резерв." },
    ],
    trading: [
      { name: "Modify price before listing", def: "Включено", desc: "Та же логика, что и в патронах: автоматическое снижение цены на 1% для ускорения продажи. Полезно, чтобы предметы не зависали в листингах." },
      { name: "Skip item if no good price is found after", def: "1m", desc: "Время ожидания подходящего предложения. По истечении срока бот пропускает предмет." },
      { name: "List an item at any price if the desired price is not found", def: "1m", desc: "Если за время ожидания нужная цена не появилась, бот выставит предмет по любой рыночной цене, лишь бы не держать его впустую. Включайте, если важнее обернуть товар, чем выжать максимум." },
    ],
    language: [
      { name: "Language", def: "English", desc: "Переключение интерфейса между English и Russian. Меняется на лету, перезапуск не требуется." },
    ],
    s07p: "Регионы сканирования, это области экрана, которые бот считывает в реальном времени: ваш инвентарь, цены на рынке и количество патронов. Настраивать их вручную не нужно, всё определяется автоматически. Единственное, что требуется от вас, добавить нужные патроны в избранное, чтобы бот видел их в инвентаре.",
    s07subDo: "Что нужно сделать",
    s07p2: "Выполните один разовый шаг, чтобы бот видел в инвентаре только нужные позиции:",
    s07steps: ["Откройте инвентарь в игре.", "Добавьте в избранное все патроны, которыми планируете торговать.", "Уберите из избранного все ненужные предметы."],
    s07imgAlt: "Избранное со всеми патронами",
    s07callout: "Для оптимальной торговли советуем добавить в избранное все патроны: так бот охватит максимум выгодных сделок.",
    s08p: "Если возникли проблемы, обращайтесь в поддержку через Discord.",
    s08steps: ["Перейдите на наш Discord-сервер.", "Найдите раздел поддержки.", "Создайте тикет или напишите сообщение.", "Опишите проблему как можно подробнее."],
    s08button: "Перейти в Discord",
    s08p2: "Наша команда постарается помочь в кратчайшие сроки.",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Guide",
    badge: "Guide",
    title: "Setup, launch and configuration",
    metaUpdated: "Updated 24.06.2026",
    metaRead: "5 min read",
    sidebarLabel: "Launcher",
    sidebarTitle: "Download KoenFlow",
    sidebarDesc: "Activate the key and launch.",
    sidebarDownload: "Download",
    tocLabel: "Contents",
    lead: "This guide takes you from preparing your system to the bot’s first launch. Follow the steps in order, it takes a few minutes.",
    important: "Important.",
    leadCallout: "Read the whole guide before you start. Most issues come from skipped steps.",
    defaultLabel: "Default:",
    toc: {
      defender: "Disable protection",
      "after-purchase": "Getting the key",
      download: "Download",
      activate: "Key activation",
      game: "Game setup",
      settings: "Bot settings",
      regions: "Scanning",
      support: "Support",
    },
    head: {
      defender: "Disable real-time protection",
      "after-purchase": "After purchase",
      download: "Downloading the program",
      activate: "Key activation",
      game: "Game setup",
      settings: "Bot settings",
      regions: "Scan regions",
      support: "Support",
    },
    s01p: "Before installing, turn off Windows real-time protection. Do it manually through the system settings:",
    s01path: ["Settings", "Update & Security", "Windows Security", "Virus & threat protection", "Manage settings", "Turn off real-time protection"],
    s02p: "After payment you’ll receive an activation key and this guide. The key looks like this:",
    s03p: "Download the launcher with the “Download” button in the launcher block, then install or run the app once it finishes downloading.",
    s04p: "Go back to the program and paste the activation key you received into the corresponding field.",
    s05p: "Before configuring the bot, set the game up correctly.",
    s05subRes: "Resolution and screen mode",
    s05card1label: "Full HD monitor (1920×1080)",
    s05card1val: "1920×1080 · fullscreen windowed",
    s05card2label: "Monitor above Full HD",
    s05card2val: "1920×1080 · windowed",
    s05callout: "In Windows settings, set Display Scaling to 100%. Above 100% the program may work incorrectly.",
    s05subLang: "Game language",
    s05langPre: "Set the game language to ",
    s05langPost: ".",
    s06p: "After activation the bot is ready to go: all settings are already at their optimal values. You can launch right away, with no extra configuration. This section is for those who want to fine-tune the bot’s behavior. If unsure, leave the defaults.",
    s06subSpeed: "Acceleration · Speed",
    s06subAmmo: "Ammo Settings",
    s06subTrading: "Trading Settings",
    s06subLang: "Language Settings",
    speed: [
      { name: "Faster auctions & shorter delays", def: "Off", desc: "A new feature (about a month old): speeds up the bot’s cycle, auctions are listed faster and pauses between actions are shorter. Safe to use, feel free to enable it for more speed." },
    ],
    ammo: [
      { name: "Modify price before listing", def: "On", desc: "Before listing an item, the bot checks market prices and automatically lowers its own by 1% to undercut competitors and sell faster. Recommended to keep on: faster turnover." },
      { name: "Skip item if target price is not found", def: "1m", desc: "How long to wait for the target sell price. If no one buys at the desired price within this time, the bot skips the item so it doesn’t get stuck on one position." },
      { name: "Ammo purchase budget limit", def: "30kk", desc: "The maximum the bot will spend on buying ammo per session. Protects you from dumping your whole balance into ammo." },
      { name: "Minimum remaining balance", def: "15kk", desc: "The minimum account balance below which the bot makes no new purchases. Guarantees you always keep a reserve." },
    ],
    trading: [
      { name: "Modify price before listing", def: "On", desc: "Same logic as ammo: an automatic 1% price cut to speed up the sale. Useful so items don’t get stuck in listings." },
      { name: "Skip item if no good price is found after", def: "1m", desc: "How long to wait for a suitable offer. After it expires, the bot skips the item." },
      { name: "List an item at any price if the desired price is not found", def: "1m", desc: "If the desired price doesn’t appear within the wait time, the bot lists the item at any market price rather than holding it idle. Enable it if turning over goods matters more than squeezing out the maximum." },
    ],
    language: [
      { name: "Language", def: "English", desc: "Switches the interface between English and Russian. Changes on the fly, no restart required." },
    ],
    s07p: "Scan regions are the areas of the screen the bot reads in real time: your inventory, market prices and ammo counts. You don’t need to set them manually, everything is detected automatically. The only thing required from you is to add the needed ammo to favorites so the bot sees it in the inventory.",
    s07subDo: "What you need to do",
    s07p2: "Do one one-time step so the bot sees only the items you need in the inventory:",
    s07steps: ["Open the inventory in the game.", "Add to favorites all the ammo you plan to trade.", "Remove all unnecessary items from favorites."],
    s07imgAlt: "Favorites with all ammo",
    s07callout: "For optimal trading we recommend adding all ammo to favorites: that way the bot covers the most profitable deals.",
    s08p: "If you run into problems, contact support via Discord.",
    s08steps: ["Go to our Discord server.", "Find the support section.", "Create a ticket or write a message.", "Describe your problem in as much detail as possible."],
    s08button: "Open Discord",
    s08p2: "Our team will try to help as soon as possible.",
  },
};

function SectionTitle({ id, n, title }: { id: string; n: string; title: string }) {
  return (
    <h2 id={id} className="scroll-mt-5xl font-inter text-h3 text-ink">
      <span className="mr-xs text-brand">{n}</span>
      {title}
    </h2>
  );
}

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-md rounded-lg border-l-2 border-brand bg-brand/5 px-sm py-sm">
      <p className="font-inter text-body-sm text-ink/90">
        <span className="font-bold text-brand">{label} </span>
        {children}
      </p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 rounded-full bg-brand/15 px-xs py-3xs font-inter text-caption uppercase text-brand">
      {children}
    </span>
  );
}

function Setting({
  name,
  def,
  desc,
  defaultLabel,
}: {
  name: string;
  def: string;
  desc: string;
  defaultLabel: string;
}) {
  return (
    <div className="border-l-2 border-white/10 pl-sm">
      <div className="flex flex-wrap items-center gap-xs">
        <span className="font-inter text-body font-semibold text-ink">{name}</span>
        <Pill>{defaultLabel} {def}</Pill>
      </div>
      <p className="mt-2xs font-inter text-body-sm text-muted">{desc}</p>
    </div>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return <li className="font-inter text-body text-muted">{children}</li>;
}

export default async function InstructionsPage() {
  const lang = await getServerLang();
  const c = CONTENT[lang];
  const sections = SECTION_META.map((m) => ({ ...m, title: c.toc[m.id] }));

  return (
    <div className="relative min-h-screen text-ink">
      <SmokyBackground />
      <Navbar lang={lang} />

      <article className="relative z-10 container-page px-sm py-3xl sm:px-lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2xs font-inter text-label uppercase text-muted">
          <a href="/" className="transition-colors hover:text-ink">
            {c.breadcrumbHome}
          </a>
          <span className="text-white/25">/</span>
          <span className="text-brand">{c.breadcrumbCurrent}</span>
        </nav>

        {/* Badge */}
        <span className="mt-sm inline-block rounded-full bg-brand/15 px-sm py-2xs font-inter text-label uppercase text-brand">
          {c.badge}
        </span>

        {/* Title */}
        <h1 className="mt-sm font-inter text-h1 text-ink">{c.title}</h1>

        {/* Meta */}
        <div className="mt-xs flex flex-wrap items-center gap-2xs font-inter text-label uppercase text-muted">
          <span>KoenFlow</span>
          <span className="text-white/25">·</span>
          <span>{c.metaUpdated}</span>
          <span className="text-white/25">·</span>
          <span>{c.metaRead}</span>
        </div>

        {/* Hero image */}
        <div className="mt-lg overflow-hidden rounded-2xl border border-white/10">
          <img src="/instructions-hero.webp" alt="KoenFlow" decoding="async" className="block w-full" />
        </div>

        {/* Body */}
        <div className="mt-3xl flex flex-col gap-lg lg:flex-row lg:gap-3xl">
          {/* Sidebar */}
          <aside className="flex flex-col gap-md lg:sticky lg:top-[136px] lg:w-72 lg:shrink-0 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-sm">
              <span className="font-inter text-label uppercase text-muted">
                {c.sidebarLabel}
              </span>
              <h3 className="mt-2xs font-inter text-h4 text-ink">{c.sidebarTitle}</h3>
              <p className="mt-2xs font-inter text-body-sm text-muted">
                {c.sidebarDesc}
              </p>
              <div className="mt-sm flex items-center gap-2xs font-inter text-label uppercase text-muted">
                <span>V5.1.5</span>
                <span className="text-white/25">·</span>
                <span>24 MB</span>
                <span className="text-white/25">·</span>
                <svg viewBox="0 0 448 512" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                  <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
                </svg>
              </div>
              <a
                href={DOWNLOAD_URL}
                className="mt-sm inline-flex h-lg w-full items-center justify-center rounded-lg bg-white px-sm font-inter text-button uppercase text-black transition-colors hover:bg-white/90"
              >
                {c.sidebarDownload}
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-sm">
              <span className="font-inter text-label uppercase text-muted">
                {c.tocLabel}
              </span>
              <TocList sections={sections} />
            </div>
          </aside>

          {/* Content */}
          <div className="col-content flex-1">
            {/* Lead + warning */}
            <p className="font-inter text-lead text-ink/80">{c.lead}</p>
            <Callout label={c.important}>{c.leadCallout}</Callout>

            {/* 01 */}
            <section className="mt-3xl">
              <SectionTitle id="defender" n="01" title={c.head["defender"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s01p}</p>
              <div className="mt-sm rounded-lg bg-white/5 p-sm font-inter text-body-sm text-muted">
                {c.s01path.map((step, i) => (
                  <span key={i}>
                    {i > 0 && <span className="text-brand"> → </span>}
                    {i === c.s01path.length - 1 ? (
                      <span className="text-ink">{step}</span>
                    ) : (
                      step
                    )}
                  </span>
                ))}
              </div>
            </section>

            {/* 02 */}
            <section className="mt-3xl">
              <SectionTitle id="after-purchase" n="02" title={c.head["after-purchase"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s02p}</p>
              <code className="mt-sm inline-block rounded-md border border-white/10 bg-white/5 px-sm py-2xs font-mono text-body tracking-widest text-ink">
                YC21-EPBM-FOAD-I82D
              </code>
            </section>

            {/* 03 */}
            <section className="mt-3xl">
              <SectionTitle id="download" n="03" title={c.head["download"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s03p}</p>
            </section>

            {/* 04 */}
            <section className="mt-3xl">
              <SectionTitle id="activate" n="04" title={c.head["activate"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s04p}</p>
            </section>

            {/* 05 */}
            <section className="mt-3xl">
              <SectionTitle id="game" n="05" title={c.head["game"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s05p}</p>

              <h3 className="mt-md font-inter text-h4 text-ink">{c.s05subRes}</h3>
              <div className="mt-sm flex flex-col gap-sm sm:flex-row">
                <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-sm">
                  <p className="font-inter text-body-sm text-muted">{c.s05card1label}</p>
                  <p className="mt-2xs font-inter text-body font-bold text-ink">
                    {c.s05card1val}
                  </p>
                </div>
                <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-sm">
                  <p className="font-inter text-body-sm text-muted">{c.s05card2label}</p>
                  <p className="mt-2xs font-inter text-body font-bold text-ink">
                    {c.s05card2val}
                  </p>
                </div>
              </div>
              <Callout label={c.important}>{c.s05callout}</Callout>

              <h3 className="mt-md font-inter text-h4 text-ink">{c.s05subLang}</h3>
              <p className="mt-sm font-inter text-body text-muted">
                {c.s05langPre}
                <span className="text-ink">English</span>
                {c.s05langPost}
              </p>
            </section>

            {/* 06 */}
            <section className="mt-3xl">
              <SectionTitle id="settings" n="06" title={c.head["settings"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s06p}</p>

              <div>
                <h3 className="mt-md font-inter text-h4 text-ink">{c.s06subSpeed}</h3>
                <div className="mt-sm flex flex-col gap-sm">
                  {c.speed.map((s) => (
                    <Setting key={s.name} {...s} defaultLabel={c.defaultLabel} />
                  ))}
                </div>

                <h3 className="mt-lg font-inter text-h4 text-ink">{c.s06subAmmo}</h3>
                <div className="mt-sm flex flex-col gap-sm">
                  {c.ammo.map((s) => (
                    <Setting key={s.name} {...s} defaultLabel={c.defaultLabel} />
                  ))}
                </div>

                <h3 className="mt-lg font-inter text-h4 text-ink">{c.s06subTrading}</h3>
                <div className="mt-sm flex flex-col gap-sm">
                  {c.trading.map((s) => (
                    <Setting key={s.name} {...s} defaultLabel={c.defaultLabel} />
                  ))}
                </div>

                <h3 className="mt-lg font-inter text-h4 text-ink">{c.s06subLang}</h3>
                <div className="mt-sm flex flex-col gap-sm">
                  {c.language.map((s) => (
                    <Setting key={s.name} {...s} defaultLabel={c.defaultLabel} />
                  ))}
                </div>
              </div>
            </section>

            {/* 07 */}
            <section className="mt-3xl">
              <SectionTitle id="regions" n="07" title={c.head["regions"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s07p}</p>

              <h3 className="mt-md font-inter text-h4 text-ink">{c.s07subDo}</h3>
              <p className="mt-sm font-inter text-body text-muted">{c.s07p2}</p>
              <ul className="mt-sm flex list-disc flex-col gap-2xs pl-md marker:text-brand">
                {c.s07steps.map((step, i) => (
                  <Step key={i}>{step}</Step>
                ))}
              </ul>
              <div className="mt-md overflow-hidden rounded-2xl border border-white/10">
                <img src="/instructions-favorites.webp" alt={c.s07imgAlt} loading="lazy" decoding="async" className="block w-full" />
              </div>
              <Callout label={c.important}>{c.s07callout}</Callout>
            </section>

            {/* 08 */}
            <section className="mt-3xl">
              <SectionTitle id="support" n="08" title={c.head["support"]} />
              <p className="mt-sm font-inter text-body text-muted">{c.s08p}</p>
              <ul className="mt-sm flex list-decimal flex-col gap-2xs pl-md marker:text-brand marker:font-bold">
                {c.s08steps.map((step, i) => (
                  <Step key={i}>{step}</Step>
                ))}
              </ul>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-md inline-flex h-lg items-center justify-center rounded-lg border border-white/20 bg-white/5 px-md font-inter text-button uppercase text-white transition-colors hover:bg-white/10"
              >
                {c.s08button}
              </a>
              <p className="mt-sm font-inter text-body-sm text-muted">{c.s08p2}</p>
            </section>
          </div>
        </div>
      </article>
      <Footer lang={lang} />
    </div>
  );
}
