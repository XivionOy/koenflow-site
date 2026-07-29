import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmokyBackground from "../components/SmokyBackground";
import TocList from "../components/TocList";
import { getServerLang } from "../lib/i18n.server";
import { pageMetadata } from "../lib/seo";
import { type Lang } from "../lib/i18n";
import { PRODUCTS, resolveProduct } from "./products";

const DISCORD_URL = "https://discord.gg/FwyZdVS5Vq";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const lang = await getServerLang();
  const product = resolveProduct((await searchParams).p);
  const path = product === "trading" ? "/instructions" : `/instructions?p=${product}`;
  const base = pageMetadata("instructions", lang, path);
  // Заголовок вкладки несёт имя продукта, чтобы две инструкции не сливались в
  // выдаче и в истории браузера.
  return { ...base, title: `${PRODUCTS[product].short[lang]} · ${base.title}` };
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

type GuideCopy = {
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
    // Трейд-специфичные блоки. У ESP свои, поэтому по умолчанию скрыты и
    // раздел показывает только вводный абзац, пока не придёт текст.
    showResolutionCards: boolean;
    showFavoritesImage: boolean;
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
};

const TRADING_GUIDE: Record<Lang, GuideCopy> = {
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
    showResolutionCards: true,
    showFavoritesImage: true,
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
    showResolutionCards: true,
    showFavoritesImage: true,
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

// ── ESP guide ───────────────────────────────────────────────────────────────
// У ESP свой набор разделов (защита/подделка/изоляция ядра/Hyper-V), поэтому
// контент блочный, а не по фиксированной трейд-схеме.
type Block =
  | { t: "p"; text: string }
  | { t: "path"; steps: string[] }
  | { t: "callout"; text: string }
  | { t: "code"; text: string }
  | { t: "steps"; items: string[] }
  | { t: "discord"; button: string; note: string };

type EspSection = { id: string; n: string; toc: string; head: string; blocks: Block[] };

type EspCopy = {
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
  sections: EspSection[];
};

const KEY_SAMPLE = "YC21-EPBM-FOAD-I82D";

const ESP_GUIDE: Record<Lang, EspCopy> = {
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Инструкция",
    badge: "Инструкция",
    title: "Подготовка, запуск и настройка",
    metaUpdated: "Обновлено 24.06.2026",
    metaRead: "4 мин чтения",
    sidebarLabel: "Лаунчер",
    sidebarTitle: "Скачать KoenFlow",
    sidebarDesc: "Активируйте ключ и запускайте.",
    sidebarDownload: "Скачать",
    tocLabel: "Содержание",
    lead: "ESP требует подготовки Windows: нужно снять несколько защит, которые иначе блокируют запуск или дают синий экран. Пройдите шаги по порядку.",
    important: "Важно.",
    leadCallout: "Ознакомьтесь с инструкцией полностью перед выполнением. Большинство проблем возникает из-за пропущенных шагов.",
    sections: [
      {
        id: "defender", n: "01", toc: "Защита в реальном времени", head: "Отключите защиту в реальном времени",
        blocks: [
          { t: "p", text: "Перед установкой отключите защиту Windows в реальном времени. Делайте это вручную через системные настройки:" },
          { t: "path", steps: ["Параметры", "Обновление и безопасность", "Безопасность Windows", "Защита от вирусов и угроз", "Управление настройками", "Выключить защиту в реальном времени"] },
        ],
      },
      {
        id: "tamper", n: "02", toc: "Защита от подделки", head: "Отключите защиту от подделки",
        blocks: [
          { t: "p", text: "Там же, в разделе «Защита от вирусов и угроз», отключите «Защиту от подделки» (Tamper Protection). Иначе Windows включит защиту обратно автоматически." },
          { t: "path", steps: ["Безопасность Windows", "Защита от вирусов и угроз", "Управление настройками", "Защита от подделки — Выкл"] },
        ],
      },
      {
        id: "core", n: "03", toc: "Изоляция ядра", head: "Отключите изоляцию ядра",
        blocks: [
          { t: "p", text: "Отключите «Целостность памяти» в изоляции ядра, затем перезагрузите компьютер." },
          { t: "path", steps: ["Безопасность Windows", "Безопасность устройства", "Изоляция ядра", "Целостность памяти — Выкл"] },
          { t: "callout", text: "После отключения обязательно перезагрузите ПК." },
          { t: "callout", text: "Если установлен античит FACEIT, ESP может не запуститься вместе с ним." },
        ],
      },
      {
        id: "hyperv", n: "04", toc: "Hyper-V (Intel · 25H2)", head: "Intel и Windows 25H2: отключите Hyper-V",
        blocks: [
          { t: "p", text: "Владельцам процессоров Intel на Windows 25H2 нужно дополнительно отключить Hyper-V в компонентах Windows, иначе возможен синий экран (BSOD)." },
          { t: "path", steps: ["Панель управления", "Программы", "Включение или отключение компонентов Windows", "Снять галочку Hyper-V", "ОК и перезагрузка"] },
          { t: "callout", text: "Если синие экраны (BSOD) продолжаются, отключите виртуализацию и в BIOS: Intel VT-d / Virtualization Technology." },
        ],
      },
      {
        id: "after-purchase", n: "05", toc: "Получение ключа", head: "Действия после покупки",
        blocks: [
          { t: "p", text: "После оплаты вы получите ключ активации и эту инструкцию. Ключ выглядит так:" },
          { t: "code", text: KEY_SAMPLE },
        ],
      },
      {
        id: "download", n: "06", toc: "Скачивание", head: "Скачивание программы",
        blocks: [
          { t: "p", text: "Скачайте лаунчер кнопкой «Скачать» в блоке лаунчера и после загрузки установите или запустите приложение." },
        ],
      },
      {
        id: "activate", n: "07", toc: "Активация ключа", head: "Активация ключа",
        blocks: [
          { t: "p", text: "Вернитесь в программу и вставьте полученный ключ активации в соответствующее поле." },
        ],
      },
      {
        id: "support", n: "08", toc: "Поддержка", head: "Поддержка",
        blocks: [
          { t: "p", text: "Если возникли проблемы, обращайтесь в поддержку через Discord." },
          { t: "steps", items: ["Перейдите на наш Discord-сервер.", "Найдите раздел поддержки.", "Создайте тикет или напишите сообщение.", "Опишите проблему как можно подробнее."] },
          { t: "discord", button: "Перейти в Discord", note: "Наша команда постарается помочь в кратчайшие сроки." },
        ],
      },
    ],
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Guide",
    badge: "Guide",
    title: "Setup, launch and configuration",
    metaUpdated: "Updated 24.06.2026",
    metaRead: "4 min read",
    sidebarLabel: "Launcher",
    sidebarTitle: "Download KoenFlow",
    sidebarDesc: "Activate the key and launch.",
    sidebarDownload: "Download",
    tocLabel: "Contents",
    lead: "ESP needs a bit of Windows prep: several protections have to be turned off, otherwise it won’t launch or you’ll get a blue screen. Follow the steps in order.",
    important: "Important.",
    leadCallout: "Read the whole guide before you start. Most issues come from skipped steps.",
    sections: [
      {
        id: "defender", n: "01", toc: "Real-time protection", head: "Disable real-time protection",
        blocks: [
          { t: "p", text: "Before installing, turn off Windows real-time protection. Do it manually through the system settings:" },
          { t: "path", steps: ["Settings", "Update & Security", "Windows Security", "Virus & threat protection", "Manage settings", "Turn off real-time protection"] },
        ],
      },
      {
        id: "tamper", n: "02", toc: "Tamper protection", head: "Disable tamper protection",
        blocks: [
          { t: "p", text: "In the same “Virus & threat protection” section, turn off Tamper Protection. Otherwise Windows will re-enable the defenses automatically." },
          { t: "path", steps: ["Windows Security", "Virus & threat protection", "Manage settings", "Tamper Protection — Off"] },
        ],
      },
      {
        id: "core", n: "03", toc: "Core isolation", head: "Disable core isolation",
        blocks: [
          { t: "p", text: "Turn off Memory Integrity under Core Isolation, then restart the computer." },
          { t: "path", steps: ["Windows Security", "Device security", "Core isolation", "Memory integrity — Off"] },
          { t: "callout", text: "Restart the PC after turning it off." },
          { t: "callout", text: "If the FACEIT anti-cheat is installed, ESP may not launch while it’s running." },
        ],
      },
      {
        id: "hyperv", n: "04", toc: "Hyper-V (Intel · 25H2)", head: "Intel and Windows 25H2: disable Hyper-V",
        blocks: [
          { t: "p", text: "On Intel CPUs with Windows 25H2 you also need to disable Hyper-V in Windows features, otherwise you may hit a blue screen (BSOD)." },
          { t: "path", steps: ["Control Panel", "Programs", "Turn Windows features on or off", "Uncheck Hyper-V", "OK and restart"] },
          { t: "callout", text: "If blue screens (BSOD) continue, disable virtualization in the BIOS too: Intel VT-d / Virtualization Technology." },
        ],
      },
      {
        id: "after-purchase", n: "05", toc: "Getting the key", head: "After purchase",
        blocks: [
          { t: "p", text: "After payment you’ll receive an activation key and this guide. The key looks like this:" },
          { t: "code", text: KEY_SAMPLE },
        ],
      },
      {
        id: "download", n: "06", toc: "Download", head: "Downloading the program",
        blocks: [
          { t: "p", text: "Download the launcher with the “Download” button in the launcher block, then install or run the app once it finishes downloading." },
        ],
      },
      {
        id: "activate", n: "07", toc: "Key activation", head: "Key activation",
        blocks: [
          { t: "p", text: "Go back to the program and paste the activation key you received into the corresponding field." },
        ],
      },
      {
        id: "support", n: "08", toc: "Support", head: "Support",
        blocks: [
          { t: "p", text: "If you run into problems, contact support via Discord." },
          { t: "steps", items: ["Go to our Discord server.", "Find the support section.", "Create a ticket or write a message.", "Describe your problem in as much detail as possible."] },
          { t: "discord", button: "Open Discord", note: "Our team will try to help as soon as possible." },
        ],
      },
    ],
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

// Рендер блочного контента ESP-инструкции. Те же примитивы, что у трейда
// (path-чипы, Callout, Step, code), поэтому вид разделов совпадает.
function EspBody({
  sections,
  important,
  discordUrl,
}: {
  sections: EspSection[];
  important: string;
  discordUrl: string;
}) {
  return (
    <>
      {sections.map((sec) => (
        <section key={sec.id} className="mt-3xl">
          <SectionTitle id={sec.id} n={sec.n} title={sec.head} />
          {sec.blocks.map((b, i) => {
            if (b.t === "p")
              return (
                <p key={i} className="mt-sm font-inter text-body text-muted">
                  {b.text}
                </p>
              );
            if (b.t === "path")
              return (
                <div key={i} className="mt-sm rounded-lg bg-white/5 p-sm font-inter text-body-sm text-muted">
                  {b.steps.map((step, j) => (
                    <span key={j}>
                      {j > 0 && <span className="text-brand"> → </span>}
                      {j === b.steps.length - 1 ? <span className="text-ink">{step}</span> : step}
                    </span>
                  ))}
                </div>
              );
            if (b.t === "callout")
              return (
                <Callout key={i} label={important}>
                  {b.text}
                </Callout>
              );
            if (b.t === "code")
              return (
                <code
                  key={i}
                  className="mt-sm inline-block rounded-md border border-white/10 bg-white/5 px-sm py-2xs font-mono text-body tracking-widest text-ink"
                >
                  {b.text}
                </code>
              );
            if (b.t === "steps")
              return (
                <ul key={i} className="mt-sm flex list-decimal flex-col gap-2xs pl-md marker:text-brand marker:font-bold">
                  {b.items.map((step, j) => (
                    <Step key={j}>{step}</Step>
                  ))}
                </ul>
              );
            // discord
            return (
              <div key={i}>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-md inline-flex h-lg items-center justify-center rounded-lg border border-white/20 bg-white/5 px-md font-inter text-button uppercase text-white transition-colors hover:bg-white/10"
                >
                  {b.button}
                </a>
                <p className="mt-sm font-inter text-body-sm text-muted">{b.note}</p>
              </div>
            );
          })}
        </section>
      ))}
    </>
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

export default async function InstructionsPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const lang = await getServerLang();
  const product = resolveProduct((await searchParams).p);
  const meta = PRODUCTS[product];
  const isEsp = product === "esp";
  // Общая «обёртка» страницы (хлебные крошки, бейдж, заголовок, сайдбар, TOC)
  // одинакова у обоих продуктов — берём поля из выбранного гайда структурно.
  const tc = TRADING_GUIDE[lang];
  const ec = ESP_GUIDE[lang];
  const chrome = isEsp ? ec : tc;
  const sections = isEsp
    ? ec.sections.map((s) => ({ id: s.id, n: s.n, title: s.toc }))
    : SECTION_META.map((m) => ({ ...m, title: tc.toc[m.id] }));

  return (
    <div className="relative min-h-screen text-ink">
      <SmokyBackground />
      <Navbar lang={lang} />

      <article className="relative z-10 container-page px-sm py-3xl sm:px-lg">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2xs font-inter text-label uppercase text-muted">
          <a href="/" className="transition-colors hover:text-ink">
            {chrome.breadcrumbHome}
          </a>
          <span className="text-white/25">/</span>
          <span className="text-brand">{chrome.breadcrumbCurrent}</span>
        </nav>

        {/* Badge */}
        <span className="mt-sm inline-block rounded-full bg-brand/15 px-sm py-2xs font-inter text-label uppercase text-brand">
          {chrome.badge}
        </span>

        {/* Title */}
        <h1 className="mt-sm font-inter text-h1 text-ink">{chrome.title}</h1>

        {/* Meta */}
        <div className="mt-xs flex flex-wrap items-center gap-2xs font-inter text-label uppercase text-muted">
          <span>{meta.label[lang]}</span>
          <span className="text-white/25">·</span>
          <span>{chrome.metaUpdated}</span>
          <span className="text-white/25">·</span>
          <span>{chrome.metaRead}</span>
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
                {chrome.sidebarLabel}
              </span>
              <h3 className="mt-2xs font-inter text-h4 text-ink">{chrome.sidebarTitle}</h3>
              <p className="mt-2xs font-inter text-body-sm text-muted">
                {chrome.sidebarDesc}
              </p>
              <div className="mt-sm flex items-center gap-2xs font-inter text-label uppercase text-muted">
                <span>{meta.download.version}</span>
                <span className="text-white/25">·</span>
                <span>{meta.download.sizeMb} MB</span>
                <span className="text-white/25">·</span>
                <svg viewBox="0 0 448 512" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                  <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
                </svg>
              </div>
              <a
                href={meta.download.url}
                className="mt-sm inline-flex h-lg w-full items-center justify-center rounded-lg bg-white px-sm font-inter text-button uppercase text-black transition-colors hover:bg-white/90"
              >
                {chrome.sidebarDownload}
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-sm">
              <span className="font-inter text-label uppercase text-muted">
                {chrome.tocLabel}
              </span>
              <TocList sections={sections} />
            </div>
          </aside>

          {/* Content */}
          <div className="col-content flex-1">
            {/* Lead + warning */}
            <p className="font-inter text-lead text-ink/80">{chrome.lead}</p>
            <Callout label={chrome.important}>{chrome.leadCallout}</Callout>

            {isEsp && (
              <EspBody sections={ec.sections} important={chrome.important} discordUrl={DISCORD_URL} />
            )}

            {!isEsp && (<>
            {/* 01 */}
            <section className="mt-3xl">
              <SectionTitle id="defender" n="01" title={tc.head["defender"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s01p}</p>
              <div className="mt-sm rounded-lg bg-white/5 p-sm font-inter text-body-sm text-muted">
                {tc.s01path.map((step, i) => (
                  <span key={i}>
                    {i > 0 && <span className="text-brand"> → </span>}
                    {i === tc.s01path.length - 1 ? (
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
              <SectionTitle id="after-purchase" n="02" title={tc.head["after-purchase"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s02p}</p>
              <code className="mt-sm inline-block rounded-md border border-white/10 bg-white/5 px-sm py-2xs font-mono text-body tracking-widest text-ink">
                YC21-EPBM-FOAD-I82D
              </code>
            </section>

            {/* 03 */}
            <section className="mt-3xl">
              <SectionTitle id="download" n="03" title={tc.head["download"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s03p}</p>
            </section>

            {/* 04 */}
            <section className="mt-3xl">
              <SectionTitle id="activate" n="04" title={tc.head["activate"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s04p}</p>
            </section>

            {/* 05 */}
            <section className="mt-3xl">
              <SectionTitle id="game" n="05" title={tc.head["game"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s05p}</p>

              {tc.showResolutionCards && (
                <>
                  <h3 className="mt-md font-inter text-h4 text-ink">{tc.s05subRes}</h3>
                  <div className="mt-sm flex flex-col gap-sm sm:flex-row">
                    <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-sm">
                      <p className="font-inter text-body-sm text-muted">{tc.s05card1label}</p>
                      <p className="mt-2xs font-inter text-body font-bold text-ink">
                        {tc.s05card1val}
                      </p>
                    </div>
                    <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-sm">
                      <p className="font-inter text-body-sm text-muted">{tc.s05card2label}</p>
                      <p className="mt-2xs font-inter text-body font-bold text-ink">
                        {tc.s05card2val}
                      </p>
                    </div>
                  </div>
                  <Callout label={chrome.important}>{tc.s05callout}</Callout>

                  <h3 className="mt-md font-inter text-h4 text-ink">{tc.s05subLang}</h3>
                  <p className="mt-sm font-inter text-body text-muted">
                    {tc.s05langPre}
                    <span className="text-ink">English</span>
                    {tc.s05langPost}
                  </p>
                </>
              )}
            </section>

            {/* 06 */}
            <section className="mt-3xl">
              <SectionTitle id="settings" n="06" title={tc.head["settings"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s06p}</p>

              <div>
                {[
                  { h: tc.s06subSpeed, items: tc.speed, mt: "mt-md" },
                  { h: tc.s06subAmmo, items: tc.ammo, mt: "mt-lg" },
                  { h: tc.s06subTrading, items: tc.trading, mt: "mt-lg" },
                  { h: tc.s06subLang, items: tc.language, mt: "mt-lg" },
                ]
                  .filter((g) => g.items.length > 0)
                  .map((g) => (
                    <div key={g.h}>
                      <h3 className={`${g.mt} font-inter text-h4 text-ink`}>{g.h}</h3>
                      <div className="mt-sm flex flex-col gap-sm">
                        {g.items.map((s) => (
                          <Setting key={s.name} {...s} defaultLabel={tc.defaultLabel} />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* 07 */}
            <section className="mt-3xl">
              <SectionTitle id="regions" n="07" title={tc.head["regions"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s07p}</p>

              {tc.showFavoritesImage && (
                <>
                  <h3 className="mt-md font-inter text-h4 text-ink">{tc.s07subDo}</h3>
                  <p className="mt-sm font-inter text-body text-muted">{tc.s07p2}</p>
                  <ul className="mt-sm flex list-disc flex-col gap-2xs pl-md marker:text-brand">
                    {tc.s07steps.map((step, i) => (
                      <Step key={i}>{step}</Step>
                    ))}
                  </ul>
                  <div className="mt-md overflow-hidden rounded-2xl border border-white/10">
                    <img src="/instructions-favorites.webp" alt={tc.s07imgAlt} loading="lazy" decoding="async" className="block w-full" />
                  </div>
                  <Callout label={chrome.important}>{tc.s07callout}</Callout>
                </>
              )}
            </section>

            {/* 08 */}
            <section className="mt-3xl">
              <SectionTitle id="support" n="08" title={tc.head["support"]} />
              <p className="mt-sm font-inter text-body text-muted">{tc.s08p}</p>
              <ul className="mt-sm flex list-decimal flex-col gap-2xs pl-md marker:text-brand marker:font-bold">
                {tc.s08steps.map((step, i) => (
                  <Step key={i}>{step}</Step>
                ))}
              </ul>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-md inline-flex h-lg items-center justify-center rounded-lg border border-white/20 bg-white/5 px-md font-inter text-button uppercase text-white transition-colors hover:bg-white/10"
              >
                {tc.s08button}
              </a>
              <p className="mt-sm font-inter text-body-sm text-muted">{tc.s08p2}</p>
            </section>
            </>)}
          </div>
        </div>
      </article>
      <Footer lang={lang} />
    </div>
  );
}
