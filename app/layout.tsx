import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.nameBg,
    template: `%s | ${SITE_CONFIG.nameBg}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "градински център",
    "цветя Варна",
    "растения Варна",
    "градински център Варна",
    "цветя Нова Загора",
    "доставка цветя",
    "рязан цвят",
    "саксийни растения",
    "озеленяване",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.nameBg,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.nameBg,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.nameBg,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.nameBg,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
