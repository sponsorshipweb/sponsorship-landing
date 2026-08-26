import { ImageResponse } from "next/og";

// Edge runtime: en Node el prerender de ImageResponse falla con "Invalid URL".
// Se genera on-demand y queda cacheada en el CDN.
export const runtime = "edge";
export const alt =
  "Sponsorship — plataforma para conectar marcas y creadores de contenido en Argentina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#FFC700";
const BG = "#1C1C1C";
const FG = "#D9D9D9";
const MUTED = "#929292";
const LINE = "#414141";

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${LINE}`,
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        padding: "16px 24px",
      }}
    >
      <span style={{ color: GOLD, fontSize: 30, fontWeight: 800 }}>{value}</span>
      <span style={{ color: MUTED, fontSize: 18 }}>{label}</span>
    </div>
  );
}

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
          padding: "68px 80px",
          color: FG,
          // Satori no soporta radial-gradient con dos longitudes ni "at X Y".
          background: `linear-gradient(135deg, #3A2F0B 0%, #232009 26%, ${BG} 62%, ${BG} 100%)`,
          borderTop: `10px solid ${GOLD}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Rombo de marca: cuadrado rotado (la fuente por defecto no trae el glifo ◆). */}
          <div
            style={{
              width: 22,
              height: 22,
              background: GOLD,
              transform: "rotate(45deg)",
              borderRadius: 3,
            }}
          />
          <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: 2 }}>
            SPONSORSHIP
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            Conectá marcas y creadores
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1,
              color: GOLD,
            }}
          >
            en Argentina
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <Fact value="5%" label="de comisión" />
            <Fact value="Mercado Pago" label="cobro directo" />
            <Fact value="$ ARS" label="todo en pesos" />
          </div>
          <span style={{ color: MUTED, fontSize: 22, fontWeight: 700 }}>
            sponsorship.blog
          </span>
        </div>
      </div>
    ),
    size
  );
}
