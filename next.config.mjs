/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/planning-ahead", destination: "/pre-planning", permanent: true }];
  },
};
export default nextConfig;
