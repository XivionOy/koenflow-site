"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type Lang } from "../lib/i18n";
import { PRODUCTS, PRODUCT_ORDER, type Product } from "../instructions/products";

// Дропдаун выбора продукта в сайдбаре инструкции. Пункты — обычные ссылки на
// ?p=<id>, поэтому выбор переживает перезагрузку и индексируется как отдельная
// страница; клиентский код нужен только чтобы открывать/закрывать список.
export default function ProductSwitcher({
  current,
  lang,
  label,
}: {
  current: Product;
  lang: Lang;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Клик вне и Esc закрывают список.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cur = PRODUCTS[current];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-sm">
      <span className="font-inter text-label uppercase text-muted">{label}</span>

      <div ref={ref} className="relative mt-2xs">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-lg w-full items-center justify-between gap-xs rounded-lg border border-white/10 bg-white/5 px-sm font-inter text-body text-ink transition-colors hover:border-white/20 hover:bg-white/8"
        >
          <span className="truncate">{cur.short[lang]}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-lg border border-white/10 bg-[#0c0912] p-3xs shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
          >
            {PRODUCT_ORDER.map((id) => {
              const p = PRODUCTS[id];
              const active = id === current;
              return (
                <li key={id} role="option" aria-selected={active}>
                  <Link
                    href={`/instructions?p=${id}`}
                    scroll={false}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between gap-xs rounded-md px-sm py-2xs font-inter text-body-sm transition-colors ${
                      active ? "bg-brand/10 text-brand" : "text-muted hover:bg-white/5 hover:text-ink"
                    }`}
                  >
                    <span className="truncate">{p.label[lang]}</span>
                    {active && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
