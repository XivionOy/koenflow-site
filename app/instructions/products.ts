import { type Lang } from "../lib/i18n";

// Продукты, у которых есть страница инструкции. Ключ уходит в ?p=<id>,
// поэтому менять его нельзя без редиректа со старого значения.
export type Product = "trading" | "esp";

export const PRODUCT_ORDER: Product[] = ["trading", "esp"];
export const DEFAULT_PRODUCT: Product = "trading";

export type ProductMeta = {
  id: Product;
  // Подпись в дропдауне и в meta-строке под заголовком.
  label: Record<Lang, string>;
  // Короткое имя для селектора, если полное слишком длинное.
  short: Record<Lang, string>;
  // Данные карточки загрузки — у продуктов свои версия/размер.
  download: { url: string; version: string; sizeMb: number };
};

export const PRODUCTS: Record<Product, ProductMeta> = {
  trading: {
    id: "trading",
    label: {
      en: "Arena Breakout: Infinite · Trading",
      ru: "Arena Breakout: Infinite · Трейд",
    },
    short: { en: "Trading", ru: "Трейд" },
    download: { url: "/downloads/KoenFlowLauncher-latest.exe", version: "V5.1.5", sizeMb: 24 },
  },
  esp: {
    id: "esp",
    label: {
      en: "Arena Breakout: Infinite · ESP",
      ru: "Arena Breakout: Infinite · ESP",
    },
    short: { en: "ESP", ru: "ESP" },
    // Тот же лаунчер раздаёт оба продукта; версию/размер поправить, когда
    // придёт реальная сборка ESP.
    download: { url: "/downloads/KoenFlowLauncher-latest.exe", version: "V5.1.5", sizeMb: 24 },
  },
};

// Нормализует значение из ?p=… к валидному продукту.
export function resolveProduct(raw: string | undefined): Product {
  return raw === "esp" || raw === "trading" ? raw : DEFAULT_PRODUCT;
}
