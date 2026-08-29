export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://sponsorship.blog";

/** URL de la app (registro / login), distinta del sitio público. */
export const APP_URL = "https://sponsorship.com.ar";
export const REGISTER_URL = `${APP_URL}/auth/register`;

/** Convierte una ruta relativa en absoluta contra SITE_URL. */
export function absUrl(path: string = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
