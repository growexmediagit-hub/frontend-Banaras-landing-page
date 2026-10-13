import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import { SITE, siteUrl } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Site-wide defaults; each landing page sets its own title, description,
// canonical and share image (see landingMetadata).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE.brand} Tour Packages`, template: `%s` },
  applicationName: SITE.brand,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {/* AOS keeps [data-aos] content hidden until its script runs — show it if scripts are off. */}
        <noscript>
          <style>{`[data-aos]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
