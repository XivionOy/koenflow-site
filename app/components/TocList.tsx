"use client";

import { useEffect, useState } from "react";

type Section = { id: string; n: string; title: string };

// Table-of-contents list with a scroll-spy: highlights the section currently in
// view as the user scrolls, instead of statically highlighting the first item.
// Uses a scroll listener (robust, no IntersectionObserver gaps with short
// heading anchors): the active section is the last one whose heading has
// scrolled to/above the offset line just below the sticky navbar.
export default function TocList({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const OFFSET = 120; // px below the viewport top (clears the sticky navbar)

    const onScroll = () => {
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= OFFSET) {
          current = s.id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <ul className="mt-sm flex flex-col gap-xs">
      {sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={`block border-l-2 pl-sm font-inter text-body-sm transition-colors ${
              active === s.id
                ? "border-brand text-ink"
                : "border-white/10 text-muted hover:text-ink"
            }`}
          >
            <span className="mr-xs text-brand">{s.n}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
