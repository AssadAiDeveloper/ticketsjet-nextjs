import type { Metadata, Viewport } from "next";

// Next 15 renders theme-color from the viewport export; metadata.themeColor is deprecated.
export const viewport: Viewport = {
  themeColor: "#0b1b2b",
};

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) { return children; }
