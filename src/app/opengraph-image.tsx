import { ImageResponse } from "next/og";

export const alt = "Gary Wang — gariyuuu.com";
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
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#e6e6e6",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#00ff8c" }}>
          gariyuuu.com
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            marginTop: 24,
            backgroundImage: "linear-gradient(90deg, #00ff8c, #00e5ff)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Gary Wang
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 20,
            maxWidth: 900,
            color: "#a3a3a3",
          }}
        >
          Self-hosted AI platform, running my own apps.
        </div>
      </div>
    ),
    { ...size }
  );
}
