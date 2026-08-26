// Продукты, у которых есть страница инструкции. Ключ уходит в ?p=<id>,
// поэтому менять его нельзя без редиректа со старого значения.
export type Product = "trading" | "esp" | "stalcraft-esp";

export const PRODUCT_ORDER: Product[] = ["trading", "esp", "stalcraft-esp"];
export const DEFAULT_PRODUCT: Product = "trading";

export type ProductMeta = {
  id: Product;
  // Имя продукта — всегда на английском (бренд игры), вне зависимости от
  // языка сайта. Полное для дропдауна/мета-строки, короткое для мобильного
  // меню и заголовка вкладки.
  label: string;
  short: string;
  // Данные карточки загрузки — у продуктов свои версия/размер.
  download: { url: string; version: string; sizeMb: number };
};

export const PRODUCTS: Record<Product, ProductMeta> = {
  trading: {
    id: "trading",
    label: "Arena Breakout: Infinite Trading",
    short: "Trading",
    download: { url: "/downloads/KoenFlowLauncher-latest.exe", version: "V5.1.5", sizeMb: 24 },
  },
  esp: {
    id: "esp",
    label: "Arena Breakout: Infinite ESP",
    short: "ESP",
    // Тот же лаунчер раздаёт оба продукта; версию/размер поправить, когда
    // придёт реальная сборка ESP.
    download: { url: "/downloads/KoenFlowLauncher-latest.exe", version: "V5.1.5", sizeMb: 24 },
  },
  "stalcraft-esp": {
    id: "stalcraft-esp",
    label: "STALCRAFT: X — ESP",
    short: "STALCRAFT ESP",
    // Единый KoenFlow Launcher раздаёт STALCRAFT ESP наравне с ABI-продуктами.
    download: { url: "/downloads/KoenFlowLauncher-latest.exe", version: "V5.1.5", sizeMb: 24 },
  },
};

// Нормализует значение из ?p=… к валидному продукту.
export function resolveProduct(raw: string | undefined): Product {
  if (raw === "esp" || raw === "trading" || raw === "stalcraft-esp") return raw;
  return DEFAULT_PRODUCT;
}
