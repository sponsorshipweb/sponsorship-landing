/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    // Redirecciones de sitio estático viejo
    { source: "/modelo", destination: "/", permanent: true },
    { source: "/waitlist.html", destination: "/", permanent: true },
    { source: "/gracias.html", destination: "/", permanent: true },
    { source: "/index.html", destination: "/", permanent: true },
    { source: "/blog.html", destination: "/blog", permanent: true },
    // Redirección de slug antiguo a nuevo
    {
      source: "/blog/que-es-la-beta-privada",
      destination: "/blog/como-empezar-en-sponsorship",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
