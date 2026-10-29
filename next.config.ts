import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const legacyRedirects = [
  { source: "/hotels", destination: "/stays" },
  { source: "/stay", destination: "/stays" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/privacy-policy-2", destination: "/privacy-policy" },
  { source: "/guides", destination: "/blog" },
  { source: "/travel-guide", destination: "/blog" },
  { source: "/airfare-refund", destination: "/help" },
  { source: "/cruise", destination: "/" },
  { source: "/bike-bookings", destination: "/" },
  { source: "/author/webmaster", destination: "/" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
