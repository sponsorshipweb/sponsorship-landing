/**
 * Isotipo de Sponsorship: dos flechas opuestas que forman un ciclo de
 * intercambio — la dorada va de la marca al creador, la clara vuelve.
 * Reproduce el favicon en vectorial para que escale sin perder nitidez.
 */
export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="logo-mark"
    >
      {/* Va: de la marca al creador */}
      <path
        d="M6 16 H38 V9 L58 21 L38 33 V26 H6 Z"
        className="logo-arrow logo-arrow--gold"
      />
      {/* Vuelve: del creador a la marca */}
      <path
        d="M58 38 H26 V31 L6 43 L26 55 V48 H58 Z"
        className="logo-arrow logo-arrow--light"
      />
    </svg>
  );
}
