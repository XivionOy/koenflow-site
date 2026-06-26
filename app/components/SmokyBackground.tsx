// Pure-CSS static dark background (no video/images, no animation). Fixed to the
// viewport so it stays identical while scrolling. Styles live in globals.css
// (.vg-bg / .vg-grain).
export default function SmokyBackground() {
  return (
    <div className="vg-bg" aria-hidden="true">
      <div className="vg-glow" />
      <div className="vg-grain" />
    </div>
  );
}
