import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { SITE_URL, REGISTER_URL } from "@/utils/seo";
import "@/app/css/style.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1C1C1C",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sponsorship — Conectá marcas y creadores en Argentina",
    template: "%s | Sponsorship",
  },
  description:
    "Plataforma argentina para conectar marcas con creadores de contenido: negociá, firmá el contrato y cobrá por Mercado Pago. Comisión del 5%, todo en pesos.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Sponsorship",
    locale: "es_AR",
    url: "/",
    title: "Sponsorship — Conectá marcas y creadores en Argentina",
    description:
      "Negociá, firmá el contrato y cobrá por Mercado Pago. Comisión del 5%, todo en pesos argentinos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsorship — Conectá marcas y creadores en Argentina",
    description:
      "Negociá, firmá el contrato y cobrá por Mercado Pago. Comisión del 5%, todo en pesos argentinos.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={montserrat.variable} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>

        <header className="site-nav">
          <div className="container site-nav__inner">
            <Link href="/" className="site-nav__brand">
              <span aria-hidden="true">◆</span> SPONSORSHIP
            </Link>
            <nav aria-label="Principal" className="site-nav__links">
              <Link href="/#como-funciona">Cómo funciona</Link>
              <Link href="/#pagos">Pagos</Link>
              <Link href="/#faq">Preguntas</Link>
              <Link href="/blog">Blog</Link>
              <a className="btn" href={REGISTER_URL}>
                Crear mi perfil
              </a>
            </nav>
          </div>
        </header>

        <div id="contenido">{children}</div>

        <footer className="footer">
          <div className="container">
            <p className="tiny muted">
              © {new Date().getFullYear()} Sponsorship — Hecho en Argentina ·{" "}
              <Link className="priv" href="/blog">
                Blog
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
