/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Le site est entièrement statique : aucune donnée de session, aucun appel API.
  // Chaque page est pré-rendue au build.
  images: {
    formats: ["image/avif", "image/webp"],
    // 92 : le ruban de preuves, dont les photos doivent rester nettes en 2×.
    qualities: [75, 92],
  },
};

export default nextConfig;
