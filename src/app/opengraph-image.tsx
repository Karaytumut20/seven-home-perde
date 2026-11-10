import { ImageResponse } from "next/og";
export const alt = "Seven Home Perde — Işığın izinde. İstanbul.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#eeeae1",
          color: "#35322d",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 5,
          }}
        >
          <span>SEVEN HOME</span>
          <span>İSTANBUL</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            letterSpacing: -5,
            lineHeight: 1.05,
          }}
        >
          <span>Işığın</span>
          <span style={{ fontStyle: "italic" }}>izinde.</span>
        </div>
        <span style={{ fontSize: 20, letterSpacing: 4 }}>
          TÜL · FON · JALUZİ
        </span>
      </div>
    ),
    size,
  );
}
