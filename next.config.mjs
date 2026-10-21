/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/planning-ahead", destination: "/pre-planning", permanent: true },
      { source: "/our-team", destination: "/", permanent: false },
      { source: "/our-founder", destination: "/", permanent: false },
    ];
  },
};
export default nextConfig;
