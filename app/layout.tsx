import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SITE_CONFIG } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

import { BackgroundAtmosphere } from "@/components/layout/BackgroundAtmosphere";
import { BotanicalBranding } from "@/components/layout/BotanicalBranding";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
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
    "екзотични цветя",
    "рози Еквадор",
    "орхидеи",
    "сватбена декорация",
    "корпоративни цветя",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.nameBg,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.nameBg,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-image.jpg`,
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
    images: [`${SITE_CONFIG.url}/images/og-image.jpg`],
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
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {
    google: "G-JTL50Q3BJG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${dmSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JTL50Q3BJG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JTL50Q3BJG');
        `}
      </Script>
      <body className="antialiased font-sans">
        <BackgroundAtmosphere />
        <BotanicalBranding />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScrollProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--color-foreground)',
                  color: 'var(--color-background)',
                },
              }}
            />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
