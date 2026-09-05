import { ImageResponse } from "next/og";

export const alt = "Gary Wang — gariyuuu.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* --- per-project constants: edit these three lines only ------------------ */
const TITLE = "Gary Wang";
const SUBTITLE = "A self-hosted AI platform (Yuu v1.1 / Qwen3-8B) running every app I build.";
const EYEBROW = "Self-hosted AI platform";
const BG = "#000000";
const FG = "#d7f5df";
const MUTED = "#5f7a68";
const ACCENT = "#00ff8c";
/* ------------------------------------------------------------------------ */

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: FG,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent rule — the brand's structural device */}
        <div style={{ display: "flex", width: 96, height: 4, background: ACCENT }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: ACCENT,
              fontWeight: 600,
            }}
          >
            {EYEBROW}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -3,
              fontWeight: 700,
              maxWidth: 960,
            }}
          >
            {TITLE}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: MUTED,
              maxWidth: 860,
            }}
          >
            {SUBTITLE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MUTED,
            borderTop: `1px solid ${MUTED}40`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>gariyuuu.com</div>
        </div>
      </div>
    ),
    size,
  );
}
