/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Toutes les pages sont pré-rendues au build. Seule route serveur :
  // /api/meta-events (relais de l'API Conversions de Meta, inactif sans jeton).
  images: {
    formats: ["image/avif", "image/webp"],
    // 95 partout : photos et illustrations restent nettes en 2× et 3×.
    // 75 reste autorisé pour une image qui n'aurait pas de qualité explicite.
    qualities: [75, 95],
  },
};

export default nextConfig;
