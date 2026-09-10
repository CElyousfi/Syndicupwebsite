/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Le site est entièrement statique : aucune donnée de session, aucun appel API.
  // Chaque page est pré-rendue au build, dans les deux langues.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
