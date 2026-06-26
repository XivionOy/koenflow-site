import { ImageResponse } from "next/og";

export const alt = "KoenFlow · Automated Arena Breakout trading bot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#05040a",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#d62a69",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ color: "#f4f2f8", fontSize: 42, fontWeight: 700, letterSpacing: 2 }}>
            KoenFlow
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#f4f2f8",
            fontSize: 76,
            fontWeight: 800,
            marginTop: 48,
            lineHeight: 1.1,
            maxWidth: 920,
          }}
        >
          Automated Arena Breakout trading bot
        </div>
        <div style={{ display: "flex", color: "#a39fb0", fontSize: 34, marginTop: 28 }}>
          Full automation, by design.
        </div>
      </div>
    ),
    { ...size },
  );
}
