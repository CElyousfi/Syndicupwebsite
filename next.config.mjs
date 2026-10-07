/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Toutes les pages sont pré-rendues au build. Seule route serveur :
  // /api/meta-events (relais de l'API Conversions de Meta, inactif sans jeton).
  images: {
    formats: ["image/avif", "image/webp"],
    // 92 : le ruban de preuves, dont les photos doivent rester nettes en 2×.
    qualities: [75, 92],
  },
};

export default nextConfig;
