"use client";

import { useEffect, useState } from "react";

const API = "https://api.sponsorship.com.ar/auth/statistics/public-counters";
const FALLBACK = "Más de 180 usuarios ya están en Sponsorship";

function pickCount(data: any, depth = 0): number | null {
  if (!data || typeof data !== "object" || depth > 2) return null;
  const keys = ["totalUsers", "total_users", "totalUsuarios", "users", "usuarios", "total", "count"];
  for (const k of keys) {
    const v = data[k];
    if (typeof v === "number" && isFinite(v) && v > 0) return Math.floor(v);
  }
  return pickCount(data.data, depth + 1);
}

/**
 * Contador de usuarios en vivo.
 * Si el fetch falla o la respuesta no trae un número usable se mantiene el
 * texto de fallback: nunca queda vacío ni en cero.
 */
export default function UserCounter() {
  const [label, setLabel] = useState(FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch(API, { headers: { Accept: "application/json" } })
      .then((r) => {
        if (!r.ok) throw new Error("http_" + r.status);
        return r.json();
      })
      .then((data) => {
        const n = pickCount(data);
        if (!alive || n === null) return;
        setLabel(
          `${new Intl.NumberFormat("es-AR").format(n)} usuarios ya están en Sponsorship`
        );
      })
      .catch(() => {
        /* se mantiene el fallback */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <p className="tiny muted" aria-live="polite" style={{ marginTop: 14 }}>
      {label}
    </p>
  );
}
